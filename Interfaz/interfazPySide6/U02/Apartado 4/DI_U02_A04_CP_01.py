import os

from PySide6.QtCore import Qt
from PySide6.QtGui import QAction, QIcon, QKeySequence
from PySide6.QtWidgets import (
    QApplication, QMainWindow, QToolBar, QWhatsThis, QDockWidget, QLabel, QTextEdit
)


class VentanaPrincipal(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Ventana principal con menús")
        self.setMinimumSize(400, 400)
        barra_menus = self.menuBar()
        menu = barra_menus.addMenu("&Menu")

        ruta_a_icono_imprimir = os.path.join(os.path.dirname(
            __file__), "images/console.png")
        accion_imprimir = QAction(
            QIcon(ruta_a_icono_imprimir), "Imprimir en dock", self)
        accion_imprimir.setWhatsThis(
            "Al ejecutar esta acción se añadirá el texto " +
            "\"Acción pulsada\" en el dock. Se puede lanzar " +
            "por Menú -> Imprimir en dock, con Ctrl + P, " +
            "o haciendo clic en el botón correspondiente de la barra de herramientas")
        accion_imprimir.setShortcut(QKeySequence("Ctrl+p"))
        accion_imprimir.triggered.connect(self.imprimir_por_consola)
        menu.addAction(accion_imprimir)

        ruta_a_icono_que_es = os.path.join(os.path.dirname(
            __file__), "images/whats.png")
        accion_ayuda = QAction(
            QIcon(ruta_a_icono_que_es), "Qué es esto?", self)
        accion_ayuda.setWhatsThis(
            "Al pulsar sobre el botón se activará el modo \"Qué es esto?\"")
        accion_ayuda.setShortcut(QKeySequence("Shift+f1"))
        accion_ayuda.triggered.connect(self.entrar_modo_ayuda)
        menu.addAction(accion_ayuda)

        barra_herramientas = QToolBar("Barra de herramientas 1")
        barra_herramientas.setToolButtonStyle(Qt.ToolButtonTextUnderIcon)
        barra_herramientas.addAction(accion_imprimir)
        barra_herramientas.addAction(accion_ayuda)
        self.addToolBar(barra_herramientas)

        self.dock1 = QDockWidget()
        self.dock1.setWindowTitle("Dock 1")
        self.dock1.setWidget(QTextEdit(""))
        self.dock1.setMinimumWidth(50)
        self.addDockWidget(Qt.TopDockWidgetArea, self.dock1)

        self.setCentralWidget(QLabel("Componente principal"))

    def imprimir_por_consola(self):
        self.dock1.widget().setText(
            self.dock1.widget().toPlainText() + "Acción pulsada\n"
        )

    def entrar_modo_ayuda(self):
        if(QWhatsThis.inWhatsThisMode()):
            QWhatsThis().leaveWhatsThisMode()
        else:
            QWhatsThis().enterWhatsThisMode()


if __name__ == "__main__":
    app = QApplication([])
    app.setAttribute(Qt.AA_DontShowIconsInMenus)
    ventana1 = VentanaPrincipal()
    ventana1.show()
    app.exec()
