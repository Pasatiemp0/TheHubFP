/**
 * @author: Jiandong_Yao(Alejandro)
 * @info: reto4_programación
 */

import java.util.Scanner;

public class reto4_Jiandong_Yao {
    static Scanner input = new Scanner(System.in);
    static int[] pile = {1,2,3};

    public static void shuffle() {
        System.out.print("Introduce el número de veces de intercambios >");
        int shuffleNum = input.nextInt();
        do {
            for (int counter = 0; counter < 3; counter++) {
                int randomIndex = (int) (Math.random() * 3);
                if (randomIndex == counter) {
                    continue;
                }
                pile[randomIndex] ^= pile[counter]; 
                pile[counter] ^= pile[randomIndex];
                pile[randomIndex] ^= pile[counter];
            }
        } while (shuffleNum-- > 0);
    }

    public static void printPile() {
        System.out.println("Posición actual:");
        for (int cart : pile) {
            if (cart == 1) {
                System.out.println("Reina de corazones");
            } else if (cart == 2) {
                System.out.println("Dos de picas");
            } else {
                System.out.println("As de diamantes");
            }
        }
        for (int posicion = 1; posicion <= pile.length; posicion++) {
            if ((pile[posicion - 1]^1) == 1){
                System.out.println("Reina de corazones está en la posición " + posicion); 
                break;
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("JUEGO DE TRILLEROS\n");
        System.out.println("Tinenes que adivinar la ubicación de la \"Reina de corazones\" después de intercambiar un número de veces.");
        Boolean exit = false;

        do {
            shuffle();
            System.out.print("Adinvina la posición de la \"Reina de corazones\" >");
            int userPosicion = input.nextInt();
            String result = (pile[userPosicion -1] == 1) ? "¡Correcto!" : "¡Incorrecto!";
            System.out.println(result);
            printPile();
            System.out.print("\n¿Quieres jugar otra vez? Introduce 1 para otro juego >");
            exit = input.nextInt() != 1;
        } while (!exit);
    }
}
