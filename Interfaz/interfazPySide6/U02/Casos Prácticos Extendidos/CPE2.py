import os
import platform

from PySide6.QtCore import Qt
from PySide6.QtGui import QAction, QIcon, QKeySequence
from PySide6.QtWidgets import (
    QApplication, QMainWindow, QToolBar, QLabel, QDockWidget,
    QTextEdit, QListWidget)


class VentanaPrincipal(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle(
            "Ventana principal con menú, barra de herramientas " +
            " y barra de estado")

        barra_menus = self.menuBar()
        menu = barra_menus.addMenu("&Menu")
        ruta_a_icono = os.path.join(os.path.dirname(
            __file__), "images/save.png")
        guardar = QAction(QIcon(ruta_a_icono), "Guardar tareas", self)
        guardar.setStatusTip("Guardar tareas")
        guardar.setShortcut(QKeySequence("Ctrl+s"))
        guardar.triggered.connect(self.guardar_tareas)
        menu.addAction(guardar)

        ruta_a_icono = os.path.join(os.path.dirname(
            __file__), "images/open.png")
        cargar = QAction(QIcon(ruta_a_icono), "Cargar tareas", self)
        cargar.setStatusTip("Cargar tareas")
        cargar.setShortcut(QKeySequence("Ctrl+o"))
        cargar.triggered.connect(self.cargar_tareas)
        menu.addAction(cargar)

        barra_herramientas = QToolBar("Barra de herramientas")
        barra_herramientas.addAction(cargar)
        barra_herramientas.addAction(guardar)
        self.addToolBar(barra_herramientas)

        barra_estado = self.statusBar()
        barra_estado.addPermanentWidget(QLabel(platform.system()))
        barra_estado.showMessage("Listo. Esperando acción ...", 3000)

        self.modulos = [
            "Acceso a datos",
            "Desarrollo de interfaces",
            "Programación multimedia y dispositivos móviles",
            "Programación de servicios y procesos",
            "Sistemas de gestión empresarial",
            "Empresa e iniciativa emprendedora",
            "Inglés técnico II"
        ]
        self.lista_modulos = QListWidget()
        self.lista_modulos.insertItems(0, self.modulos)
        self.lista_modulos.setCurrentRow(0)
        self.lista_modulos.itemSelectionChanged.connect(self.modulo_seleccionado)        

        self.tareas_por_modulo = {}
        for modulo in self.modulos:
            self.tareas_por_modulo[modulo] = ""

        dock = QDockWidget()
        dock.setWindowTitle("Lista módulos")
        dock.setWidget(self.lista_modulos)
        dock.setMinimumHeight(150)
        self.addDockWidget(Qt.TopDockWidgetArea, dock)

        self.tareas = QTextEdit(self)
        self.tareas.textChanged.connect(self.cambio_tarea)
        self.setCentralWidget(self.tareas)

    def cargar_tareas(self):
        with open("tareas.txt", "r") as archivo_tareas:
            linea = archivo_tareas.readline()
            for modulo in self.modulos:
                if linea == "[" + modulo + "]\n":
                    linea = archivo_tareas.readline()
                    while (linea != "\n"):
                        self.tareas_por_modulo[modulo] = self.tareas_por_modulo[modulo] + linea
                        linea = archivo_tareas.readline()
                linea = archivo_tareas.readline()
        # Después de cargar mostramos las tareas del primer módulo
        self.tareas.setText(self.tareas_por_modulo[self.modulos[0]])

    def guardar_tareas(self):
        with open("tareas.txt", "w+") as archivo_tareas:
            for modulo in self.modulos:
                archivo_tareas.write(f'[{modulo}]\n')
                if self.tareas_por_modulo[modulo] != '':
                    archivo_tareas.write(self.tareas_por_modulo[modulo] + "\n\n")
                else:
                    archivo_tareas.write("\n")
            archivo_tareas.write("\n")

    def cambio_tarea(self):
        if self.lista_modulos.selectedItems(): # Para evitar excepción al cargar
            self.tareas_por_modulo[self.lista_modulos.selectedItems()[0].text()] = self.tareas.toPlainText()

    def modulo_seleccionado(self):
        item_seleccionado = self.lista_modulos.selectedItems()[0].text()
        self.tareas.setText(self.tareas_por_modulo[item_seleccionado])


if __name__ == "__main__":
    app = QApplication([])

    ventana1 = VentanaPrincipal()
    ventana1.show()

    app.exec()
