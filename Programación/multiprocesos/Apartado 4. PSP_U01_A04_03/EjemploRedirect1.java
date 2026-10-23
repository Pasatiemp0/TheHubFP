import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class EjemploRedirect1 {

    public static void main(String[] args) {

        System.out.println("------------- Calendario del año 2022 -----------------");
        try {

            // En primer lugar, creamos el objeto ProcessBuilder,
            // y lo inicializamos con la orden que vayamos a utilizar
            // (en nuestro caso, `cal 2022`)
            ProcessBuilder pb = new ProcessBuilder("cal", "2022");
            pb.redirectOutput(ProcessBuilder.Redirect.INHERIT);

            // Lanzamos el proceso con Start, que nos
            // devuelve un objeto de tipo Process.
            pb.start();

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
