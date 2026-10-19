import time
from PySide6.QtCore import QThread, Signal
from PySide6.QtWidgets import (
    QMainWindow, QPushButton, QProgressDialog, QApplication
)

# Clase Hilo que simula un proceso lento
class Hilo(QThread):
    # Señal que transmite un número entero a su escuchador o ranura
    señal = Signal(int)

    def __init__(self):
        super(Hilo, self).__init__()
        self.cancelado = False

    def __del__(self):
        self.wait()

    # Método que se ejecuta al lanzar el hilo
    # Mientras no se cancele, el hilo emitirá una señal con un
    # entero entre 0 i 10 cada 0,3 segundos
    def run(self):
        for i in range(11):
            if not self.cancelado:
                self.señal.emit(i)
                time.sleep(0.5)
            else:
                break


class VentanaPrincipal(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('Aplicación con QProgressDialog')
        self.boton = QPushButton('Clic para iniciar la copia de archivos')
        self.boton.clicked.connect(self.mostrar_dialogo_progreso)
        self.setCentralWidget(self.boton)

    def mostrar_dialogo_progreso(self):
        # Deshabilitamos el botón para evitar que se lance otro hilo
        self.boton.setEnabled(False)
        # Creamos un QProgessDialog entre 0 y 10 y un boton Cancelar
        self.barra_progreso = QProgressDialog(
            "Copiando archivos ...", "Cancelar", 0, 10, self)
        self.barra_progreso.setWindowTitle("Diálogo de progreso")
        # Conectamos la señal canceled del QProgressDialog a la ranura
        self.barra_progreso.canceled.connect(self.cancelar)
        
        # Creamos un hilo de ejecución
        self.hilo = Hilo()
        # Conectamos la señal del hilo a la ranura
        self.hilo.señal.connect(self.señal_recibida)
        # Lanzamos la ejecución del hilo
        self.hilo.start()
        # Mostramos la barra de progreso
        self.barra_progreso.show()

    def señal_recibida(self, progreso):
        # Cuando recibamos la señal del hilo, incrementamos
        # el progreso con el valor recibido
        self.barra_progreso.setValue(int(progreso))
        # Cuando llegue al 100% esperamos 0.5s y cerramos el diálogo
        if int(progreso) == 10:
            time.sleep(0.5)
            self.barra_progreso.close()

    # Al darle al botón cancelar del diálogo, detenemos el envío de señales.
    # El diálogo se cerrará y el botón lo volvemos a habilitar
    def cancelar(self):
        self.hilo.cancelado = True
        self.boton.setEnabled(True)


if __name__ == "__main__":
    app = QApplication([])
    ventana_principal = VentanaPrincipal()
    ventana_principal.show()
    app.exec()
