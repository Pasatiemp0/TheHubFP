import os
import platform

from PySide6.QtGui import QAction, QIcon, QKeySequence
from PySide6.QtWidgets import QApplication, QMainWindow, QToolBar, QLabel


class VentanaPrincipal(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle(
            "Ventana principal con menú, barra de herramientas " +
            " y barra de estado")
        barra_menus = self.menuBar()
        menu = barra_menus.addMenu("&Menu")
        ruta_a_icono = os.path.join(os.path.dirname(
            __file__), "images/console.png")
        accion = QAction(QIcon(ruta_a_icono), "Imprimir por consola", self)
        accion.setWhatsThis(
            "Al pulsar sobre el botón se imprimirá un texto por consola")
        accion.setStatusTip("Imprimir por consola")
        accion.setShortcut(QKeySequence("Ctrl+p"))
        accion.triggered.connect(self.imprimir_por_consola)
        menu.addAction(accion)

        barra_herramientas = QToolBar("Barra de herramientas 1")
        barra_herramientas.addAction(accion)
        self.addToolBar(barra_herramientas)

        # Obtenemos la referencia a la barra de estado
        barra_estado = self.statusBar()
        # Agregamos un componente permanente con la plataforma
        barra_estado.addPermanentWidget(QLabel(platform.system()))
        # Mostramos un mensage durante 3 segundos
        # que se sobrescibirá al pasar el puntero por una acción
        barra_estado.showMessage("Listo. Esperando acción ...", 3000)

    def imprimir_por_consola(self):
        print("Acción lanzada a través del menú, del atajo " +
              " o de la barra de herramientas")


if __name__ == "__main__":
    app = QApplication([])

    ventana1 = VentanaPrincipal()
    ventana1.show()

    app.exec()
