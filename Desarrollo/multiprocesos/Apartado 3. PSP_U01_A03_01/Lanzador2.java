import java.io.IOException;

public class Lanzador2 {
    public static void main(String[] args) {
        try {
            // Definimos un vector de Strings con el comando
            // y los argumentos. En este caso, lanzamos el comando 
            // firefox y una URL como argumento.
            String app[] = {"firefox", "https://docs.oracle.com/en/java/javase/17/core/process-api1.html"};
            
            // Creamos el ProcessBuilder
            ProcessBuilder pb = new ProcessBuilder(app);

            // Crearemos dos objetos de tipo Process para almacenar 
            // los procesos devueltos por cada una de las invocaciones a start.
            Process p1=pb.start();
            Process p2=pb.start();

            // Mostramos el PID de los procesos
            System.out.println("PID del proceso 1: "+p1.pid());
            System.out.println("PID del proceso 2: "+p2.pid());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}