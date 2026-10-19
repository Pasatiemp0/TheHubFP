from PySide6.QtCore import QLibraryInfo, QTranslator
from PySide6.QtWidgets import QApplication, QFontDialog, QMainWindow, QPushButton


class VentanaPrincipal(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Aplicación con diálogos")

        self.boton = QPushButton("Haz clic para que el dialogo aparezca")
        self.boton.clicked.connect(self.mostrar_dialogo)
        self.setCentralWidget(self.boton)

    def mostrar_dialogo(self):
        seleccionada, fuente = QFontDialog.getFont(self)
        if seleccionada:
            # Asignamos la fuente seleccionada al botón
            self.boton.setFont(fuente)


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
