package SQL;

import java.io.*;
import java.util.ArrayList;

public class CsvReader {

    public static void main(String[] args) {
        String file = "/WORKSPACE/TheHubFP/SQL/Rotten Tomatoes Movies.csv";
        String line= "";
        String split = ",";

        ArrayList<String[]> data = new ArrayList<>();
        
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            if ((line = br.readLine()) != null) {
                String [] headers = line.split(split);
                System.out.println("\033[32mHeaders: " + String.join(", ", headers) + "\033[0m");
            } 
            int i = 0;
            while ((line = br.readLine()) != null) {
                String [] lineValues = line.split(",?=(?:[^\"]*\"[^\"]*\")*[^\"]*$", -1);
                String [,] lineValues = line.split(",?=(?:[^\"]*\"[^\"]*\")*[^\"]*$", -1);
                // "Word","Word"","Word"
                (\"(\w+|\d+))\",)|((\w+|\d+)),)
                data.add(lineValues);
                System.out.println(lineValues[i++]);            
            }
        } catch (Exception e) {
            System.out.println("\033[31mSomething happened: " + e.getMessage() + "\033[0m");
            // TODO: handle exception
        }
    }
}
