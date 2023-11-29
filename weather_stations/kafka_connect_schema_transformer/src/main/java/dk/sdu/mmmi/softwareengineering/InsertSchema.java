package dk.sdu.mmmi.softwareengineering;

import org.apache.kafka.common.config.ConfigDef;
import org.apache.kafka.connect.connector.ConnectRecord;
import org.apache.kafka.connect.data.Field;
import org.apache.kafka.connect.data.Schema;
import org.apache.kafka.connect.data.SchemaBuilder;
import org.apache.kafka.connect.data.Struct;
import org.apache.kafka.connect.transforms.Transformation;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalField;
import java.util.HashMap;
import java.util.Map;

import static org.apache.kafka.connect.transforms.util.Requirements.requireMap;

// This file is shamelessly stolen from the following Stackoverflow answer: https://stackoverflow.com/a/65590849
public class InsertSchema<R extends ConnectRecord<R>> implements Transformation<R> {
    private static final String PURPOSE = "transforming payload";
    public static final ConfigDef CONFIG_DEF = new ConfigDef();

    @Override
    public void configure(Map<String, ?> props) {
    }

    @Override
    public ConfigDef config() {
        return CONFIG_DEF;
    }

    @Override
    public void close() {
    }

    @Override
    public R apply(R record) {
        final Map<String, ?> value = requireMap(record.value(), PURPOSE);
        Schema oldSchema = makeOldSchema();
        Schema updatedSchema = makeUpdatedSchema();

        final Struct updatedValue = new Struct(updatedSchema);

        for (Field field : oldSchema.fields()) {
            String newName = convertName(field.name());
            Object val = value.get(field.name());

            if(val == null){
                for(String potentialKey : value.keySet()){
                    if(field.name().equalsIgnoreCase(removeExtraSpaces(potentialKey))){
                        val = value.get(potentialKey);
                        break;
                    }
                }
            }

            if (val instanceof Long) {
                updatedValue.put(newName, ((Long) val).doubleValue());
            } else if (val instanceof Integer) {
                updatedValue.put(newName, ((Integer) val).doubleValue());
            } else {
                updatedValue.put(newName, val);
            }
        }

        // Insert new Timestamp schema
        long timestamp = 0L;
        String date = updatedValue.getString("date");
        String time = updatedValue.getString("time");
        if(date != null && time != null) {
            Instant dateObj = Instant.parse(date + "T" + time + "Z"); // Zulu time
            timestamp = dateObj.getEpochSecond() / 1000L; // Gets Unix millis
        }
        updatedValue.put("timestamp", timestamp);

        return newRecord(record, updatedSchema, updatedValue);
    }

    protected R newRecord(R record, Schema updatedSchema, Struct updatedValue) {
        return record.newRecord(record.topic(), record.kafkaPartition(), record.keySchema(), record.key(), updatedSchema, updatedValue, record.timestamp());
    }

    private String convertName(String name) {
        if (renameMapping.containsKey(name)) {
            return renameMapping.get(name);
        }
        return name;
    }

    private String removeExtraSpaces(String input){
        String val  = input;
        int fuse = 0;
        while(val.contains("  ") && fuse++ < 1000) {
            val = val.replaceAll("  ", " ");
        }
        return val;
    }

    private static final HashMap<String, String> renameMapping = new HashMap<String, String>() {{
        put("precipitation past hour (ml)", "precipitationPastHour");
        put("max air pressure past hour (mb)", "maxAirPressurePastHour");
        put("min air pressure past hour (mb)", "minAirPressurePastHour");
        put("solar radiation (KJ/m2)", "solarRadiation");
        put("air temperature (instant) (C)", "airTemperature");
        put("max temperature past hour (C)", "maxTemperaturePastHour");
        put("min temperature past hour (C)", "minTemperaturePastHour");
        put("max dew point temperature past hour (C)", "maxDewPointTemperaturePastHour");
        put("min dew point temperature past hour (C)", "minDewPointTemperaturePastHour");
        put("max relative humid temperature past hour (%)", "maxRelativeHumidTemperaturePastHour");
        put("min relative humid temperature past hour (%)", "minRelativeHumidTemperaturePastHour");
        put("relative humid (% instant)", "relativeHumid");
        put("wind direction (radius degrees)", "windDirection");
        put("wind gust (m/s)", "windGust");
        put("wind speed (m/s)", "windSpeed");
    }};


    private Schema makeOldSchema() {
        final SchemaBuilder builder = SchemaBuilder.struct()
                .name("json_schema")
                .field("index", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("date", Schema.OPTIONAL_STRING_SCHEMA)
                .field("time", Schema.OPTIONAL_STRING_SCHEMA)
                .field("precipitation past hour (ml)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("max air pressure past hour (mb)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("min air pressure past hour (mb)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("solar radiation (KJ/m2)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("air temperature (instant) (C)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("max temperature past hour (C)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("min temperature past hour (C)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("max dew point temperature past hour (C)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("min dew point temperature past hour (C)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("max relative humid temperature past hour (%)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("min relative humid temperature past hour (%)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("relative humid (% instant)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("wind direction (radius degrees)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("wind gust (m/s)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("wind speed (m/s)", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("region", Schema.OPTIONAL_STRING_SCHEMA)
                .field("state", Schema.OPTIONAL_STRING_SCHEMA)
                .field("station", Schema.OPTIONAL_STRING_SCHEMA)
                .field("station_code", Schema.OPTIONAL_STRING_SCHEMA)
                .field("latitude", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("longitude", Schema.OPTIONAL_FLOAT64_SCHEMA)
                .field("height", Schema.OPTIONAL_FLOAT64_SCHEMA);


        /*
        The object looks as so:
        {
            "index":236736
            "date":"2010-06-01"
            "time":"00:00:00"
            "precipitation past hour (ml)":0.2
            "atmospheric pressure past hour (mb)":1014.8
            "max air pressure past hour (mb)":1014.8
            "min air pressure past hour (mb)":1014.1
            "solar radiation (KJ/m2)":-9999
            "air temperature (instant) (C)":23.4
            "dew point temperature (instant) (C)":22.7
            "max temperature past hour (C)":23.5
            "min temperature past hour (C)":23.3
            "max dew point temperature past hour (C)":22.7
            "min dew point temperature past hour (C)":22.5
            "max relative humid temperature past hour (%)":96
            "min relative humid temperature past hour (%)":95
            "relative humid (% instant)":96
            "wind direction (radius degrees)":271
            "wind gust (m/s)":1.3
            "wind speed (m/s)":0.3
            "region":"N"
            "state":"AP"
            "station":"OIAPOQUE"
            "station_code":"A242"
            "latitude":3.81361111
            "longitude":-51.8625
            "height":21
        }
         */

        return builder.build();
    }

    private Schema makeUpdatedSchema() {
        final SchemaBuilder builder = SchemaBuilder.struct()
                .name("json_schema");

        Schema oldSchema = makeOldSchema();

        for(Field f : oldSchema.fields()){
            builder.field(convertName(f.name()), f.schema());
        }

        // New fields in the new Schema
        builder.field("timestamp", Schema.INT64_SCHEMA);

        return builder.build();
    }
}