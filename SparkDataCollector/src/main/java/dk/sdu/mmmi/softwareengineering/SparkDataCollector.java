package dk.sdu.mmmi.softwareengineering;

//import org.apache.kafka.clients.producer.KafkaProducer;
//import org.apache.kafka.clients.producer.ProducerRecord;
//import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SaveMode;
import org.apache.spark.sql.SparkSession;

import java.time.Instant;
import java.util.List;
//import java.util.Properties;
//import java.util.concurrent.ExecutionException;

public class SparkDataCollector {
    private static final String HDFS_URL = "hdfs://simple-hdfs-namenode-default-1.simple-hdfs-namenode-default:8020";
    private static final String HDFS_PATH = "/topics/weather_data/";
    private static final String HDFS_OUTPUT_PATH = "/processed_weather_data/";
    private static final int NUMBER_OF_PARTITONS = 3;
    private static final int SPARK_CONCURRENCY = 2;
    private static final String KAFKA_TOPIC = "processed_weather_data";
    private static final String[] KAFKA_CLUSTERS = new String[]{
        "strimzi-kafka-bootstrap.semesterproject:9092"
    };

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
                    "timestamp > " + fromTimestamp + " AND timestamp < " + toTimestamp
            );
            System.out.println("Filtered some AVRO rows");

            Dataset<Row> selectedData = filtered.select("timestamp", "solarRadiation", "airTemperature", "windDirection");
            System.out.println("Selected some rows");

//            System.out.println("Trying to collect as a list and output the data");
//
//            List<String> jsonData = selectedData.toJSON().collectAsList();
//            System.out.println("Selected data:" +  String.join("|", jsonData));

//            System.out.println("Attempting output to Kafka");
//            selectedData.toJSON()
//                    .write()
//                    .format("kafka")
//                    .option("kafka.bootstrap.servers", String.join(",", KAFKA_CLUSTERS))
//                    .option("topic", KAFKA_TOPIC)
//                    .save();
//
//            System.out.println("Output to kafka complete!");

            String fileKey = String.format("%d-%d.json", fromTimestamp, toTimestamp);

            selectedData
                    .write()
                    .mode(SaveMode.Overwrite)
                    .json(HDFS_URL + HDFS_OUTPUT_PATH + fileKey);

            System.out.println("Wrote output-JSON to HDFS");
        }

        // What we should be able to do is just use the following code:
//            selectedData.toJSON()
//                    .write()
//                    .format("kafka")
//                    .option("kafka.bootstrap.servers", String.join(",", KAFKA_CLUSTERS))
//                    .option("topic", KAFKA_TOPIC)
//                    .save();
        // The problem is that this code only works if you make spark include the package "org.apache.spark:spark-sql-kafka-0-10_2.12:3.3.0"
        // The problem with that is that the dependencies of "spark-sql-kafka-0-10_2.12" include a conflict with the core spark package, which means:
        //  --> "java.lang.LinkageError: loader constraint violation: when resolving method 'org.slf4j.ILoggerFactory"
        // So instead of trying to fix that, we recognize that we could do as above, but instead we put the data back in HDFS,
        //  and have setup a kafka-connect job to put the data in kafka.

        // Parallelize with the command below:
        // JavaRDD<Row> dataSet = jsc.parallelize(selectedData.collectAsList(), SPARK_CONCURRENCY);

//          EXAMPLE CODE from https://github.com/apache/spark/blob/master/examples/src/main/java/org/apache/spark/examples/JavaSparkPi.java
//        int slices = (args.length == 1) ? Integer.parseInt(args[0]) : 2;
//        int n = 100000 * slices;
//        List<Integer> l = new ArrayList<>(n);
//        for (int i = 0; i < n; i++) {
//            l.add(i);
//        }
//
//        JavaRDD<Integer> dataSet = jsc.parallelize(l, slices);
//
//        int count = dataSet.map(integer -> {
//            double x = Math.random() * 2 - 1;
//            double y = Math.random() * 2 - 1;
//            return (x * x + y * y <= 1) ? 1 : 0;
//        }).reduce((integer, integer2) -> integer + integer2);
//
//        System.out.println("Pi is roughly " + 4.0 * count / n);
    }
}