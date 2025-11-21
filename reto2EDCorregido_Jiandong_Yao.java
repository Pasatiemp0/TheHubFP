/**
 * @author Jiandong Yao
 */
import java.util.InputMismatchException;
import java.util.Scanner;

public class reto2EDCorregido_Jiandong_Yao {
    static Scanner teclado = new Scanner(System.in);

    public static int menu() {
        int opcion = -1;
        boolean esperandoOpcion = true;
        System.out.println("<<< Menú Operacion >>>");
        System.out.println("1 - Sumar");
        System.out.println("2 - Restar");
        System.out.println("3 - Multiplicar");
        System.out.println("4 - Dividir");
        System.out.println("0 - Finalizar");

        do {
            try {
                System.out.println("Introduce un valor entre 0 y 4");
                System.out.print("> ");
                opcion = teclado.nextInt();
            } catch (InputMismatchException e) {
                System.out.println("Debes introducir un numero valido correspondiente al Menú.");
                teclado.next();
                continue;
            }

            if ((opcion <= 4) && (opcion >= 0)) {
                esperandoOpcion = false;
            }
        } while (esperandoOpcion);
        return opcion;
    }

    public static int[] numeroInput(int seleccion) {
        int n1, n2;
        System.out.println("Introduce el primer numero de la operacion");
        System.out.print("> ");
        n1 = teclado.nextInt();
        do {
            System.out.println("Introduce el segundo numero de la operacion");
            System.out.print("> ");
            n2 = teclado.nextInt();
            if (seleccion == 4 && n2 == 0) {
                System.out.println("No se puede dividir entre cero.");
            }
        } while (seleccion == 4 && n2 == 0);

        int[] valores = new int[] { n1, n2 };
        return valores;
    }

    public static int sumar(int n1, int n2) {
        return n1 + n2;
    }

    public static int restar(int n1, int n2) {
        return n1 - n2;
    }

    public static int multiplicar(int n1, int n2) {
        return n1 * n2;
    }

    public static double dividir(int n1, int n2) {
        return (double) n1 / n2;
    }

    public static void main(String[] args) {
        int operador = menu();
        if (operador == 0) {
            System.out.println("Bye-bye");
            System.exit(0);
        }
        int[] dosnumeros = numeroInput(operador);
        double resultado = 0;

        switch (operador) {
            case 1:
                resultado = sumar(dosnumeros[0], dosnumeros[1]);
                System.out.println("Los resultados de la Suma son " + resultado);
                break;
            case 2:
                resultado = restar(dosnumeros[0], dosnumeros[1]);
                System.out.println("Los resultados de la Resta son " + resultado);
                break;
            case 3:
                resultado = multiplicar(dosnumeros[0], dosnumeros[1]);
                System.out.println("Los resultados de la Multiplicacion son " + resultado);
                break;
            case 4:
                resultado = dividir(dosnumeros[0], dosnumeros[1]);
                System.out.println("Los resultados de la Division son " + resultado);
                break;
        }

        System.out.println("Se han realizado las operaciones y el reslutado es: " + resultado);

        System.out.println("La mitad del resultado es " + resultado / 2);
        resultado = resultado / 2;
        System.out.println("Aun se puede partir por la mitad: " + resultado / 2);

    }
}
