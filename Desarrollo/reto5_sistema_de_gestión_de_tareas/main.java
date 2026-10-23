package Programación.reto5_sistema_de_gestión_de_tareas;

import java.util.Scanner;

public class main {

    /** Formatear los colores de impreso, {@code \033[%d%dm} es la patrona básica */
    private static final String VERDE    = "\033[32m";
    private static final String ROJO     = "\033[31m";
    private static final String CIAN     = "\033[36m";
    private static final String AMARILLO = "\033[33m";
    private static final String RESET    = "\033[0m";
    private static final String LINEA    = "─".repeat(52);

    private static final Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        SistemaTareas sistema = new SistemaTareas();

        System.out.println(VERDE + "\n" + LINEA);
        System.out.println("  Sistema de Gestion de Tareas");
        System.out.println(LINEA + RESET);
        System.out.println(AMARILLO
            + "  Agregar : [2] titulo rapido  [3] titulo+descripcion  [4] varias (coma)"
            + "\n  Eliminar: [6] por posicion en lista                  [7] por titulo exacto"
            + RESET);

        int opcion;
        do {
            System.out.println("\n" + CIAN + LINEA);
            System.out.println("  MENU  (" + sistema.total() + " tarea(s))");
            System.out.println(LINEA + RESET);
            System.out.println("  1. Listar tareas");
            System.out.println("  2. Agregar (titulo)");
            System.out.println("  3. Agregar (titulo + descripcion)");
            System.out.println("  4. Agregar varias");
            System.out.println("  5. Completar tarea");
            System.out.println("  6. Eliminar por posicion");
            System.out.println("  7. Eliminar por titulo");
            System.out.println("  8. Salir");
            System.out.println(CIAN + LINEA + RESET);

            opcion = leerEntero("  Opcion: ", 1, 8);

            switch (opcion) {
                case 1 -> {
                    System.out.println("\n" + CIAN + "── Tareas " + LINEA.substring(10) + RESET);
                    sistema.listar();
                }
                case 2 -> { System.out.print("  Titulo: ");  sistema.agregar(leerTexto()); }
                case 3 -> {
                    System.out.print("  Titulo     : "); String titulo = leerTexto();
                    System.out.print("  Descripcion: "); String desc   = leerTexto();
                    sistema.agregar(titulo, desc);
                }
                case 4 -> {
                    System.out.print("  Titulos (separados por coma): ");
                    sistema.agregar(sc.nextLine().trim().split(","));
                }
                case 5 -> sistema.completar(leerEntero("  Posicion: ", 1, Integer.MAX_VALUE));
                case 6 -> sistema.eliminar(leerEntero("  Posicion: ", 1, Integer.MAX_VALUE));
                case 7 -> { 
                    System.out.print("  Titulo: "); 
                    sistema.eliminar(leerTexto()); 
                }
                case 8 -> System.out.println(VERDE + "\n  Hasta luego!" + RESET);
            }
        } while (opcion != 8);

        sc.close();
    }

    private static String leerTexto() {
        String s;
        while ((s = sc.nextLine().trim()).isBlank())
            System.out.print("  (No puede estar vacio) -> ");
        return s;
    }

    private static int leerEntero(String etiqueta, int min, int max) {
        while (true) {
            System.out.print(etiqueta);
            try {
                int val = Integer.parseInt(sc.nextLine().trim());
                if (val >= min && val <= max) return val;
                System.out.println(ROJO + "  [ERROR] Ingrese un numero entre " + min + " y " + max + "." + RESET);
            } catch (NumberFormatException e) {
                System.out.println(ROJO + "  [ERROR] Se esperaba un numero entero." + RESET);
            }
        }
    }
}
