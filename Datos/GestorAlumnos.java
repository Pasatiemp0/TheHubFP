import java.util.ArrayList;
import java.util.Comparator;

public class GestorAlumnos {
     
    private ArrayList<Alumno> alumnos = new ArrayList<>();
    private int                    id = 0;

    public void agregarAlumno(String nombre, int edad, String modulo, double nota) {
        Alumno alumno = new Alumno(nombre, edad, modulo, nota);
        alumnos.add(alumno);
    }
    
    public void mostrarAlumnos() {
        for (Alumno alumno : alumnos) {
            System.out.println(alumno);
        }
    }

    public void ordenarAlumnosPorNota() {
        alumnos.sort(Comparator.comparingDouble(Alumno::getNota).reversed());
    }

    public ArrayList<Alumno> getList() {
        return alumnos;
    }
    
}
