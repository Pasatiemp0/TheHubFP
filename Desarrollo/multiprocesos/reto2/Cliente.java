/**Hilo generador de clientes: Cada cliente deberá tener ID 
 * (que empiece en 1 y vaya autoincrementándose), 
 * nº de productos que tiene (un número entre 5 y 20), 
 * tiempo de atención estimado 
 * (lo que va a costar atenderles, entre 2500 y 7500 milisegundos) 
 * y un estado (esperando, siendo atendido, finalizado). 
 * Cada nuevo cliente se generará de forma dinámica 
 * (cada cierto tiempo, entre un mínimo y un máximo, 
 * del orden del tiempo de atención estimado) 
 * y se unirá a la cola común. Se debe mostrar por consola cuando 
 * se genere un cliente y entre en la cola, enseñando el ID del cliente, 
 * el número de productos que lleva encima y su estado. 
 * También se debe actualizar el estado y mostrar cuando le atienda un cajero 
 * y cuando termine con él.
 * 客户生成流程：每位客户必须包含一个 ID（从 1 开始递增）、所购商品数量（5 至 20 件）、
 * 预计服务时间（2500 至 7500 毫秒）以及一个状态（等待、正在服务、已完成）。
 * 每位新客户将动态生成（以固定的时间间隔生成，介于最小值和最大值之间，
 * 大致相当于预计服务时间），并添加到公共队列中。
 * 控制台应在收银员为客户服务以及服务完成后显示客户的 ID、所购商品数量及其状态。
 * Hilos cajeros (al menos 2): Cada cajero debe atender clientes (de uno en uno) de la cola compartida. Deben simular el tiempo de atención estimado del cliente que les toca atender. También mostrarán por consola cuando empiezan a atender a un cliente (y sus datos), cuando terminan de hacerlo y el tiempo que les ha costado. De paso, que digan cuantos clientes quedan en la cola.
 * 收银员线程（至少 2 个）：每个收银员必须依次为共享队列中的顾客提供服务。
 * 他们必须模拟每位顾客的预计服务时间。
 * 他们还需在控制台上显示何时开始服务顾客（及其详细信息）、
 * 何时结束服务以及所用时间。此外，他们还应显示队列中剩余的顾客数量。
 * Cola compartida: Es donde se quedarán esperando los clientes generados 
 * hasta que les atienda un cajero. Debe ser segura para multihilo, 
 * ya que los cajeros accederán a ella de forma concurrente. 
 * 共享队列：生成的顾客信息将在此队列中等待收银员为其服务。
 * 由于收银员会同时访问该队列，因此必须确保其在多线程环境下的安全性。
*/

package Desarrollo.multiprocesos.reto2;


public class Cliente implements Runnable{
    private int cID;
    private int numeroProducto = (int)(Math.random()*16)+5;
    int tiempo                 = (int)(Math.random()*5001) + 2500;
    String estado              = ""; //esperando, siendo atendido, finalizado

    public Cliente(int cID){
        this.cID = cID;
        
    }

    @Override
    public String toString() {
        return cID + "," + numeroProducto + "," + tiempo + "," + estado;
    }

    @Override
    public void run() {
        // TODO Auto-generated method stub
        
    }
}
