public class Alumno {

    private String nombre;
    private int    edad;
    private String modulo;
    private double nota;

    Alumno(String nombre, int edad, String modulo, double nota) {
        this.nombre = nombre;
        this.edad   = edad;
        this.modulo = modulo;
        this.nota   = nota;
    }

    public double getNota() {
        double nota = this.nota;        
        return nota;
    }

    @Override 
    public String toString() {
        return (nombre + "," + edad + "," + modulo + "," + nota);
    }
}
