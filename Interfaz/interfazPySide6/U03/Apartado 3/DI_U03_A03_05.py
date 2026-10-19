import sys
from PySide6 import QtWidgets
from PySide6.QtWidgets import QApplication
from PySide6.QtUiTools import QUiLoader

loader = QUiLoader()
app = QApplication(sys.argv)
window = loader.load("D:\\用户\\Lenovo\\文档\\TheHubFP\\Interfaz\\interfazPySide6\\U03\\Apartado 3\\DI_U03_A03_02.ui", None)
window.show()
app.exec()