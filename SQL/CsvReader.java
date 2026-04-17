package SQL;

import java.io.*;
import java.util.ArrayList;

public class CsvReader {

    public static void main(String[] args) {
        String file = "Rotten Tomatoes Movies.csv"; //Ruta del archivo .csv
        String line= "";
        String split = ",";
        String output = "output.sql";               //Se crea en la dirección base el archivo final 

         String[] headers;
        ArrayList<String[]> data = new ArrayList<>();
        
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            if ((line = br.readLine()) != null) {
                headers = line.split(split);
                System.out.println("\033[32mHeaders: " + String.join(", ", headers) + "\033[0m");
            } 

            while ((line = br.readLine()) != null) {
                String [] lineValues = line.split(",?=(?:[^\"]*\"[^\"]*\")*[^\"]*$", -1);
                data.add(lineValues);          
            }
        } catch (Exception e) {
            System.out.println("\033[31mSomething happened: " + e.getMessage() + "\033[0m");
            // TODO: handle exception
        }
        
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(output))) {
            String creatTableQuery = "INSERT INTO Rotten Tomatooes Movies (" + headers + ")\nVALUES\n";
            bw.write(creatTableQuery);
            for (String[] lines : data) {
                bw.append("(" + lines + ")")
            }
        } catch (Exception e) {
            System.out.println("\033[31mSomething happened: " + e.getMessage() + "\033[0m");
            // TODO: handle exception
        }
        
    }
}
