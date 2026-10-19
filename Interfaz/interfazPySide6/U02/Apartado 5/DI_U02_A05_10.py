from PySide6.QtWidgets import (
    QApplication, QMainWindow, QPushButton, QLabel, QVBoxLayout, QWidget
    )

# Clase que hereda de QLabel. Si no tiene parent,
# se mostrará en una ventana flotante
class OtraVentana(QLabel):
    def __init__(self):
        super().__init__()
        self.setText("La otra ventana")


class VentanaPrincipal(QMainWindow):

    def __init__(self):
        super().__init__()
        # Necesitamos que la nueva ventana sea una propiedad de la clase,
        # de lo contrario se destruirá al salir del método donde se crea.
        self.otra_ventana = None  # Referencia nula
        self.setWindowTitle("Aplicación con dos ventanas")
        self.boton = QPushButton("Mostrar/ocultar otra ventana")
        self.boton.clicked.connect(self.mostrar_otra_ventana)
        self.setCentralWidget(self.boton)

    def mostrar_otra_ventana(self):
        # Si no está creada,la creamos una sola vez.
        # La desplazamos a la posición de la ventana principal y la mostramos.
        if self.otra_ventana is None:
            self.otra_ventana = OtraVentana()
            self.otra_ventana.move(self.pos())
            self.otra_ventana.show()
        else:
            # Si está oculta la mostramos y si está visible la ocultamos.
            if self.otra_ventana.isHidden():
                self.otra_ventana.move(self.pos())
                self.otra_ventana.show()
            else:
                self.otra_ventana.hide()


app = QApplication([])
ventana_principal = VentanaPrincipal()
ventana_principal.show()
app.exec()
