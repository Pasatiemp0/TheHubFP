package Programación.reto5_sistema_de_gestión_de_tareas;

import java.util.ArrayList;

public class SistemaTareas {

    private final ArrayList<Tarea> tareas     = new ArrayList<>();
    private int                    siguienteId = 1;

    // Sobrecarga agregar: solo titulo
    public void agregar(String titulo) {
        agregar(titulo, "");
    }

    // Sobrecarga agregar: titulo + descripcion
    public void agregar(String titulo, String descripcion) {
        Tarea t = new Tarea(siguienteId++, titulo, descripcion);
        tareas.add(t);
        System.out.println("  [OK] Tarea #" + t.id + " agregada: " + t.titulo);
    }

    // Sobrecarga agregar: multiples titulos a la vez
    public void agregar(String... titulos) {
        for (String titulo : titulos) agregar(titulo.trim());
    }

    // Sobrecarga eliminar: por posicion en lista (1-based)
    public void eliminar(int posicion) {
        if (posicion < 1 || posicion > tareas.size()) {
            System.out.println("  [ERROR] Posicion fuera de rango (1-" + tareas.size() + ").");
            return;
        }
        Tarea t = tareas.remove(posicion - 1);
        System.out.println("  [OK] Eliminada: " + t.titulo);
    }

    // Sobrecarga eliminar: por titulo
    public void eliminar(String titulo) {
        for (int i = 0; i < tareas.size(); i++) {
            if (tareas.get(i).titulo.equalsIgnoreCase(titulo)) {
                tareas.remove(i);
                System.out.println("  [OK] Tarea '" + titulo + "' eliminada.");
                return;
            }
        }
        System.out.println("  [ERROR] No se encontro ninguna tarea con ese titulo.");
    }

    public void completar(int posicion) {
        if (posicion < 1 || posicion > tareas.size()) {
            System.out.println("  [ERROR] Posicion fuera de rango (1-" + tareas.size() + ").");
            return;
        }
        Tarea t = tareas.get(posicion - 1);
        if (t.estado.equals("COMPLETADA")) { System.out.println("  [AVISO] Ya estaba completada."); return; }
        t.completar();
        System.out.println("  [OK] Tarea #" + t.id + " completada.");
    }

    // Recursion: lista tareas en orden desde el indice dado
    public void listar() {
        if (tareas.isEmpty()) { System.out.println("  (No hay tareas registradas.)"); return; }
        listar(0);
    }

    private void listar(int indice) {
        if (indice >= tareas.size()) return;
        System.out.println(tareas.get(indice));
        listar(indice + 1);
    }

    public int total() { return tareas.size(); }
}
