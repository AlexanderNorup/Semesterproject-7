package dk.sdu.mmmi.softwareengineering;

public enum SchemaShape {
    // Doing this so we can re-name the actual fields if we so wish to.
    index("index"),
    date("date"),
    time("time"),
    precipitationPastHour("precipitationPastHour"),
    maxAirPressurePastHour("maxAirPressurePastHour"),
    minAirPressurePastHour("minAirPressurePastHour"),
    solarRadiation("solarRadiation"),
    airTemperature("airTemperature"),
    maxTemperaturePastHour("maxTemperaturePastHour"),
    minTemperaturePastHour("minTemperaturePastHour"),
    maxDewPointTemperaturePastHour("maxDewPointTemperaturePastHour"),
    minDewPointTemperaturePastHour("minDewPointTemperaturePastHour"),
    maxRelativeHumidTemperaturePastHour("maxRelativeHumidTemperaturePastHour"),
    minRelativeHumidTemperaturePastHour("minRelativeHumidTemperaturePastHour"),
    relativeHumid("relativeHumid"),
    windDirection("windDirection"),
    windGust("windGust"),
    windSpeed("windSpeed"),
    region("region"),
    state("state"),
    station("station"),
    station_code("station_code"),
    latitude("latitude"),
    longitude("longitude"),
    height("height"),
    timestamp("timestamp");

    private String jsonName;
    SchemaShape(String jsonName){
        this.jsonName = jsonName;
    }

    public String fieldName(){
        return this.jsonName;
    }

    @Override
    public String toString() {
        return this.jsonName;
    }
}
