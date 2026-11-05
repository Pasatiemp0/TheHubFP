package Desarrollo.multiprocesos.reto2;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

public class Cajero implements Runnable{
    private List<Cliente> cola = new ArrayList<>();

    public Cajero(){
        
    }

    public void atender(List<Cliente> cola){
        System.out.println(LocalDateTime.now());
    }

    @Override
    public void run() {
        synchronized(cola){
            atender(cola);
            
        }
        
    }
}
