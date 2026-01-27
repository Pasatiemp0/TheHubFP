import java.util.Scanner;

public class codigo2 {
    /*
     * ╔══════════════════════════════════════════╗
     * ║ Juego de trileros con cartas             ║
     * ╠══════════════════════════════════════════╣
     * ║ Autor:                                   ║
     * ║ Reto: 4                                  ║
     * ║ Unidad: 4                                ║
     * ║ Materia: Programación                    ║
     * ╚══════════════════════════════════════════╝
     */

    static Scanner teclado = new Scanner(System.in);

    // este metodo muestra las como estan las cartas al inicio del juego 
    public static String[] cartas_iniciales() {

        System.out.println("       juego de trileros con cartas       ");
        System.out.println("═══════════════════════════════════════════════");
        System.out.println("Instrucciones del juego:");
        System.out.println("1) primero vas a ver la posicion de la Reina de corazones");
        System.out.println("2) luego deberas ingresar cuántas veces quieres barajear");
        System.out.println("3) por ultimo vas a adivinar en que posición quedo la Reina de corazones");

        String[] cartas = { "reina de corazones", "dos de picas", "as de diamantes" };

        System.out.println("Cartas iniciales:");
        for (int i = 0; i < cartas.length; i++) {
            System.out.println("  Posición " + i + "= " + cartas[i]);
        }
        return cartas;
    }

    // aqui el usuario ingresa el número de veces que quiere barajear
    public static int entrada_barajeo() {
        int veces = 0;
        boolean entrada_valida = true;
        do {
            System.out.println("¿ingresa las veces quieras barajear las cartas? ");
            System.out.print("  <");
            veces = teclado.nextInt();

            if (veces >= 0) {
                entrada_valida = false;
            } else {
                System.out.println(" Debes ingresar un número positivo.");
            }
        } while (entrada_valida);

        return veces;
    }

    // barajeo de lass cartas
    public static int barajear_cartas(String[] cartas, int veces) {
        String auxiliar = "";

        int posicion_reina = 0; // La Reina empieza en posición 0

        for (int i = 0; i < veces; i++) {

            auxiliar = cartas[0];
            cartas[0] = cartas[1];
            cartas[1] = cartas[2];
            cartas[2] = auxiliar;

            // esta parte la he usado para ver la ubicación de la reina en cada barajeo
            if (posicion_reina == 0) {
                posicion_reina = 2;
            } else if (posicion_reina == 2) {
                posicion_reina = 1;
            } else if (posicion_reina == 1) {
                posicion_reina = 0;
            }
        }

        return posicion_reina;
    }

    // aca el usuario adivina la posición de la reina
    public static void adivinar_posicion(int pocicion_final) {

        int posicion_usuario = 0;
        boolean entrada_valida = true;

        do {
            System.out.println("Adivina cual es la posición de la Reina de corazones (0, 1 o 2): ");
            System.out.print("   <");

            posicion_usuario = teclado.nextInt();

            if (posicion_usuario >= 0 && posicion_usuario <= 2) {
                entrada_valida = false;
            } else {
                System.out.println("Debes ingresar 0, 1 o 2.");
            }

        } while (entrada_valida);

        if (posicion_usuario == pocicion_final) {
            System.out.println("es correcto! la Reina de corazones está en la posición: " + pocicion_final);
        } else {
            System.out.println("respuesta incorrecta, la posición correcta era= " + pocicion_final);
        }
    }

    // muestra el resultado final del juego
    public static void mostrar_resultado_final(String[] cartas, int posicion_reina) {
        System.out.println("Posicion final de las cartas:");
        for (int i = 0; i < cartas.length; i++) {
            System.out.println("  Posición " + i + ": " + cartas[i]);
        }
    }

    public static void main(String[] args) {
        int veces = 0;
        int posicion_reina = 0;

        String[] cartas = cartas_iniciales();

        veces = entrada_barajeo();

        posicion_reina = barajear_cartas(cartas, veces);

        adivinar_posicion(posicion_reina);

        mostrar_resultado_final(cartas, posicion_reina);

        teclado.close();
    }
}
