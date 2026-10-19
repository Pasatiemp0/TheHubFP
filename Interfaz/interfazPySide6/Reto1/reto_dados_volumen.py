import random
from pathlib import Path

from PySide6.QtWidgets import (
    QApplication, QMainWindow, QPushButton, QGridLayout,
    QWidget, QLabel, QCheckBox, QVBoxLayout, QHBoxLayout, QStyle
)
from PySide6.QtMultimedia import QMediaPlayer, QAudioOutput
from PySide6.QtCore import QSize, Qt, QUrl


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Volumen con dados")
        self.setFixedSize(QSize(900, 430))

        componente_principal = QWidget()
        layout_principal = QVBoxLayout(componente_principal)
        layout_principal.setContentsMargins(25, 20, 25, 20)
        self.setCentralWidget(componente_principal)

        self.valores = [random.randint(1, 6) for _ in range(16)]
        self.botones_dado = []
        self.holds = []

        # Zona de dados
        layout_dados = QGridLayout()
        layout_dados.setHorizontalSpacing(12)
        layout_dados.setVerticalSpacing(10)

        caras = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"]

        for i in range(16):
            caja = QWidget()
            layout_caja = QVBoxLayout(caja)
            layout_caja.setContentsMargins(0, 0, 0, 0)

            dado = QPushButton(caras[self.valores[i]])
            dado.setFixedSize(QSize(85, 85))
            dado.setStyleSheet("""
                QPushButton {
                    font-size: 58px;
                    background: white;
                    border: 3px solid black;
                    border-radius: 2px;
                    padding: 0px;
                }
            """)
            dado.setEnabled(False)

            hold = QCheckBox("Hold")
            hold.setStyleSheet("font-size: 16px;")

            self.botones_dado.append(dado)
            self.holds.append(hold)

            layout_caja.addWidget(dado, alignment=Qt.AlignCenter)
            layout_caja.addWidget(hold, alignment=Qt.AlignLeft)

            fila = i // 8
            columna = i % 8
            layout_dados.addWidget(caja, fila, columna)

        layout_principal.addLayout(layout_dados)

        # Zona inferior: botón Roll, texto de volumen e icono
        layout_inferior = QHBoxLayout()

        self.boton_roll = QPushButton("Roll")
        self.boton_roll.setFixedSize(QSize(420, 85))
        self.boton_roll.setStyleSheet("font-size: 28px; font-weight: bold;")

        self.texto_volumen = QLabel()
        self.texto_volumen.setStyleSheet("font-size: 28px;")

        self.icono_volumen = QLabel()
        icono = self.style().standardIcon(QStyle.SP_MediaVolume)
        self.icono_volumen.setPixmap(icono.pixmap(QSize(70, 70)))

        layout_inferior.addWidget(self.boton_roll)
        layout_inferior.addStretch()
        layout_inferior.addWidget(self.texto_volumen)
        layout_inferior.addWidget(self.icono_volumen)

        layout_principal.addLayout(layout_inferior)

        # Reproductor de audio, igual que en el ejercicio original
        self.player = QMediaPlayer(self)
        self.output = QAudioOutput(self)
        self.player.setAudioOutput(self.output)

        self.player.setSource(QUrl.fromLocalFile(__file__.replace("reto1.py", "\\src\\Decisive_Battle.m4a")))

        self.boton_roll.clicked.connect(self.tirar_dados)

        self.actualizar_interfaz()

    def tirar_dados(self):
        caras = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"]

        for i in range(16):
            if not self.holds[i].isChecked():
                self.valores[i] = random.randint(1, 6)

            self.botones_dado[i].setText(caras[self.valores[i]])

        self.actualizar_interfaz()

        if self.player.source().isValid():
            self.player.play()

    def actualizar_interfaz(self):
        volumen = sum(self.valores)

        self.output.setVolume(volumen / 100)
        self.texto_volumen.setText(f"Volume: {volumen}")

        print(f"Volumen actual: {volumen}")


if __name__ == "__main__":
    app = QApplication([])
    ventana = MainWindow()
    ventana.show()
    app.exec()
