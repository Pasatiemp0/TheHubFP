import java.util.Scanner;

public class adivinaNumero {
    static Scanner input = new Scanner(System.in);
    
    public static void main(String[] args) {
        int numeroAleatorio = (int) (Math.random()*100 + 1);
        boolean adivinado = false;
        int oportunidades = 1;
        int inputNum;
        try {
            System.out.println("\nBienvenido valiente, estás preparado al mundo de adivinanza de números?\n"); 
            Thread.sleep(2000);
            System.out.println( "Te encuentras... \033[31m!!NUMERO OVERLORD!!\033[0m\n");
            Thread.sleep(2000);
            System.out.println("Ha generado 5 duplicados.\n" +
                    "Tienes 5 oportunidades para localizar su verdadera forma y ejecutarle.\n" +
                    "Una vez agotadas tus oportunidades, escapará y generará nuevos duplicados.\n" +
                    "Basta de charla, adelante, valiente!");
            System.out.println("La magia duerme \033[31mentre 1 y 100(ambos incluido)\033[0m!\n");
        } catch (InterruptedException e) {

        }

        do {
            if (!adivinado && oportunidades == 6) {
                System.out.println("\033[H\033[2J");
                System.out.println("Lo siento, has agotado tus 5 oportunidades. \033[32mEl número correcto era: " + numeroAleatorio +"\033[0m");
                numeroAleatorio = (int) (Math.random()*100 + 1);
                System.out.println("\033[0mHa genrado nuevos duplicados el OVERLORD. Sigue adelante!");
                oportunidades = 1;
            }
            System.out.print("Desenvaiana tu " + oportunidades + " numero > ");
            inputNum = input.nextInt();
            if (inputNum == numeroAleatorio){
                System.out.println("\033\32mEnhorabuena, has adivinado el numero!\033[0m");
                adivinado = true;
            }else if (inputNum > numeroAleatorio) {
                System.out.println("Tu numero es mayor, intenta a aplicar un toque más suave");
            }else {
                System.out.println("Tu numero es menor, intenta a aplicar un toque más profundo");
            }

            oportunidades++;
        } while (!adivinado);
    }

}
