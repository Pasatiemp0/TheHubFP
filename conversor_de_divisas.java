/**
 * <p> Proyecto Programación 
 * @author: César Bailon; Estefan ; Jiandong Yao(Alejandro)
 * 
 * {@code \033[**m} marcador de color de texto en consola,
 * los valores representan @param ** {31=rojo, 32=verde, 0=reset},
 * se lo usan para la indicación de ingreso usuario.
 * {@ \n} marcador salto de línea en consola
 * >>PARA MEJOR LECTURA DEL CÓDIGO, OMITA LOS MARCADOR<<
 * 
 * {@code String.equals() /.equalsIgnoreCase() } compara el valor
 * de String /ignorando mayúsculas y minúsculas
 * 
 * <p> metodos de ArrayList:
 * {@code .add()} añade un elemento al final de una lista
 * {@code .get(indice)} obtiene el valor de la lista en la
 * posición @param indice
 * {@code .set(indice, valor)} modifica el valor de la lista
 * en la posición @param indice por @param valor
 * {@code .size()} devuelve el tamaño de la lista
 * {@code .clear()} elimina todos los elementos de la lista
 * 
 * @param puntero índice del último valor de ArrayList
 */

import java.util.ArrayList;
import java.util.Scanner;

public class conversor_de_divisas {

    static ArrayList<Double> tasas = new ArrayList<Double>();
    static ArrayList<String> xau_nombre = new ArrayList<String>();
    static ArrayList<String> historial = new ArrayList<String>();
    static String registro;
    static int puntero = 5;
    
    static Scanner tec = new Scanner(System.in);

    public static void imprimirTasas (int indice) {
        System.out.println("\nTasas de conversión respecto al oro por onza:");
        for (int i = 1; i <= indice; i++) {
            System.out.println("\033[32m" + i + "\033[0m. \033[31m" + xau_nombre.get(i) + "\033[0m: " + tasas.get(i));
        }
    }

    /**
    * <p> ej: EUR -> USD origen=2; destino=1; cantidad = 100
    * xau_nombre.get(origen) = "EUR"; xau_nombre.get(destino) = "USD";
    * tasas.get(origen) = 3623.18; tasas.get(destino) = 4226.34;
    * tasas.get(origen)/tasas.get(destino) = 0.8572854999834372
    * String.format("%.2f", (cantidad / tasas.get(origen) * tasas.get(destino))) = "85.73"
    * 
    * {@code String.format("%.2f", argumento)} formatea el @param argumento
    * a dos decimales, este método @return un valor String, porque pertenece
    * a la clase String.
    * % es el marcador de posición ante la regla de formatear,
    * .2 indica cuantos decimales a mostrar, f indica tipo número flotante
    */
    public static void convertirDivisa() {
        int origen, destino, cantidad;
        boolean salir = false;
        System.out.println("Has elegido \033[32m1\033[0m. Convertir divisas. \n" +
                    "Si quieres volver al menú principal, introduce \033[32m0\033[0m en cualquier momento.\n");
        do {
            System.out.print("Introduce el \033[32mNÚMERO\033[0m correspondiente a la divisa de origen >> ");
            origen = tec.nextInt();
            if (origen <= 0) {
                salir = true;
                break;
            }else if (origen >= tasas.size()) {
                System.out.println("Divisa no válida. Inténtalo de nuevo.");
                continue;
            }
            System.out.print("Introduce el \033[32mNÚMERO\033[0m correspondiente a la divisa de destino >> ");
            destino = tec.nextInt();
            if (destino <= 0) {
                salir = true;
                break;
            } else if (destino >= tasas.size()|| destino == origen) {
                System.out.println("Divisa no válida. Inténtalo de nuevo.");
                continue;
            }
            System.out.println("La tasa de conversión de \033[031m" + xau_nombre.get(origen) + "\033[0m a \033[031m" + xau_nombre.get(destino) + "\033[0m es: " + (tasas.get(destino)/tasas.get(origen)));
            System.out.print("Introduce la CANTIDAD a convertir de \033[031m" + xau_nombre.get(origen) + "\033[0m en \033[031m" + xau_nombre.get(destino) +"\033[0m >> ");
            cantidad = tec.nextInt();
            if (cantidad == 0) {
                salir = true;
                break;
            }
            registro = "El valor de " + cantidad + " " + xau_nombre.get(origen) + " en " + xau_nombre.get(destino) + " es: " + String.format("%.2f",(cantidad / tasas.get(origen) * tasas.get(destino)));
            System.out.println(registro);
            historial.add(registro);
            System.out.print("Introduce \033[32m0\033[0m para volver al menú principal o cualquiera para modificar otra divisa \n>> ");
            if (tec.next().equals("0")) {
                salir = true;
            }
        } while (!salir);

    }
    
    public static void modificarDivisa() {
        int indice;
        boolean salir = false;
        System.out.println("Has elegido \033[32m2\033[0m. Modificar o añadir divisas. \n" +
                    "Las tasas de conversión referentes pueden consultar a "+ xau_nombre.get(0)+
                    "\nSi quieres volver al menú principal, introduce \033[32m0\033[0m.\n");
        do {
            System.out.print("Introduce el \033[32mNÚMERO\033[0m correspondiente a la divisa que quieres modificar. \n" +
                        "En el caso de añadir nueva divisas, introduce \033[32m" + tasas.size() + "\033[0m \n>> ");
            indice = tec.nextInt();
            if (indice <= 0) {
                salir = true;
                break;
            }else if (indice >= tasas.size()) {
                System.out.print("Define el \033[31mNOMBRE\033[0m de la nueva divisa >> ");
                xau_nombre.add(tec.next());
                puntero++;
                System.out.println("Introduce la TASA de \033[31m" + xau_nombre.get(puntero) + "\033[0m respecto al oro por onza >> ");
                tasas.add(tec.nextDouble());
                registro = "Nueva divisa añadida: " + xau_nombre.get(puntero) + " con tasa " + tasas.get(puntero);
            }else {
                System.out.println("La tasa actual de \033[31m" + xau_nombre.get(indice) + "\033[0m es: " + tasas.get(indice));
                System.out.println("Queres modificar el \033[31mNOMBRE\033[0m de la divisa? (s/n) >> ");
                registro = tec.next();
                if (registro.equalsIgnoreCase("s")||registro.equalsIgnoreCase("si")||registro.equalsIgnoreCase("sí")) {
                    System.out.print("Introduce el \033[31mNOMBRE\033[0m NUEVO de la divisa >> ");
                    xau_nombre.set(indice, tec.next());
                }
                System.out.print("Introduce la TASA NUEVA de la divisa >> ");
                tasas.set(indice, tec.nextDouble());
                registro = "Divisa modificada: " + xau_nombre.get(indice) + " con nueva tasa " + tasas.get(indice);
            }
            historial.add(registro);
            System.out.print("Introduce \033[32m0\033[0m para volver al menú principal o cualquiera para modificar otra divisa \n>> ");
            if (tec.next().equals("0")) {
                salir = true;
            }
        } while (!salir);
    }

    /**
    * <p> (CTRL + "nombre de método") Atajo para ir a la dirección del método
    */
    public static void main(String[] args) {
        double inputUsuario;
        tasas.add(1.0); xau_nombre.add("www.goldrate.com");
        tasas.add(4226.34); xau_nombre.add("USD");
        tasas.add(3623.18); xau_nombre.add("EUR");
        tasas.add(653656.88); xau_nombre.add("JPY");
        tasas.add(3163.29); xau_nombre.add("GBP");
        tasas.add(29862.40); xau_nombre.add("CNY");
        boolean salir = false;

        do{
            imprimirTasas(puntero);
            System.out.println("\n================Menú principal==================");
            System.out.println("Elegir una opcion:");
            System.out.println("\033[32m1\033[0m. Convertir divisas");
            System.out.println("\033[32m2\033[0m. Modificar o añadir divisas");
            System.out.println("\033[32m3\033[0m. Ver historial de conversiones");
            System.out.println("\033[32m4\033[0m. Salir\n");
            System.out.print("Introduce el \033[32mNÚMERO\033[0m correspondiente a la opción >> ");
            inputUsuario = tec.nextInt();

            if (inputUsuario == 1) {
                convertirDivisa();
                
            } else if (inputUsuario == 2) {
                modificarDivisa();

            } else if(inputUsuario == 3) {
                System.out.println("Historial de conversiones:");
                if (historial.isEmpty()) {
                    System.out.println("Sin historial disponible.");
                }else {
                    for (String recorreCada1 : historial) {
                        System.out.println(recorreCada1);
                    }
                    System.out.print("Limpiar historial? (s/n) >> ");
                    registro = tec.next();
                    if (registro.equalsIgnoreCase("s")||registro.equalsIgnoreCase("si")||registro.equalsIgnoreCase("sí")) {
                        historial.clear();
                        System.out.println("Historial limpiado.");
                    }
                }
            } else if (inputUsuario == 4) {
                salir = true;

            } else {
                System.out.println("Opción no válida.");
                
            }

        }while(!salir);
        System.out.println("Gracias por usar el conversor de divisas. ¡Hasta luego!");
    }
}
