from PySide6.QtCore import QLibraryInfo, QTranslator
from PySide6.QtWidgets import QApplication, QFileDialog, QMainWindow, QPushButton


class VentanaPrincipal(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Aplicación con diálogos")

        boton = QPushButton("Haz clic para que el dialogo aparezca")
        boton.clicked.connect(self.mostrar_dialogo)
        self.setCentralWidget(boton)

    def mostrar_dialogo(self):
        ventana_dialogo = QFileDialog.getOpenFileName(
            self, caption="Abrir archivo ...", dir=".",
            filter="Documentos de texto (*.txt);;Documentos PDF (*.pdf)",
            selectedFilter="Documentos de texto (*.txt)")
        archivo = ventana_dialogo[0]
        print(archivo)

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
