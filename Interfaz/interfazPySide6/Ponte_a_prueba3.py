from PySide6.QtWidgets import (
    QApplication,
    QMainWindow,
    QWidget,
    QFormLayout,
    QLabel,
    QLineEdit,
    QSpinBox,
    QPushButton,
    QDoubleSpinBox
)


class VentanaPrincipal(QMainWindow):

    def __init__(self):
        super().__init__()

        self.setWindowTitle("Layout formulario")

        # Creamos un objeto layout formulario
        layout_formulario = QFormLayout()
        componente_principal = QWidget()
        componente_principal.setLayout(layout_formulario)
        self.setCentralWidget(componente_principal)

        # Cada fila contendrá una etiqueta y un componente de entrda
        layout_formulario.addRow(QLabel("Usuario: "), QLineEdit())
        layout_formulario.addRow(QLabel("Contraseña: "), QLineEdit())
        layout_formulario.addRow(QPushButton("Login"))
        layout_formulario.addRow(QLabel("Insertar el usuario y su contraseña."))

        layout_formulario.itemAt(5).widget().setVisible(False)

        def verificar():

            layout_formulario.itemAt(5).widget().setVisible(True)
            if layout_formulario.itemAt(1).widget().text() == "admin" and  layout_formulario.itemAt(3).widget().text() == "admin":
                layout_formulario.itemAt(5).widget().setText("Usuario correcto")
                layout_formulario.itemAt(5).widget().setStyleSheet("color:green")
            else:
                layout_formulario.itemAt(5).widget().setText("Usuario incorrecto")
                layout_formulario.itemAt(5).widget().setStyleSheet("color:red")
        layout_formulario.itemAt(4).widget().clicked.connect(verificar)

app = QApplication([])
ventana = VentanaPrincipal()
ventana.show()
app.exec()
