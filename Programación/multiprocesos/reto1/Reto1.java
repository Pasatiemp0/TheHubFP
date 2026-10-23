/**
 * Reto 1. La cadena de producción
 * @author: Jiandong Yao(Alejandro)
 */

import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.io.PrintWriter;

public class Reto1 {
    public static final int PRODUCTOS = 10;
    public static final int PIEZAS_POR_PRODUCTO = 2;
    public static final int CAPACIDAD = 3;

    public static void main(String[] args) throws Exception {
        FileWriter log = new FileWriter("fabrica.log");
        log.close();

        // 0: productor, 1: ensamblador, 2: almacén, 3: transporte.
        String[] clases = {"ProcesoProductor", "ProcesoEnsamblador", "ProcesoAlmacen", "ProcesoTransporte"};
        Process[] procesos = new Process[4];
        BufferedReader[] salidas = new BufferedReader[4];
        PrintWriter[] entradas = new PrintWriter[4];

        for (int i = 0; i < 4; i++) {
            ProcessBuilder pb = new ProcessBuilder("java", "-cp", System.getProperty("java.class.path"), clases[i]);
            pb.redirectError(ProcessBuilder.Redirect.INHERIT);
            procesos[i] = pb.start();
            salidas[i] = new BufferedReader(new InputStreamReader(procesos[i].getInputStream()));
            // true envía cada línea sin esperar a que se llene el buffer.
            entradas[i] = new PrintWriter(procesos[i].getOutputStream(), true);
        }

        int creados = 0;
        int repartidos = 0;
        while (repartidos < PRODUCTOS) {
            entradas[2].println("CONSULTAR");
            String respuesta = salidas[2].readLine();

            if (respuesta.equals("HUECO") && creados < PRODUCTOS) {
        
                entradas[1].println(respuesta);
                for (int i = 0; i < PIEZAS_POR_PRODUCTO; i++) {
                    entradas[0].println("CREAR");
                    String pieza = salidas[0].readLine();
                    entradas[1].println(pieza);
                }

                String producto = salidas[1].readLine();
                entradas[2].println(producto);
                salidas[2].readLine(); 
                creados++;
            } else {
                entradas[2].println("SACAR");
                String producto = salidas[2].readLine();
                entradas[3].println(producto);
                salidas[3].readLine(); 
                repartidos++;
            }
        }

        // Cerrar las entradas
        for (int i = 0; i < 4; i++) {
            entradas[i].close();
            procesos[i].waitFor();
            salidas[i].close();
        }
        System.out.println("Fin: " + repartidos + " productos entregados. Ver fabrica.log");
    }
}
