import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class EjemploRedirect2 {

    public static void main(String[] args) {

        try {

            // En primer lugar, creamos el objeto ProcessBuilder,
            // y lo inicializamos con la orden que vayamos a utilizar
            // (en nuestro caso, `cal 2022`)
            ProcessBuilder pb = new ProcessBuilder("cal", "2022");

            File calendario=new File("calendario2022.txt");
            BufferedWriter bw = new BufferedWriter(
                    new FileWriter(calendario));
            bw.write("------------- Calendario del año 2022 -----------------\n");
            bw.close();
            
            // Para sobreescribir el fichero
            pb.redirectOutput(ProcessBuilder.Redirect.to(calendario));
            // Para ampliar el fichero
            //pb.redirectOutput(ProcessBuilder.Redirect.appendTo(calendario));

            // Lanzamos el proceso con Start, que nos
            // devuelve un objeto de tipo Process.
            pb.start();

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
