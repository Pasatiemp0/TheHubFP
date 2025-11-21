/**
*<p> Reto 2. Mensaje con Java </p>
*@author: Jiandong_Yao(Alejandro)
*
*/
import java.util.Scanner;

public class MensajeJava {

    static Scanner tecladoUsuario = new Scanner(System.in);

    public static String solicitarNombre(String posicion) {
        System.out.print("Introduzca tu " + posicion + " > ");
        String input = tecladoUsuario.nextLine().trim();

        while (input.isEmpty() && posicion != "Segundo Apellido((opcional)") {
            System.out.print("\033[31mEL " + posicion + " no puede estar vacio. /n" +
                    "Incorporar de nuevo > \033[0m"); 
            input = tecladoUsuario.nextLine().trim();
        }
        
        return input;      
    }

    public static void saludo(String nombre, String apellidos) {
        System.out.println("\033[32mHola, " + nombre + " " + apellidos + ".\033[0m");

    }

    public static String solicitarCargo() {
        System.out.print("Introduzca tu cargo > ");
        String inputCargo = tecladoUsuario.nextLine().trim();
        try {
            inputCargo = inputCargo.substring(0, 1).toUpperCase() + inputCargo.substring(1);
        } catch (Exception IndexOutOfBoundsException) {
            inputCargo = "(Sin cargo)";
        }

        return inputCargo;
    }

    public static String formatear(String textoOriginal, String posicion) {
        if (posicion.equals("NOMBRE")) {
            return textoOriginal = " " + textoOriginal.toUpperCase();
        } else {
            return textoOriginal = textoOriginal.substring(0, textoOriginal.indexOf(" ")).toLowerCase()
                    + textoOriginal.substring(textoOriginal.indexOf(" ")).toUpperCase();
        }

    }

    public static void salido(String nombre, String apellidos, String cargo) {
        System.out.println("\033[32mAtentamente, " + nombre + " " + apellidos + ", " + cargo + ".\033[0m");

    }

    public static void main(String[] args) {
        String Nombre = solicitarNombre("Nombre");
        String Apellidos = solicitarNombre("Primer Apellido");
        Apellidos += solicitarNombre("Segundo Apellido((opcional)");

        saludo(Nombre, Apellidos);

        String Cargo = solicitarCargo();

        Nombre = formatear(Nombre, "NOMBRE");
        Apellidos = formatear(Apellidos, "apellido APELLIDO");

        salido(Nombre, Apellidos, Cargo);
    }

}
