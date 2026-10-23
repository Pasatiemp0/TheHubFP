import java.util.List;
import java.util.ArrayList;
import java.util.stream.*;

public class Lista {
    List<Alumno> listaAlumnos = new ArrayList<>();
    Collector<Alumno, ?, List<Alumno>> collector = Collectors.toList();

    public void agregarAlumno(String nombre, String edad, String modulo, String nota) {
        Alumno alumno = new Alumno(
            nombre, 
            Integer.parseInt(edad), 
            modulo, 
            Double.parseDouble(nota)
        );
        listaAlumnos.add(alumno);
    }

    public List<Alumno> getAprobados() {
        return listaAlumnos.stream()
                    .filter(alumno -> alumno.getNotaMedia() >= 5.0)
                    .collect(collector);
    }
    
    public List<Alumno> getSuspendidos() {
        return listaAlumnos.stream()
                    .filter(alumno -> alumno.getNotaMedia() < 5.0)
                    .collect(collector);
    }

    public List<Alumno> getList() {
        return listaAlumnos;
    }

}
