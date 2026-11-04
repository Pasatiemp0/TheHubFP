package Desarrollo.multiprocesos.reto2;

public class Cajero implements Runnable{

    private final Object cola;

    public Cajero

    @Override
    public void run() {
        synchronized(cola){
            System.out.println();
        }
        
    }
}
