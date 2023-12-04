package dk.sdu.mmmi.softwareengineering;

import org.apache.spark.sql.api.java.UDF2;

public class AvgOfTwoColumns implements UDF2<Double, Double, Double> {
    @Override
    public Double call(Double a, Double b) throws Exception {
        if (a == null || b == null){
            return null;
        }
        return (a + b) / 2d;
    }
}
