package SQL;

import java.sql.*;

public class PruebaConexion {

    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/testdb?useSSL=false&serverTimezone=UTC";
        String user = "root";
        String pass = "medqog-6zoBfa-qiwkub";

        // try-with-resources cierra la conexión automáticamente
        try (Connection conn = DriverManager.getConnection(url, user, pass)) {
            System.out.println("✅ ¡Conexión exitosa a MySQL!");
            System.out.println("Base de datos: " + conn.getCatalog());
        } catch (SQLException e) {
            System.err.println("❌ Error de conexión: " + e.getMessage());
            System.err.println("Código error: " + e.getErrorCode());
        }
    }
}