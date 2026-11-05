package Desarrollo.multiprocesos.reto2;

import java.util.List;
import java.util.ArrayList;

public class cola {
    static int cID = 1;
    
    public static void main(String[] args) {
        List<Cliente> cola = new ArrayList<>();
        Cajero Camarero = new Cajero();
        Cajero Camarera = new Cajero();

        
        
        do {
            try (new Thread()){
                cola.add(new Cliente());
                Thread.sleep(5000);
                
            } catch (Exception e) {
                // TODO: handle exception
            }



        } while (cola!=null && cola.isEmpty());
        
    }
}
