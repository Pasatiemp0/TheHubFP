import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class Lanzador3 {
    public static void main(String[] args) {
        try {
            // Creación del processBuilder
            String app[] = {"firefox", "https://docs.oracle.com/en/java/javase/17/core/process-api1.html"};
            // Otras alternativas para lanzar, por ejemplo un editor de texto
            // Linux: Escritorio KDE-Plasma
            // String app[] = {"kwrite", "ejemplo.txt"};
            // Linux: Escritorio Gnome
            // String app[] = {"gedit", "ejemplo.txt"};
            // Windows
            // String app[] = {"notepad.exe", "ejemplo.txt"};

            ProcessBuilder pb = new ProcessBuilder(app);

            // Definimos e instanciamos el proceso
            Process p = pb.start();
            
            // Esperamos 3 segundos.

            // El método waitFor espera el tiempo indicado, y 
            // retorna un valor lógico, incicando si el proceso
            // sigue vivo transcurrido este tiempo.
            // Dado que este método puede generar una excepción
            // de tipo InterruptedException, añadimos ésta 
            // a la cláusula catch
            Boolean isProcessDead = p.waitFor(3, TimeUnit.SECONDS);

            // Si el proceso no se ha destruido antes de 3
            // segundos, le enviamos la señal SIGTERM (p.destroy)
            if (!isProcessDead) {
                System.out.println("Destruyendo la aplicación");
                p.destroy(); // Sugerencia: Puedes usar destroyForcibily y 
                             // comprobar el resultado.
            }

            // Dado que la destrucción del proceso no es inmediata,
            // esperaremos a que éste finalice completamente. Para ello
            // utilizamos el método isAlive, que devuelve si el proceso
            // sigue vivo o no.
            // Si el proceso sigue vivo, esperaremos un milisegundo, y 
            // mostraremos un mensaje.

            while (p.isAlive()) {
                System.out.println("El proceso sigue vivo. Espero un milisegundo.");
                p.waitFor(1, TimeUnit.MILLISECONDS);
            }
            

            System.out.println("El proceso ha finalizado con la salida: "+p.exitValue());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

    }
}
