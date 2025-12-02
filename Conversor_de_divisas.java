import java.util.ArrayList;
import java.util.Scanner;

//EUR como divisa base
//ej  USD a GBP: 100 -> 72.72
//100 USD 
//100/0.8*1.1=137.5
//arraylist<>

public class Conversor_de_divisas {
    static double USD = 0.8;
    static double JPY = 179.8;
    static double GBP = 1.1;
    static double RMB = 8.2;

    static Scanner tec = new Scanner(System.in);

    public static double solicitudDivisa (int int_solicitud) {
        double divisa;

        switch (int_solicitud) {
            case 1:
                divisa = 1;
                break;
            case 2:
                divisa = USD;
                break;
            case 3:
                divisa = JPY;
                break;
            case 4:
                divisa = GBP;
                break;
            case 5:
                divisa = RMB;
                break;
            default:
                break;
        }        
        return divisa;
    }

    public static void main(String[] args) {
        double inputUsuario;
        double divisa;
        ArrayList<String> registro =new ArrayList<String>();
        System.out.println("taza cuardada");
        System.out.println();
        System.out.println("modificaion");
        solicitudDivisa(tec.nextInt());
        System.out.println("taza actual");

        
        System.out.println("Monedas admitidas para la conversión: ");
        System.out.println("Euro, Yenes, Dólares, Libras.");
        System.out.println("1. Euro, 2. Yenes, 3. Dólares, 4. Libras, 5. Ren Ming Bi");
        divisa = solicitudDivisa(tec.nextInt());
        System.out.println("Cantidad");
        divisa = tec.nextInt()/tec.nextDouble();
        System.out.println("Destinado");
        divisa = divisa*solicitudDivisa(tec.nextInt());


        registro.add(null);
        
               


    }
}
