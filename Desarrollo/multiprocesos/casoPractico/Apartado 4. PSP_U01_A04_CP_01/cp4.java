import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class cp4 {
    public static void main(String[] args) {

        try {
            // Creamos los dos ProcessBuilder, uno por cada proceso a lanzar
            ProcessBuilder pb1 = new ProcessBuilder("ps", "aux");
            ProcessBuilder pb2 = new ProcessBuilder("grep", "root");

            // Lanzamos el proceso "ps aux", y obtenemos
            // un bufferedReader conectado a su salida
            Process p1 = pb1.start();
            BufferedReader br = new BufferedReader(
                    new InputStreamReader(
                            p1.getInputStream()));

            // Lanzamos ahora el "grep root", y obtenemos
            // también un bufferedReader para leer su salida
            Process p2 = pb2.start();

            BufferedReader br2 = new BufferedReader(
                    new InputStreamReader(
                            p2.getInputStream()));

            // Así como un BufferedWriter, para escribir
            // por la entrada estándard del proceso "grep root"
            BufferedWriter bw2 = new BufferedWriter(
                    new OutputStreamWriter(
                            p2.getOutputStream()));

            // Leemos la salida del primer proceso (ps aux)
            // y la escribimos por la entrada estándard del segundo (grep root)
            String line;
            while ((line = br.readLine()) != null) {
                bw2.write(line + "\n");
            }

            // Hecho esto, cerramos el Writer del segundo proceso
            // y el Reader del primero, para evitar que el segundo
            // proceso quede esperando.

            bw2.close();
            br.close();

            // Finalmente, leemos la salida del segundo proceso y
            // la mostramos por pantalla.
            while ((line = br2.readLine()) != null) {
                System.out.println(line);
            }
            
            br2.close();

        } catch (IOException e) {
            System.out.println("Excepción: " + e.getMessage());
        }

    }
}
