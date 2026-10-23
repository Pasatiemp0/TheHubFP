import java.io.IOException;

public class Lanzador {
    public static void main(String[] args) {
        try {
            // Definimos un vector de Strings con el comando
            // y los argumentos. En este caso, lanzamos el comando 
            // firefox y una URL como argumento.
            String app[] = {"firefox", "https://docs.oracle.com/en/java/javase/17/core/process-api1.html"};
            
            // Creamos el ProcessBuilder
            ProcessBuilder pb = new ProcessBuilder(app);

            // Para lanzar el proceso debemos utilizar el método start.
            pb.start();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}