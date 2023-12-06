package dk.sdu.mmmi.softwareengineering;

import org.apache.spark.sql.api.java.UDF1;

public class YearGrabber implements UDF1<String, String> {
    @Override
    public String call(String s) throws Exception {
        if(s == null){
            return null;
        }
        String[] split = s.split("-");
        return split[0];
    }
}
