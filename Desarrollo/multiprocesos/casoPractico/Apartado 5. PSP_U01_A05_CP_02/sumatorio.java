import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class sumatorio {

    private static BufferedReader lanzarSubproceso(long sum1, long sum2) {

        // Definimos el ProcessBuilder
        ProcessBuilder pb = new ProcessBuilder("java", "suma", Long.toString(sum1), Long.toString(sum2));

        try {
            // Lanzamos el proceso
            Process p = pb.start();

            // Recogemos la salida y la devolvemos
            BufferedReader br = new BufferedReader(
                    new InputStreamReader(
                            p.getInputStream()));

            return br;
        } catch (Exception e) {
            return null;
        }

    }

    public static void main(String[] args) {
        // Si no se proporcionan dos argumentos cerramos la aplicación
        if (args.length != 2)
            System.exit(-1);

        
        Long num1, num2;
        Long suma = 0L;

        // Ponemos el menor número delante
        if (Long.parseLong(args[0]) > Long.parseLong(args[1])) {
            num1 = Long.parseLong(args[1]);
            num2 = Long.parseLong(args[0]);
        } else {
            num1 = Long.parseLong(args[0]);
            num2 = Long.parseLong(args[1]);
        }

        int numeroProcesadores = Runtime.getRuntime().availableProcessors();
        Long tamanyoParticion = ((num2 - num1) / numeroProcesadores);

        // Si el tamaño de la partición es inferior a 1
        // lo ejecutamos con un sólo proceso
        if (tamanyoParticion < 1) {
            numeroProcesadores = 1;
            tamanyoParticion = num2 - num1 - 1;
        }
        
        
        // Estructuras de datos para mejorar la lectura de los buffers
        BufferedReader[] bReaders = new BufferedReader[numeroProcesadores];
        int brpos = 0; // índice para el vector bReaders

        for (int i = 0; i < numeroProcesadores; i++) {
            Long valorIni = num1 + i * tamanyoParticion;
            Long valorFin = num1 + ((i + 1) * tamanyoParticion) - 1;

            // El último proceso ejecuta todos los restantes
            if (i == numeroProcesadores - 1)
                valorFin = num2;

             System.out.println("Lanzando proceso " + i + ": " + valorIni + "-" + valorFin);

            bReaders[brpos] = lanzarSubproceso(valorIni, valorFin);
            brpos++;
        }

        // Una vez finalizado, empezamos con la lectura de los búffers
        for (int i = 0; i < numeroProcesadores; i++) {
             System.out.println("Esperando el resultado del proceso "+i);
            try {
                suma += Long.parseLong(bReaders[i].readLine());
            } catch (IOException ex) {
            }
        }

        System.out.println("Resultado:" + suma);

    }

}
