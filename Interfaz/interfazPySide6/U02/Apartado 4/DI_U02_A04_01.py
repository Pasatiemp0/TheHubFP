from PySide6.QtWidgets import QApplication, QMainWindow
from PySide6.QtGui import QAction, QKeySequence


# Nuestra ventana principal hereda de QMainWindow
class VentanaPrincipal(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Ventana principal con menú")
        # Obtenemos la referencia a la barra de menú
        barra_menus = self.menuBar()
        # Añadimos la opción "Menu" al menú principal
        menu = barra_menus.addMenu("&Menu")
        # Definimos el QAction con el texto "Imprimir por consola"
        accion = QAction("&Imprimir por consola", self)
        # Asignamos un atajo de teclado a la acción
        accion.setShortcut(QKeySequence("Ctrl+p"))
        # Connectamos la accion con la ranura "imprimir_por_consola"
        accion.triggered.connect(self.imprimir_por_consola)
        # Añadimos la acción al menú
        menu.addAction(accion)

    def imprimir_por_consola(self):
        print("Acción lanzada a través del menú o del atajo")


if __name__ == "__main__":
    app = QApplication([])
    ventana1 = VentanaPrincipal()
    ventana1.show()
    app.exec()
