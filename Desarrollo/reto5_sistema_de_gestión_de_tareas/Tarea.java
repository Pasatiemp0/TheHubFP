package Programación.reto5_sistema_de_gestión_de_tareas;

public class Tarea {

    final int    id;
    final String titulo;
    final String descripcion;
    String       estado;   // "PENDIENTE" | "COMPLETADA"

    Tarea(int id, String titulo, String descripcion) {
        this(id, titulo, descripcion, "PENDIENTE");
    }

    Tarea(int id, String titulo, String descripcion, String estado) {
        this.id          = id;
        this.titulo      = titulo;
        this.descripcion = descripcion;
        this.estado      = estado;
    }

    void completar() { this.estado = "COMPLETADA"; }

    @Override
    public String toString() {
        String desc = descripcion.isEmpty() ? "" : " - " + descripcion;
        return String.format("  #%-3d [%-10s] %s%s", id, estado, titulo, desc);
    }
}
