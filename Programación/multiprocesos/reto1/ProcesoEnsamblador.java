import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ProcesoEnsamblador {
    public static void main(String[] args) throws Exception {
        BufferedReader entrada = new BufferedReader(new InputStreamReader(System.in));
        int producto = 0;
        // Primero espera el HUECO del almacén, reenviado por el lanzador.
        while (entrada.readLine() != null) {
            String piezas = "";
            for (int i = 0; i < Reto1.PIEZAS_POR_PRODUCTO; i++) {
                piezas += "#" + entrada.readLine() + " ";
            }
            Thread.sleep(150);
            producto++;
            Registro.escribir("Ensamblador usa piezas " + piezas + "para crear producto #" + producto);
            System.out.println(producto);
        }
        entrada.close();
    }
}
