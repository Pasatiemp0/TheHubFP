import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ProcesoAlmacen {
    public static void main(String[] args) throws Exception {
        BufferedReader entrada = new BufferedReader(new InputStreamReader(System.in));
        int[] inventario = new int[Reto1.CAPACIDAD];
        int cantidad = 0;
        String orden;

        while ((orden = entrada.readLine()) != null) {
            if (orden.equals("CONSULTAR")) {
                if (cantidad < Reto1.CAPACIDAD) {
                    System.out.println("HUECO");
                } else {
                    System.out.println("LLENO");
                }
            } else if (orden.equals("SACAR")) {
                // El lanzador solo pide retirar cuando hay productos guardados.
                int producto = inventario[0];
                for (int i = 1; i < cantidad; i++) {
                    inventario[i - 1] = inventario[i];
                }
                cantidad--;
                System.out.println(producto + " " + cantidad);
            } else {
                int producto = Integer.parseInt(orden);
                inventario[cantidad] = producto;
                cantidad++;
                Registro.escribir("Almacén guarda producto #" + producto
                        + " (capacidad actual del almacén " + cantidad + "/" + Reto1.CAPACIDAD + ")");
                System.out.println("OK");
            }
        }
        entrada.close();
    }
}
