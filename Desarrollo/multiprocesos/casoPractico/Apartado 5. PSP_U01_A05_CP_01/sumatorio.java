import java.io.BufferedReader;
import java.io.InputStreamReader;

public class sumatorio {

    private static long lanzarSubproceso(long sum1, long sum2) {

        // Definimos el ProcessBuilder
        ProcessBuilder pb = new ProcessBuilder("java", "suma", Long.toString(sum1), Long.toString(sum2));

        try {
            // Lanzamos el proceso
            Process p = pb.start();

            // Recogemos la salida y la devolvemos
            BufferedReader br = new BufferedReader(
                    new InputStreamReader(
                            p.getInputStream()));

            String line = br.readLine();
            return Integer.parseInt(line);
        } catch (Exception e) {
            return 0;
        }

    }

    public static void main(String[] args) {
        // Si no se proporcionan dos argumentos cerramos la aplicación
        if (args.length != 2)
            System.exit(-1);

        Long num1, num2;
        Long suma = 0L;
        if (Long.parseLong(args[0]) > Long.parseLong(args[1])) {
            num1 = Long.parseLong(args[1]);
            num2 = Long.parseLong(args[0]);
        } else {
            num1 = Long.parseLong(args[0]);
            num2 = Long.parseLong(args[1]);
        }

        int numeroProcesadores = Runtime.getRuntime().availableProcessors();
        Long tamanyoParticion = ((num2 - num1) / numeroProcesadores);

        for (int i = 0; i < numeroProcesadores; i++) {
            Long valorIni = num1 + i * tamanyoParticion;
            Long valorFin = num1 + ((i + 1) * tamanyoParticion) - 1;

            // El último proceso ejecuta todos los restantes
            if (i == numeroProcesadores - 1)
                valorFin = num2;

            System.out.println("Lanzando proceso " + i + ": " + valorIni + "-" + valorFin);

            suma += lanzarSubproceso(valorIni, valorFin);
        }

        System.out.println("Resultado:" + suma);

    }

}
