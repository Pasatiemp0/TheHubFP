import sys
from PySide6 import QtWidgets
from PySide6.QtWidgets import (QMainWindow, QApplication)

from DI_U03_A03_03 import Ui_MainWindow

class VentanaPrincipal(QMainWindow, Ui_MainWindow):
    def __init__(self):
        super(VentanaPrincipal, self).__init__()
        self.setupUi(self)

app = QApplication(sys.argv)
window = VentanaPrincipal()
window.show()
app.exec()