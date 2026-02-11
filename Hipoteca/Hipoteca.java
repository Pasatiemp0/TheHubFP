package Hipoteca;

public class Hipoteca {

    private int precioCasa;
    private int dineroPrestado;
    private String propietario;

    public Hipoteca(int precioCasa, int dineroPrestado, String propietario){
        this.precioCasa = precioCasa;
        this.dineroPrestado = dineroPrestado;
        this.propietario = propietario;
    }

    public int getPrecioCasa(){
        return precioCasa;
    }

    public int getDineroPrestado(){
        return dineroPrestado;
    }

    public String getPropietario(){
        return propietario;
    }

    public boolean OKHipoteca(){
        if (propietario.length() > 10 && precioCasa < dineroPrestado) {
            return true;
        } else {
            return false;
        }
    }
    
}
