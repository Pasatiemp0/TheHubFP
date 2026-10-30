import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class Coche extends Thread {
    private static final DateTimeFormatter FORMATO_HORA =
            DateTimeFormatter.ofPattern("HH:mm:ss.SSS");
    private final Object pista;

    public Coche(String nombre, Object pista) {
        super(nombre);
        this.pista = pista;
    }

    @Override
    public void run() {
        // Ambos coches comparten este objeto: solo uno puede usar la pista.
        synchronized (pista) {
            System.out.println(getName() + " entra en la pista a las "
                    + LocalTime.now().format(FORMATO_HORA));
            try {
                // sleep no libera el bloqueo de la pista.
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                System.out.println(getName() + " sale de la pista a las "
                        + LocalTime.now().format(FORMATO_HORA));
            }
        }
    }
}
