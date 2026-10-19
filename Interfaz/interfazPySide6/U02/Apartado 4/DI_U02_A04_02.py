import os

from PySide6.QtGui import QAction, QIcon, QKeySequence
from PySide6.QtWidgets import QApplication, QMainWindow, QToolBar


# Nuestra ventana principal hereda de QMainWindow
class VentanaPrincipal(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle(
            "Ventana principal con menú y barra de herramientas")
        barra_menus = self.menuBar()
        menu = barra_menus.addMenu("&Menu")
        ruta_a_icono = os.path.join(os.path.dirname(
            __file__), "images/console.png")
        # Añadimos a la acción, un icono
        accion = QAction(QIcon(ruta_a_icono), "Imprimir por consola", self)
        accion.setWhatsThis(
            "Al pulsar sobre el botón se imprimirá un texto por consola")
        accion.setShortcut(QKeySequence("Ctrl+p"))
        accion.triggered.connect(self.imprimir_por_consola)
        menu.addAction(accion)

        # Creamos la barra de herramientas
        barra_herramientas = QToolBar("Barra de herramientas 1")
        # Añadimos el QAction a la barra de herramientas
        barra_herramientas.addAction(accion)
        # Añadimos la barra de herramientas a la aplicación
        self.addToolBar(barra_herramientas)

    def imprimir_por_consola(self):
        print("Acción lanzada a través del menú, del atajo" +
              " o de la barra de herramientas")


if __name__ == "__main__":
    app = QApplication([])

    ventana1 = VentanaPrincipal()
    ventana1.show()

    app.exec()
