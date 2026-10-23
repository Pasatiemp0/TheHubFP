/**
 * Acceso a datos: Reto Evaluable. Unidad 1
 * @author: Jiandong Yao(Alejandro)
 * 
 * Antes de arrancar este programa, hay que tener añadida la 
 * librería {@link com.google.gson} para los funcionamienyos de objetos JSON.
 * la ruta de la librería es: Reto1\lib\gson-2.10.1.jar
 */

import java.io.*;
import java.util.List;

import com.google.gson.*;

public class main {

    public static void main(String[] args) {
        File   inFile  = new File("Reto1\\src\\alumnos_v2.csv");  //Reto1\src\alumnos_v2.csv
        File   outXML  = new File("Reto1\\output\\InfoBase.xml");
        File outCSV    = new File("Reto1\\output\\AlumnosAprobados.csv");
        File outJSON   = new File("Reto1\\output\\AlumnosSuspendidos.json");
        Lista  lista   = new Lista();

        if (!inFile.exists()) { 
            System.out.println("Comprobar el fichero de los alumnos y volver a intentarlo.");
        }else{
            try(BufferedReader br = new BufferedReader(new FileReader (inFile))) {
                String headers = br.readLine();
                String linea;
                while ((linea = br.readLine()) != null) {
                    String [] valoresLinea = linea.split(",");
                    lista.agregarAlumno(valoresLinea[0], valoresLinea[1], valoresLinea[2], valoresLinea[3]); 
                }
                
                BufferedWriter bw = new BufferedWriter(new FileWriter(outCSV));
                bw.write(headers);
                bw.newLine();
                for (Alumno alumno : lista.getAprobados()) {
                    bw.write(alumno.toString());
                    bw.newLine();
                }
                bw.close();
                
                bw = new BufferedWriter(new FileWriter(outJSON));
                Gson jsonWriter = new GsonBuilder().setPrettyPrinting().create();
                JsonObject alumnosSuspendidos = new JsonObject();
                alumnosSuspendidos.add("alumnosSuspendidos", jsonWriter.toJsonTree(lista.getSuspendidos(), List.class));
                bw.write(jsonWriter.toJson(alumnosSuspendidos));
                bw.close();
                
                bw = new BufferedWriter(new FileWriter(outXML));
                double notaAlta = lista.getList().stream()
                                        .mapToDouble(Alumno::getNotaMedia)
                                        .max().orElse(-1);
                int   aprobados = lista.getAprobados().size();
                int suspendidos = lista.getSuspendidos().size();
                
                bw.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
                bw.newLine();
                bw.append("<info>");
                bw.newLine();
                bw.append(" <p>La nota media más alta: " + (notaAlta > 0 ? notaAlta : "") + "</p>");
                bw.newLine();
                bw.append(" <p>El número total de suspendidos: " + suspendidos + "</p>");
                bw.newLine();
                bw.append(" <p>El número total de aprobados: " + aprobados + "</p>");
                bw.newLine();bw.append("</info>");
                bw.newLine();
                bw.close();

            }catch (IOException e) {
                System.out.println("Error al leer el archivo: " + e.getMessage());
            }
            

        }
            

    }
    
}
