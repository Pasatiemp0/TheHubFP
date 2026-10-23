import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class EjemploStreams2 {

    public static void main(String[] args) {

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

            // Volcamos la salida a un fichero, utilizando el decodador
            // BufferedWriter, de forma similar al ejemplo anterior
            BufferedWriter bw = new BufferedWriter(
                    new FileWriter(new File("calendario2022.txt")));

            // Escribimos la cabecera
            bw.write("------------- Calendario del año 2022 -----------------");

            // Leemos del stream y escribimos en el fichero
            String line;
            while ((line = br.readLine()) != null) {
                bw.write(line + "\n");
            }
            bw.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
