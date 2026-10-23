import java.io.*;

public class main {

    public static void main (String[] args){
        GestorAlumnos lista = new GestorAlumnos();
        File fichero        = new File("alumnos.csv");

        if (!fichero.exists()) { 
            System.out.println("Comprobar el fichero de los alumnos y volver a intentarlo.");
        }
        else{
            try (BufferedReader br = new BufferedReader(new FileReader(fichero))) {
                String line;
                while ((line = br.readLine()) != null) {
                    String [] lineValues = line.split(",");
                    lista.agregarAlumno(lineValues[0], Integer.parseInt(lineValues[1]), lineValues[2], Double.parseDouble(lineValues[3]));
                }
            }catch (IOException e) {
                System.out.println("Error al leer el archivo: " + e.getMessage());
            } 
        }

        lista.mostrarAlumnos();

        lista.ordenarAlumnosPorNota();
        System.out.println("\n" + "Alumno con mayor nota: " + lista.getList().get(0).toString() + "\n");

        String output = "AlumnosAprobados.csv";
        try(BufferedWriter bw = new BufferedWriter(new FileWriter(output))){
            bw.write("Nombre,Edad,Ciclo,Nota\n");
            for (Alumno alumno : lista.getList()) {
                if (alumno.getNota() >= 5) {
                    bw.append(alumno.toString() + "\n");
                }
            }

        }catch (IOException e) {
            System.out.println("Error al escribir el archivo: " + e.getMessage());
        }


    }
}