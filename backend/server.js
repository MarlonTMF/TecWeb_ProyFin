const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors());

// Configurar Express para procesar datos JSON
app.use(express.json());

// Ruta de inicio de sesión
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Lógica de autenticación (ejemplo simple)
  if (username === 'admin' && password === 'admin') {
    return res.status(200).json({ message: 'Login exitoso' });
  } else {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
