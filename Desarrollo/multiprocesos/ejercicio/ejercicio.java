public class ejercicio {
    public static void main(String[] args) throws InterruptedException {
        Object pista = new Object();

        Coche coche1 = new Coche("Coche 1", pista);
        Coche coche2 = new Coche("Coche 2", pista);

        // Se inician los dos hilos antes de esperar a que terminen.
        coche1.start();
        coche2.start();

        coche1.join();
        coche2.join();
    }
}
