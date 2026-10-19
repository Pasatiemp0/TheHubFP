from PySide6.QtCore import QLibraryInfo, QTranslator
from PySide6.QtWidgets import (
    QApplication, QMessageBox, QMainWindow, QPushButton
)


class VentanaPrincipal(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Aplicación con mesaje crítico")

        boton = QPushButton("Haz clic para ver el mensaje crítico")
        boton.clicked.connect(self.mostrar_dialogo)
        self.setCentralWidget(boton)

    def mostrar_dialogo(self):
        # Creamos un QMessageBox crítico. Recibe como argumentos
        # El titulo, el mensaje, los botones y  el botón por defecto
        boton_pulsado = QMessageBox.critical(
            self,
            "Ejemplo de cuadro de mensaje crítico",
            "Ha habído algun problema al realizar la acción",
            buttons=QMessageBox.Discard | QMessageBox.NoToAll |
                QMessageBox.Ignore,
            defaultButton=QMessageBox.Discard
        )

        # Comparamos el botón pulsado con cada tipo que les hemos pasado
        if boton_pulsado == QMessageBox.Discard:
            print("Descartado!")
        elif boton_pulsado == QMessageBox.NoToAll:
            print("No a todo!")
        else:
            print("Ignorado!")
    
def cargar_traductor(app):
    translator = QTranslator(app)
    translations = QLibraryInfo.location(QLibraryInfo.TranslationsPath)
    translator.load("qt_es", translations)
    app.installTranslator(translator)


app = QApplication([])

cargar_traductor(app)

ventana_principal = VentanaPrincipal()
ventana_principal.show()

app.exec()
