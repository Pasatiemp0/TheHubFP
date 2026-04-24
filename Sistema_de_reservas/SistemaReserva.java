package Sistema_de_reservas;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;

public class SistemaReserva {

    private static final String          HISTORIAL   = "historial.txt";
    private static final String          EXCEPCIONES = "excepciones.log";
    static final         DateTimeFormatter FMT_FECHA  = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    // ── Clase interna: Reserva ────────────────────────────────
    static class Reserva {

        final int       id;
        final String    nombre;
        final String    apellido;
        final int       numeroHabitacion;
        LocalDate       fechaEntrada;
        LocalDate       fechaSalida;
        String          estado;               // "ACTIVA" | "CANCELADA"

        // Constructor para nuevas reservas (estado siempre ACTIVA)
        Reserva(int id, String nombre, String apellido, int numeroHabitacion,
                LocalDate fechaEntrada, LocalDate fechaSalida) {
            this(id, nombre, apellido, numeroHabitacion, fechaEntrada, fechaSalida, "ACTIVA");
        }

        // Constructor completo (carga desde archivo)
        Reserva(int id, String nombre, String apellido, int numeroHabitacion,
                LocalDate fechaEntrada, LocalDate fechaSalida, String estado) {
            this.id               = id;
            this.nombre           = nombre;
            this.apellido         = apellido;
            this.numeroHabitacion = numeroHabitacion;
            this.fechaEntrada     = fechaEntrada;
            this.fechaSalida      = fechaSalida;
            this.estado           = estado;
        }

        // Serializa a una línea de texto CSV para historial.txt
        String aLinea() {
            return id + "," + nombre + "," + apellido + "," + numeroHabitacion
                 + "," + fechaEntrada.format(FMT_FECHA) + "," + fechaSalida.format(FMT_FECHA) + "," + estado;
        }

        // Reconstruye una Reserva desde una línea de historial.txt
        static Reserva desdeLinea(String linea) {
            String[] p = linea.split(",", 7);
            if (p.length != 7)
                throw new IllegalArgumentException("Formato inválido: " + linea);
            return new Reserva(
                Integer.parseInt(p[0].trim()),
                p[1].trim(), p[2].trim(),
                Integer.parseInt(p[3].trim()),
                LocalDate.parse(p[4].trim(), FMT_FECHA),   // lanza DateTimeParseException si la fecha no existe
                LocalDate.parse(p[5].trim(), FMT_FECHA),
                p[6].trim()
            );
        }

        void cancelar() { this.estado = "CANCELADA"; }

        @Override
        public String toString() {
            return String.format(
                "  #%-4d | %-12s %-12s | Hab. %-4d | Entrada: %s  Salida: %s | [%s]",
                id, nombre, apellido, numeroHabitacion,
                fechaEntrada.format(FMT_FECHA), fechaSalida.format(FMT_FECHA), estado);
        }
    }

    // ── Estado del sistema ────────────────────────────────────
    private final ArrayList<Reserva> reservas    = new ArrayList<>();
    private int                      siguienteId = 1;  // se ajusta al cargar el historial

    // ── Registro de excepciones en excepciones.log ────────────
    private static void registrarExcepcion(String operacion, Exception ex) {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(EXCEPCIONES, true))) {
            bw.write("[" + LocalDate.now().format(FMT_FECHA) + "] " + operacion
                   + " -> " + ex.getClass().getSimpleName() + ": " + ex.getMessage());
            bw.newLine();
        } catch (IOException ioEx) {
            System.err.println("  [ERROR CRITICO] No se pudo escribir en excepciones.log");
        }
    }

    // ── Carga historial.txt al iniciar ────────────────────────
    void cargarHistorial() {
        File archivo = new File(HISTORIAL);
        if (!archivo.exists()) return;          // primer arranque: sin historial previo

        try (BufferedReader br = new BufferedReader(new FileReader(archivo))) {
            String linea;
            int lineaNum = 0;
            while ((linea = br.readLine()) != null) {
                lineaNum++;
                linea = linea.trim();
                if (linea.isEmpty()) continue;
                try {
                    Reserva r = Reserva.desdeLinea(linea);
                    reservas.add(r);
                    if (r.id >= siguienteId) siguienteId = r.id + 1;  // mantiene el autoincremento
                } catch (IllegalArgumentException | DateTimeParseException ex) {
                    System.err.println("  [AVISO] Línea " + lineaNum + " omitida por formato incorrecto.");
                    registrarExcepcion("cargarHistorial (línea " + lineaNum + ")", ex);
                }
            }
        } catch (FileNotFoundException ex) {
            // No debería ocurrir tras el chequeo anterior, pero se registra por seguridad
            registrarExcepcion("cargarHistorial", ex);
        } catch (IOException ex) {
            System.err.println("  [ERROR] Fallo al leer " + HISTORIAL + ": " + ex.getMessage());
            registrarExcepcion("cargarHistorial", ex);
        }
    }

    // ── Guarda todas las reservas en historial.txt ────────────
    void guardarHistorial() {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(HISTORIAL, false))) {
            for (Reserva r : reservas) {
                bw.write(r.aLinea());
                bw.newLine();
            }
        } catch (IOException ex) {
            System.err.println("  [ERROR] No se pudo guardar el historial: " + ex.getMessage());
            registrarExcepcion("guardarHistorial", ex);
        }
    }

    // ── Hacer reserva ─────────────────────────────────────────
    void hacerReserva(String nombre, String apellido, int numeroHabitacion,
                      LocalDate fechaEntrada, LocalDate fechaSalida) {

        if (!fechaSalida.isAfter(fechaEntrada)) {
            System.out.println("  [ERROR] La fecha de salida debe ser posterior a la de entrada.");
            registrarExcepcion("hacerReserva",
                new IllegalArgumentException("Fechas incoherentes: " + fechaEntrada + " / " + fechaSalida));
            return;
        }

        // Detecta solapamiento: misma habitación, ambas reservas ACTIVAS, fechas se cruzan
        for (Reserva r : reservas) {
            if (r.numeroHabitacion == numeroHabitacion
                    && r.estado.equals("ACTIVA")
                    && fechaEntrada.isBefore(r.fechaSalida)
                    && fechaSalida.isAfter(r.fechaEntrada)) {
                System.out.println("  [ERROR] La habitación " + numeroHabitacion
                        + " ya está reservada del " + r.fechaEntrada.format(FMT_FECHA)
                        + " al " + r.fechaSalida.format(FMT_FECHA) + ".");
                registrarExcepcion("hacerReserva",
                    new IllegalStateException("Solapamiento en habitación " + numeroHabitacion));
                return;
            }
        }

        Reserva nueva = new Reserva(siguienteId++, nombre, apellido,
                                    numeroHabitacion, fechaEntrada, fechaSalida);
        reservas.add(nueva);
        guardarHistorial();
        System.out.println("  [OK] Reserva creada exitosamente:");
        System.out.println(nueva);
    }

    // ── Cancelar reserva ──────────────────────────────────────
    void cancelarReserva(int id) {
        for (Reserva r : reservas) {
            if (r.id == id) {
                if (r.estado.equals("CANCELADA")) {
                    System.out.println("  [AVISO] La reserva #" + id + " ya estaba cancelada.");
                    registrarExcepcion("cancelarReserva",
                        new IllegalStateException("Reserva #" + id + " ya cancelada"));
                    return;
                }
                r.cancelar();
                guardarHistorial();
                System.out.println("  [OK] Reserva #" + id + " cancelada.");
                return;
            }
        }
        // No se encontró el ID
        System.out.println("  [ERROR] No existe ninguna reserva con ID #" + id + ".");
        registrarExcepcion("cancelarReserva",
            new IllegalArgumentException("ID inexistente: " + id));
    }

    // ── Consultar reservas ────────────────────────────────────
    void consultarReservas(boolean soloActivas) {
        boolean hayResultados = false;
        for (Reserva r : reservas) {
            if (!soloActivas || r.estado.equals("ACTIVA")) {
                System.out.println(r);
                hayResultados = true;
            }
        }
        if (!hayResultados) {
            System.out.println("  (No hay reservas"
                    + (soloActivas ? " activas" : "") + " registradas.)");
        }
    }
}
