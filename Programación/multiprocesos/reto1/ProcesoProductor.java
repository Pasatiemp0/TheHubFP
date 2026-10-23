import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ProcesoProductor {
    public static void main(String[] args) throws Exception {
        BufferedReader entrada = new BufferedReader(new InputStreamReader(System.in));
        int pieza = 0;
        while (entrada.readLine() != null) {
            Thread.sleep(100);
            pieza++;
            Registro.escribir("Productor crea pieza #" + pieza);
            System.out.println(pieza);
        }
        entrada.close();
    }
}
