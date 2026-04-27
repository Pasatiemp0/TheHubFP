package Programación.Error;

import java.util.Scanner;
import java.io.*;

public class error {

    public static Scanner teclado = new Scanner(System.in);

    public static void main(String[] args) {
        File archivo = new File("/workspaces/TheHubFP/Error/mapa100numeros.txt");
        System.out.println(archivo.getAbsolutePath());
        try (BufferedReader br = new BufferedReader(new FileReader(archivo))) {
            
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Error reading file."+ e.getMessage());
        }
        System.out.println("");
    }
}