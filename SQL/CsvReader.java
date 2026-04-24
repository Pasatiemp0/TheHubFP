//AUTOR: Jiandong Yao -- Base de dato(Ejercicio_INSERT_TO)

package SQL;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;

public class CsvReader {

    public static void main(String[] args) {
        String file = "D:\\用户\\Lenovo\\文档\\TheHubFP\\SQL\\Rotten Tomatoes Movies.csv"; //Ruta del archivo .csv
        String line= "";
        String split = ",";
        String output = "D:\\用户\\Lenovo\\文档\\TheHubFP\\SQL\\output.sql";               //Se crea en la dirección base el archivo final 

        String[] headers = null;
        ArrayList<String[]> data = new ArrayList<>();
        
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            if ((line = br.readLine()) != null) {
                headers = line.split(split);
                System.out.println("\033[32mHeaders: " + String.join(", ", headers) + "\033[0m");
            } 

            while ((line = br.readLine()) != null) {
                String [] lineValues = line.split(",?=(?:[^\"]*\"[^\"]*\")*[^\"]*$", -1);
                //System.out.println("\033[34mLine: " + String.join("\', ", lineValues) + "\033[0m");
                // "Word","Word"","Word"
                //(\"(\w+|\d+))\",)|((\w+|\d+)),)
                data.add(lineValues);    
            }
        } catch (Exception e) {
            System.out.println("\033[31mSomething happened: " + e.getMessage() + "\033[0m");
        }
        
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(output))) {
            String creatTableQuery = "INSERT INTO Rotten Tomatooes Movies (" + Arrays.toString(headers).replaceAll("\\[|\\]", "") + ")\nVALUES\n";
            bw.write(creatTableQuery);
            for (String[] lines : data) {
                bw.append("(" + Arrays.toString(lines).replaceAll("\\[|\\]", "") + "),\n");
            }
            bw.close();
        } catch (Exception e) {
            System.out.println("\033[31mSomething happened: " + e.getMessage() + "\033[0m");
        }
        
    }
}
