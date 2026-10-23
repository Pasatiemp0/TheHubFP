class Alumno{
    private String nombre;
    private int    edad;
    private String titulacion;
    private double notaMedia;

    public Alumno(String nombre, int edad, String titulacion, double notaMedia) {
        this.nombre     = nombre;
        this.edad       = edad;
        this.titulacion = titulacion;
        this.notaMedia  = notaMedia;
    }

    public void setAlumno(String nombre, int edad, String titulacion, double notaMedia){
        this.nombre     = nombre;
        this.edad       = edad;
        this.titulacion = titulacion;
        this.notaMedia  = notaMedia;
    }

    public Double getNotaMedia() {
        return notaMedia;
    }

    @Override
    public String toString() {
        return nombre + "," + edad + "," + titulacion + "," + notaMedia;
    }
    
    
}