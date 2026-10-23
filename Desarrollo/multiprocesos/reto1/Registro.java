import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Registro {
    public static void escribir(String mensaje) throws Exception {
        String fecha = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date());
        FileWriter archivo = new FileWriter("fabrica.log", true);
        archivo.write("[" + fecha + "] " + mensaje + "\n");
        archivo.close();
    }
}
