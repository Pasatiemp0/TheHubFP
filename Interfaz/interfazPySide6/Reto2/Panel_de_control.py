from PySide6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QStackedWidget,
    QVBoxLayout, QFormLayout, QLabel, QLineEdit, QSpinBox,
    QPushButton, QListWidget, QMessageBox, QColorDialog, QFontDialog,
)


class VentanaPrincipal(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Panel de control")
        self.resize(560, 440)

        # Usuarios y Estadísticas comparten la misma ventana.
        self.paginas = QStackedWidget()
        self.setCentralWidget(self.paginas)
        self.paginas.addWidget(self.crear_usuarios())
        self.paginas.addWidget(self.crear_estadisticas())

        barra = self.menuBar()
        usuarios = barra.addAction("&Usuarios")
        usuarios.triggered.connect(lambda: self.paginas.setCurrentIndex(0))
        estadisticas = barra.addAction("&Estadísticas")
        estadisticas.triggered.connect(lambda: self.paginas.setCurrentIndex(1))
        configuracion = barra.addMenu("&Configuración")
        accion_color = configuracion.addAction("Configurar el color")
        accion_color.triggered.connect(self.config_color)
        accion_fuente = configuracion.addAction("Configurar la fuente")
        accion_fuente.triggered.connect(self.config_fuente)

    def crear_usuarios(self):
        pagina = QWidget()
        layout = QVBoxLayout(pagina)
        layout.addWidget(QLabel("<h2>Usuarios</h2>"))

        formulario = QFormLayout()
        self.nombre = QLineEdit()
        self.nombre.setPlaceholderText("Nombre del usuario")
        self.edad = QSpinBox()
        self.edad.setRange(1, 100)
        formulario.addRow("Nombre:", self.nombre)
        formulario.addRow("Edad:", self.edad)
        layout.addLayout(formulario)

        boton = QPushButton("Añadir usuario")
        boton.clicked.connect(self.agregar_usuario)
        layout.addWidget(boton)
        self.lista_usuarios = QListWidget()
        layout.addWidget(self.lista_usuarios)
        return pagina

    def crear_estadisticas(self):
        pagina = QWidget()
        layout = QVBoxLayout(pagina)
        layout.addWidget(QLabel("<h2>Estadísticas</h2>"))
        self.resumen = QLabel("Usuarios registrados: 0")
        layout.addWidget(self.resumen)
        boton = QPushButton("Actualizar estadísticas")
        boton.clicked.connect(self.actualizar_estadisticas)
        layout.addWidget(boton)
        layout.addStretch()
        return pagina

    def agregar_usuario(self):
        nombre = self.nombre.text().strip()
        if not nombre:
            QMessageBox.warning(self, "Usuarios", "Escribe un nombre.")
            return
        self.lista_usuarios.addItem(f"{nombre} - {self.edad.value()} años")
        self.nombre.clear()
        self.actualizar_estadisticas()
        QMessageBox.information(self, "Usuarios", "Usuario añadido correctamente.")

    def actualizar_estadisticas(self):
        total = self.lista_usuarios.count()
        self.resumen.setText(f"Usuarios registrados: {total}")

    def config_color(self):
        QColorDialog.getColor(parent=self)

    def config_fuente(self):
        QFontDialog.getFont(self)


if __name__ == "__main__":
    app = QApplication([])
    ventana = VentanaPrincipal()
    ventana.show()
    app.exec()
