/** @author: Jiandong(Alejandro) Yao
 *   Reto 10++: Sistema de gestión de reservas con manejo de excepciones
 */
package Programación.Sistema_de_reservas;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Scanner;

public class main {

    private static final DateTimeFormatter FMT_FECHA = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    
    /**Formatear los colores de impreso, {@code \033[%d%dm} es la patrona básica*/
    private static final String VERDE    = "\033[32m";
    private static final String ROJO     = "\033[31m";
    private static final String CIAN     = "\033[36m";
    private static final String AMARILLO = "\033[33m";
    private static final String RESET    = "\033[0m";
    private static final String LINEA    = "─".repeat(52);

    private static final Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        SistemaReserva sistema = new SistemaReserva();
        sistema.cargarHistorial();

        System.out.println(VERDE
            + "\n         Bienvenid@ al Hotel Cold-faced AWS         "
            + RESET);

        int opcion;
        do {
            System.out.println("\n" + CIAN + LINEA);
            System.out.println("  MENU PRINCIPAL");
            System.out.println(LINEA + RESET);
            System.out.println("  1. Consultar reservas activas");
            System.out.println("  2. Consultar historial completo");
            System.out.println("  3. Hacer reserva");
            System.out.println("  4. Cancelar reserva");
            System.out.println("  5. Ver historial.txt");
            System.out.println("  6. Ver excepciones.log");
            System.out.println("  7. Salir");
            System.out.println(CIAN + LINEA + RESET);

            opcion = leerEntero("  Opción: ", 1, 7);

            switch (opcion) {
                case 1 -> {
                    System.out.println("\n" + CIAN + "── Reservas activas " + LINEA.substring(20) + RESET);
                    sistema.consultarReservas(true);
                }
                case 2 -> {
                    System.out.println("\n" + CIAN + "── Historial completo " + LINEA.substring(22) + RESET);
                    sistema.consultarReservas(false);
                }
                case 3 -> hacerReserva(sistema);
                case 4 -> cancelarReserva(sistema);
                case 5 -> leerArchivo("historial.txt",    "historial.txt");
                case 6 -> leerArchivo("excepciones.log",  "excepciones.log");
                case 7 -> System.out.println(VERDE + "\n  ¡Hasta pronto! Que tenga un buen día." + RESET);
            }
        } while (opcion != 7);

        sc.close();
    }

    // ── Flujo: hacer reserva ──────────────────────────────────
    private static void hacerReserva(SistemaReserva sistema) {
        System.out.println("\n" + CIAN + "── Nueva reserva " + LINEA.substring(17) + RESET);

        System.out.print("  Nombre    : ");
        String nombre   = leerTexto();
        System.out.print("  Apellido  : ");
        String apellido = leerTexto();

        int numHab      = leerEntero("  Habitación  : ", 1, 200);
        LocalDate entrada = leerFecha("  Fecha entrada", LocalDate.now());
        LocalDate salida  = leerFecha("  Fecha salida ", entrada.plusDays(1));

        sistema.hacerReserva(nombre, apellido, numHab, entrada, salida);
    }

    // ── Flujo: cancelar reserva ───────────────────────────────
    private static void cancelarReserva(SistemaReserva sistema) {
        System.out.println("\n" + CIAN + "── Cancelar reserva " + LINEA.substring(20) + RESET);
        System.out.println(AMARILLO + "  (Consulte el historial para ver el ID de la reserva.)" + RESET);
        int id = leerEntero("  ID a cancelar: ", 1, Integer.MAX_VALUE);
        sistema.cancelarReserva(id);
    }

    // ── Ver archivo en bruto ──────────────────────────────────
    private static void leerArchivo(String ruta, String titulo) {
        System.out.println("\n" + CIAN + "── " + titulo + " " + LINEA.substring(titulo.length() + 4) + RESET);
        File f = new File(ruta);
        if (!f.exists()) {
            System.out.println(AMARILLO + "  (El archivo aún no existe.)" + RESET);
            return;
        }
        try (BufferedReader br = new BufferedReader(new FileReader(f))) {
            String linea;
            boolean vacio = true;
            while ((linea = br.readLine()) != null) {
                System.out.println("  " + linea);
                vacio = false;
            }
            if (vacio) System.out.println(AMARILLO + "  (El archivo está vacío.)" + RESET);
        } catch (IOException e) {
            System.out.println(ROJO + "  [ERROR] No se pudo leer " + ruta + ": " + e.getMessage() + RESET);
        }
    }

    // ── Helpers de entrada ────────────────────────────────────

    // Lee una cadena no vacía
    private static String leerTexto() {
        String s;
        while ((s = sc.nextLine().trim()).isBlank())
            System.out.print("  (No puede estar vacío) → ");
        return s;
    }

    // Lee un entero en [min, max] con reintento ante entrada inválida
    private static int leerEntero(String etiqueta, int min, int max) {
        while (true) {
            System.out.print(etiqueta);
            try {
                int val = Integer.parseInt(sc.nextLine().trim());
                if (val >= min && val <= max) return val;
                System.out.println(ROJO + "  [ERROR] Ingrese un número entre " + min + " y " + max + "." + RESET);
            } catch (NumberFormatException e) {
                System.out.println(ROJO + "  [ERROR] Entrada inválida. Se esperaba un número entero." + RESET);
            }
        }
    }

    // Lee una fecha con sugerencia de defecto; Enter acepta el defecto
    private static LocalDate leerFecha(String etiqueta, LocalDate defecto) {
        while (true) {
            System.out.print(etiqueta + " [DD-MM-YYYY] (Enter = " + defecto.format(FMT_FECHA) + "): ");
            String entrada = sc.nextLine().trim();
            if (entrada.isEmpty()) return defecto;
            try {
                LocalDate fecha = LocalDate.parse(entrada, FMT_FECHA);
                if (fecha.format(FMT_FECHA).equals(entrada)) return fecha;
            } catch (DateTimeParseException e) { }
            System.out.println(ROJO
                + "  [ERROR] Fecha invalida o inexistente. Use el formato DD-MM-YYYY (ej. 20-05-2026)."
                + RESET);
        }
    }
}
