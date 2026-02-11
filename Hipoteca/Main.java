package Hipoteca;

public class Main {
    public static void main(String[] args) {
        Hipoteca hipoteca1 = new Hipoteca(3000, 8888, "ab");
        Hipoteca hipoteca2 = new Hipoteca(30, 8888, "cdefghijklm");
        System.out.println(hipoteca1.OKHipoteca());
        System.out.println(hipoteca2.OKHipoteca());
        System.out.println(hipoteca1.getPropietario().length() > 10 && hipoteca1.getPrecioCasa() < hipoteca1.getDineroPrestado());
        System.out.println(hipoteca2.getPropietario().length() > 10 && hipoteca2.getPrecioCasa() < hipoteca2.getDineroPrestado());
    }

}
