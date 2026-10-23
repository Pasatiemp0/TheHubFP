import java.io.*;

public class recuento {

    public static void main(String[] args) {
        File archivo = new File("recuento.txt");
        if (!archivo.exists()) { 
            System.out.println("El archivo no existe.");
            return;
        }
        else{
            try{
                BufferedReader br = new BufferedReader(new FileReader(archivo));
                int contVoc = 0;
                for (String linea; (linea = br.readLine()) != null; ) {
                    for (int i = 0; i < linea.length(); i++) {
                        char c = linea.charAt(i);
                        if (c == 65 || c == 69 || c == 73 || c == 79 || c == 85 || c == 97 || c == 101 || c == 105 || c == 111 || c == 117) {
                            contVoc++;
                        }
                    }
                }
                System.out.println("Cantidad de vocales: " + contVoc);

                br.close();
            } catch (IOException e) {
                System.out.println("Error al leer el archivo: " + e.getMessage());
            }
        }
        

    } 
    
}
