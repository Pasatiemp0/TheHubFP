import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ProcesoTransporte {
    public static void main(String[] args) throws Exception {
        BufferedReader entrada = new BufferedReader(new InputStreamReader(System.in));
        String linea;
        while ((linea = entrada.readLine()) != null) {
            String[] datos = linea.split(" ");
            Thread.sleep(500);
            Registro.escribir("Transporte reparte producto #" + datos[0]
                    + " (capacidad actual del almacén " + datos[1] + "/" + Reto1.CAPACIDAD + ")");
            System.out.println("OK");
        }
        entrada.close();
    }
}
