public class suma {
    public static void main(String[] args) {
        // Si no se proporcionan dos argumentos cerramos la aplicación
        if (args.length!=2) System.exit(-1);
        
        long num1, num2;
        long suma=0L;
        if (Long.parseLong(args[0])>Long.parseLong(args[1]))
        {
            num1=Long.parseLong(args[1]);
            num2=Long.parseLong(args[0]);
        } else {
            num1=Long.parseLong(args[0]);
            num2=Long.parseLong(args[1]);
        }

        for (Long i=num1; i<=num2; i++){
            suma+=i;
            /*try{
                Thread.sleep(10);
            } catch (InterruptedException ex){}*/
        }


        System.out.println(suma);
        
    }
}
