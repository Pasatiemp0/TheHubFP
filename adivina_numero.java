import java.util.Scanner;

public class adivina_numero {
    static Scanner input = new Scanner(System.in);

    public static void flujoPrincipal() {
        System.out.println("Te encuentras... NÚMERO OVERLORD");
        System.out.println("Ha generado cinco duplicados. "
                Tienes 5 oportunidades para localizar su verdadera forma y ejecutarlo. 
                Una vez agotadas tus oportunidades, escapará y generará nuevos duplicados. 
                ¡Basta de charla, adelante, valiente guerrero!");

    }

    public static void main(String[] args) {
        int numeroAleatorio = (int) (Math.random()*100 + 1);
        boolean adivinado = false;
        int oportunidades = 0;
        int inputNum;
        System.out.println("Bienvenido valiente, estás preparado al mundo de adivinanza de números?");
        System.out.print("¡Pasa tu primer número, !");
        do {
            inputNum = input.nextInt();
            if (inputNum == numeroAleatorio){
                System.out.println("Enhorabuena, has adivinado el numero!");
                adivinado = true;
            }else if (inputNum > numeroAleatorio) {
                system.out.println("El numero es mayor");
                //请求再次输入
            }else{
                system.out.println("El numero es menor");
                //请求再次输入
            }
    
        } while (!adivinado);
    }

}
