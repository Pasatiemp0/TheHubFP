import java.util.Scanner;

public class adivina_numero {
    static Scanner input = new Scanner(System.in);
    
    public static void main(String[] args) {
        int numeroAleatorio = (int) (Math.random()*100 + 1);
        boolean adivinado = false;
        int oportunidades = 0;
        int inputNum;
        try {
            System.out.println("Bienvenido valiente, estás preparado al mundo de adivinanza de números?\n"); 
            Thread.sleep(2000);
            System.out.println( "Te encuentras... \033[31m!!NUMERO OVERLORD!!\033[0m\n");
            Thread.sleep(2000);
            System.out.println("Ha generado 5 duplicados.\n" +
                    "Tienes 5 oportunidades para localizar su verdadera forma y ejecutarle.\n" +
                    "Una vez agotadas tus oportunidades, escapará y generará nuevos duplicados.\n" +
                    "Basta de charla, adelante, valiente!");
            System.out.print("La magia duerme \033[31mentre 1 y 100(ambos incluido)\033[0m! desenvaiana tu primer número >");
        } catch (InterruptedException e) {

        }
        do {
            inputNum = input.nextInt();
            if (inputNum == numeroAleatorio){
                System.out.println("Enhorabuena, has adivinado el numero!");
                adivinado = true;
            }else if (inputNum > numeroAleatorio) {
                System.out.print("Tu numero es mayor, intenta a aplicar un toque más suave >");
                inputNum = input.nextInt();
            }else{
                System.out.print("Tu numero es menor, intenta a aplicar un toque más profundo > ");
                inputNum = input.nextInt();
            }

            oportunidades++;
            if (!adivinado && oportunidades == 5) {
                System.out.println("Lo siento, has agotado tus 5 oportunidades. El número correcto era: " + numeroAleatorio);
                numeroAleatorio = (int) (Math.random()*100 + 1);
                System.out.println("Ha genrado nuevos duplicados el OVERLORD. Sigue adelante!");
                oportunidades = 0;
            }
        } while (!adivinado && oportunidades < 5);
    }

}
