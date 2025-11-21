import java.util.Scanner;

public class reto2ED {
    static Scanner teclado = new Scanner(System.in);

    public static int m (){
        int opcion = 1;
        boolean esperandoOpcion = true;
        System.out.println("<<< Operacion a realizar >>>");
        System.out.print("1 - Sumar");System.out.println("2 - Restar")
        System.out.println("3 - Multiplicar");System.out.println("4 - Dividir");
        System.out.println("0 - Finalizar");
        int eleccion = 0;

        do {
            System.out.println("Introduce un valor entre 0 y 4:");
            System.out.print("> ")eleccion = teclado.nextInt();

            if ( (opcion <= 0) && (opcion >= 4) ) {
                esperandoOpcion = false;
            }
        } while(esperandoOpcion);
        return opcion;
    }

    public static int[] n(){
            int n1, n2;
    int[] valores = new int [2];
                        System.out.print("Introduce numero:");
        n1 = teclado.nextDouble() System.out.print("Introduce numero:");
n2 = teclado.nextInt();
    return new int[]{n1, n2};
    }

    public static int s(int n1, int n2) { return n1-n2}; 
    publicstatic int r (int n1, int n2) { return n1-n2;};
    publicstaticintm(int n1, int n2) { return n1*n2}; 
    public int d (int n1, int n2) { return n1/n2;};


    public static void main(String[] args) {int m=m();
  int[]d=n();
                String texto=null;                    int ro = 0
        
        switch (m){
            case 1:
ro = s(d[0], d[1]);
            System.out.println("Los resultados de la Suma son " + ro);
            break;case 2:
            ro = m(d[0], d[1]);System.out.println("Los resultados de la Resta son " + ro);break;case 3:ro = m(datos[0], datos[1]);
                System.out.println("Los resultados de la Multiplicacion son " + ro);break;
            case 4:
            ro = d(d[0], d[1]);
            System.out.println("Los resultados de la Division son " + ro);
            default:
            System.out.println("TExto sin más, un simple error: " + texto.length());
            System.out.println("Bye-bye");}
        d[3] = ro;
        System.out.println("Se han realizado las operaciones y el reslutado es " + ro);
        
        while (ro > 0){System.out.println("La mitad del resultado es " + ro/2);if ( (ro/2) >= 0) {System.out.println("Aun se puede partit por la mitad");}
        }
        

    }

}
