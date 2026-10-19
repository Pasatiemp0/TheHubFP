from PySide6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout, QPushButton
)


class VentanaPrincipal(QMainWindow):

    def __init__(self):
        super().__init__()

        self.setWindowTitle("Layout vertical")

        # Creamos un objeto layout vertical
        layout_vertical = QVBoxLayout()

        # Añadimos cuatro botones al layout vertical
        layout_vertical.addWidget(QPushButton('Uno'))
        layout_vertical.addWidget(QPushButton('Dos'))
        layout_vertical.addWidget(QPushButton('Tres'))
        layout_vertical.addWidget(QPushButton('Cuatro'))

        # Creamos un componente principal para la ventana
        componente_principal = QWidget()
        # Le assignamos el layout vertical como disposición
        componente_principal.setLayout(layout_vertical)
        self.setCentralWidget(componente_principal)


app = QApplication([])

ventana = VentanaPrincipal()
ventana.show()

app.exec()
