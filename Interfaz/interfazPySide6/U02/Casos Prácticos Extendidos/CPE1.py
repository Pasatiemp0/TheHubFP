from PySide6.QtWidgets import QApplication, QLineEdit, QMainWindow, QPushButton
from PySide6.QtCore import QSize

class MainWindow(QMainWindow):
    def __init__(self):
        QMainWindow.__init__(self)

        self.setFixedSize(QSize(250, 30))
        self.setWindowTitle("Ventana")

        self.text = QLineEdit(self)
        self.text.setFixedSize(200,30)

        self.button = QPushButton('Print', self)
        self.button.setFixedSize(50,30)
        self.button.move(200,0)
        
        self.button.clicked.connect(self.clic)

    def clic(self):
        print(self.text.text())

if __name__ == "__main__":
    app = QApplication([])
    mainWin = MainWindow()
    mainWin.show()
    app.exec()