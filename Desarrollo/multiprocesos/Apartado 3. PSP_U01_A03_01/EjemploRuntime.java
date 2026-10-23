public class EjemploRuntime {

    // Definimos r como la referencia al entorno de ejecución actual
    private Runtime r = Runtime.getRuntime();

    private void InfoCPU() {
        // r.availableProcessors() nos indica los procesadores que tenemos disponibles
        System.out.println("Procesadores disponibles: " + this.r.availableProcessors());
    }

    private void InfoMem() {

        // r.totalMemory() nos indica la cantidad de memoria reservada para la JVM
        System.out.println("Memoria Total: " + this.r.totalMemory());

        // r.freeMemory() nos indica la memoria libre en la JVM
        System.out.println("Memoria Libre: " + this.r.freeMemory());

        // Para calcular la memoria ocupada, restamos 
        // la memoria libre a la memoria total
        System.out.println("Memoria ocupada: " + (this.r.totalMemory() - this.r.freeMemory()));
    }

    private void InvocarGB() {
        // Método para invocar al Garbage Collector
        this.r.gc();
    }

    public static void main(String[] args) throws Exception {

        EjemploRuntime ejRt = new EjemploRuntime();

        // Mostramos información sobr la CPU
        ejRt.InfoCPU();

        // Mostramos el estado actual de la memoria de la JVM
        System.out.println("\n---------Estatdo inicial----------");
        ejRt.InfoMem();
        
        
        // Ahora vamos a crear varios objetos para generar memoria, 
        // y observar cómo van ocupándola.
        for (int y = 0; y <= 10000; y++) {
            new Object();
        }

        System.out.println("\n-----Estado después de crear 10.000 objetos:-----");
        ejRt.InfoMem();

        // Ahora invocamos al Garbage Collector, para que
        // elimine las referencias no usadas
        ejRt.InvocarGB();

        // Y volvemos a obtener los mismos datos
        System.out.println("\n-----Estado después de invocar al recolector de basura-----");
        ejRt.InfoMem();
    }
}
