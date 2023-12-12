package dk.sdu.mmmi.softwareengineering;

import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.*;
import org.apache.spark.sql.types.DataTypes;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import static dk.sdu.mmmi.softwareengineering.SchemaShape.*;

public class SparkDataCollector {
    private static final String HDFS_URL = "hdfs://simple-hdfs-namenode-default-0.simple-hdfs-namenode-default:8020";
    private static final String HDFS_PATH = "/topics/weather_data/";
    private static final String HDFS_OUTPUT_PATH = "/processed_weather_data/";
    private static final int NUMBER_OF_PARTITONS = 3;

    public static void main(String[] args) {
        if (args.length != 2) {
            throw new IllegalArgumentException("You must specify exactly 2 arguments");
        }

        String fromStr = args[0];
        String toStr = args[1];

        long fromTimestamp = 0L;
        long toTimestamp = 0L;

        try {
            fromTimestamp = Instant.parse(fromStr).getEpochSecond() * 1000L;
            toTimestamp = Instant.parse(toStr).getEpochSecond() * 1000L;
        } catch (Exception e) {
            //Re-throw exception with better error message.
            throw new IllegalArgumentException("Please use ISO8601 timestamps (e.g. 2023-11-29T13:37Z) for both argument 1 (" + fromStr + ") and argument 2 (" + toStr + ")", e);
        }

        System.out.printf("Parsed timestamps as %s => %d, %s => %d %n", fromStr, fromTimestamp, toStr, toTimestamp);

        SparkSession spark = SparkSession
                .builder()
                .appName("SparkDataCollector")
                .getOrCreate();

        System.out.println("Started a spark session");

        //Register custom UserDefinedFunction UDF
        spark.udf().register(AvgOfTwoColumns.class.getName(), new AvgOfTwoColumns(), DataTypes.DoubleType);
        spark.udf().register(MonthGrabber.class.getName(), new MonthGrabber(), DataTypes.StringType);
        spark.udf().register(YearGrabber.class.getName(), new YearGrabber(), DataTypes.StringType);

        String[] paths = new String[NUMBER_OF_PARTITONS];
        for (int i = 0; i < paths.length; i++) {
            paths[i] = HDFS_URL + HDFS_PATH + "partition=" + i;
        }

        try (JavaSparkContext jsc = new JavaSparkContext(spark.sparkContext())) {
            System.out.println("Created a Spark context");
            Dataset<Row> rows = spark.read()
                    .format("avro")
                    .load(paths);
            System.out.println("Loaded some AVRO rows");
            Dataset<Row> filtered = rows.where(
                    timestamp.fieldName() + " > " + fromTimestamp + " AND " + timestamp.fieldName() + " < " + toTimestamp
            );

            Dataset<Row> selectedData = filtered.select(
                    timestamp.fieldName(),
                    date.fieldName(),
                    state.fieldName(),
                    precipitationPastHour.fieldName(),
                    relativeHumid.fieldName(),
                    airTemperature.fieldName(),
                    maxAirPressurePastHour.fieldName(),
                    minAirPressurePastHour.fieldName(),
                    windDirection.fieldName(),
                    solarRadiation.fieldName(),
                    windGust.fieldName(),
                    windSpeed.fieldName()
            );
            System.out.println("Selected relevant rows");
            final String generatedAirPressureField = "AirPressure";
            Dataset<Row> dataWithGeneratedAirPressure = selectedData.withColumn(generatedAirPressureField, functions.callUDF(
                    AvgOfTwoColumns.class.getName(),
                    onlyValidEntries(minAirPressurePastHour),
                    onlyValidEntries(maxAirPressurePastHour))
            );

            System.out.println("Generated field " + generatedAirPressureField);

            // Find Year and Months columns.
            final String monthField = "Month";
            final String yearField = "Year";

            Map<String, Column> monthYearColumns = new HashMap<String, Column>(){{
                put(monthField, functions.callUDF(MonthGrabber.class.getName(), functions.col(date.fieldName())));
                put(yearField, functions.callUDF(YearGrabber.class.getName(), functions.col(date.fieldName())));
            }};

            Dataset<Row> withMonthYearSplit = dataWithGeneratedAirPressure.withColumns(monthYearColumns);

            System.out.println("Added year/month columns");

            RelationalGroupedDataset groupedData = withMonthYearSplit.groupBy(functions.col(state.fieldName()), functions.col(yearField), functions.col(monthField));

            System.out.printf("Created a grouped dataset by %s, %s and %s%n", state.fieldName(), yearField, monthField);

            Dataset<Row> aggregatedData = groupedData.agg(
                    functions.mean(onlyValidEntries(precipitationPastHour)).as("AvgPrecipitation"),
                    functions.mean(onlyValidEntries(relativeHumid)).as("AvgHumidity"),
                    functions.max(onlyValidEntries(airTemperature)).as("MaxTemperature"),
                    functions.min(onlyValidEntries(airTemperature)).as("MinTemperature"),
                    functions.mean(onlyValidEntries(airTemperature)).as("AvgTemperature"),
                    functions.mean(onlyValidEntries(generatedAirPressureField)).as("AvgAirPressure"),
                    functions.min(onlyValidEntries(minAirPressurePastHour)).as("MinAirPressure"),
                    functions.max(onlyValidEntries(maxAirPressurePastHour)).as("MaxAirPressure"),
                    functions.median(onlyValidEntries(windDirection)).as("MedianWindDirection"),
                    functions.mean(onlyValidEntries(solarRadiation)).as("AvgSolarRadiation"),
                    functions.mean(onlyValidEntries(windGust)).as("AvgWindGust"),
                    functions.mean(onlyValidEntries(windSpeed)).as("AvgWindSpeed")
            );
            
            final String fromDateField = "FromDate";
            final String toDateField = "ToDate";
            Map<String, Column> metadataMap = new HashMap<String, Column>() {{
                put(fromDateField, functions.lit(fromStr));
                put(toDateField, functions.lit(toStr));
            }};

            Dataset<Row> withAddedMetadata = aggregatedData.withColumns(metadataMap);
            System.out.println("Added metadata to the dataset");

            withAddedMetadata.show();

            String fileKey = String.format("%d-%d", fromTimestamp, toTimestamp);

            withAddedMetadata
                    .write()
                    .partitionBy(state.fieldName())
                    .mode(SaveMode.Overwrite)
                    .json(HDFS_URL + HDFS_OUTPUT_PATH + fileKey);

            System.out.println("Wrote output-JSON to HDFS!");
        }
    }

    private static Column onlyValidEntries(SchemaShape shape) {
        return onlyValidEntries(shape.fieldName());
    }

    private static Column onlyValidEntries(String fieldName) {
        // This function filters entries less than or equal to -9999 away.
        return functions.when(functions.col(fieldName).$greater(functions.lit(-9999d)), functions.col(fieldName));
    }
}