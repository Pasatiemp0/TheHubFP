from PySide6.QtWidgets import QApplication, QLabel, QWidget

class Ventana(QWidget):
    def __init__(self):
        QWidget.__init__(self)
        self.setWindowTitle("Ventana")

        # Creamos dos etiquetas con el componente como parent
        self.label1 = QLabel("Etiqueta 1", self)
        self.label2 = QLabel("Etiqueta 2", self)
        # Necesitamos mover la segunda para que no se solape con la primera
        self.label2.move(0, 30)

if __name__ == "__main__":
    app = QApplication([])
    ventana = Ventana()
    # Mostramos la ventana
    ventana.show()
    app.exec()
