import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class EjemploStreams1 {

    public static void main(String[] args) {

        System.out.println("------------- Calendario del año 2022 -----------------");
        try {

            // En primer lugar, creamos el objeto ProcessBuilder,
            // y lo inicializamos con la orden que vayamos a utilizar
            // (en nuestro caso, `cal 2022`)
            ProcessBuilder pb = new ProcessBuilder("cal", "2022");

            // Lanzamos el proceso con Start, que nos
            // devuelve un objeto de tipo Process.
            Process p = pb.start();

            // Obtenemos la salida del proceso con getInputStream,
            // Y la volcamos por pantalla, pasándola por un InputStreamReader
            BufferedReader br = new BufferedReader(
                    new InputStreamReader(
                            p.getInputStream()));
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        
    }
}
