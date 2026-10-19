import random
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton, QGridLayout, QWidget, QLabel, QStyle
from PySide6.QtMultimedia import QMediaPlayer, QAudioOutput
from PySide6.QtCore import QSize, Qt, QUrl

class MainWindow(QMainWindow):
    def __init__(self):
        QMainWindow.__init__(self)
        layout = QGridLayout()
        componente_principal = QWidget()
        componente_principal.setLayout(layout)  
        self.setCentralWidget(componente_principal)
        layout.setContentsMargins(100, 110, 100, 110)

        self.setFixedSize(QSize(400, 400))
        self.setWindowTitle("Herramienta de cambio de volumen")

        self.butonVolumen = QPushButton()
        self.butonVolumen.setFixedSize(QSize(55, 55))
        self.butonVolumen.setIcon(self.style().standardIcon(QStyle.SP_MediaVolume))
        self.butonVolumen.setIconSize(self.butonVolumen.size()*0.8)
        self.texto = QLabel("Volumen actual:    ", self)
        layout.addWidget(self.butonVolumen, 0,1)
        layout.addWidget(self.texto, 0,2)

        self.butonCambiar = QPushButton("Cambiar volumen", self) 
        self.butonCambiar.setFixedSize(QSize(155, self.butonCambiar.height()))
        layout.addWidget(self.butonCambiar, 1,1, 1,2, Qt.AlignHCenter)

        self.player = QMediaPlayer(self)
        self.output = QAudioOutput(self)
        self.player.setAudioOutput(self.output)
        self.player.setSource(QUrl.fromLocalFile(__file__.replace("reto1.py", "\\src\\Decisive_Battle.m4a")))

        self.butonVolumen.clicked.connect(self.clicRand)

    def clicRand(self):
        volumen = random.randint(0,100)
        self.output.setVolume(volumen/100)
        if self.output.volume == 0 : self.butonVolumen.setIcon(self.style().standardIcon(QStyle.SP_VolumeMuted))
        self.texto.setText(f"Volumen actual:    {volumen}")
        self.player.play()

        print(self.texto.text())
        

if __name__ == "__main__":
    app = QApplication([])
    mainWin = MainWindow()
    mainWin.show()
    app.exec()