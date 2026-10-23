import java.io.IOException;

public class cp3 {
    public static void main(String[] args) {

        ProcessBuilder pb=new ProcessBuilder();
        
        for (int index=0; index<args.length; index++){
            try{
                pb.command(args[index]);
                Process p=pb.start();
                System.out.println("Lanzado el comando "+args[index]+" con PID "+p.pid()+" en "+p.info().startInstant().toString());
            } catch (IOException e){
                System.out.println("Error de E/S: "+e.getMessage());
            }
        }
    }
}
