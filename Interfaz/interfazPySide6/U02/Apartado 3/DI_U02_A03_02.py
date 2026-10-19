from PySide6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QHBoxLayout, QPushButton
)


class VentanaPrincipal(QMainWindow):

    def __init__(self):
        super().__init__()

        self.setWindowTitle("Layout horizontal")

        # Creamos un objeto layout horizontal
        layout_horizontal = QHBoxLayout()

        # Creamos un componente principal para la ventana
        componente_principal = QWidget()
        # Le assignamos el layout vertical como disposición
        componente_principal.setLayout(layout_horizontal)
        self.setCentralWidget(componente_principal)

        # Añadimos cuatro botones al layout vertical
        layout_horizontal.addWidget(QPushButton('Uno'))
        layout_horizontal.addWidget(QPushButton('Dos'))
        layout_horizontal.addWidget(QPushButton('Tres'))
        layout_horizontal.addWidget(QPushButton('Cuatro'))


app = QApplication([])

ventana = VentanaPrincipal()
ventana.show()

app.exec()
