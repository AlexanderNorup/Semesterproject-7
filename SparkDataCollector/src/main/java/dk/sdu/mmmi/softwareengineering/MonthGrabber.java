package dk.sdu.mmmi.softwareengineering;

import org.apache.spark.sql.api.java.UDF1;

public class MonthGrabber implements UDF1<String, String> {
    @Override
    public String call(String s) throws Exception {
        if(s == null){
            return null;
        }
        String[] split = s.split("-");
        if(split.length > 1){
            return split[1];
        }
        return "-1";
    }
}
