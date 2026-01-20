public class XOR {

    public static void main(String[] args) {
        int a =5;
        int b =6;
        a ^= b;
        b ^= a;
        a ^= b;
        System.out.println(a);
        System.out.println(b);
        int arr[] = new int[]{a,b};
        System.out.println(arr[0]);
    }
    
}
