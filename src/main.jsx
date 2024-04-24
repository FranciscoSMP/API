// Importa React desde la biblioteca 'react'
import React from 'react'
// Importa ReactDOM desde 'react-dom/client'
import ReactDOM from 'react-dom/client'
// Importa el componente App desde el archivo './App'
import App from './App'
// Importa los estilos CSS desde './index.css'
import './index.css'

// Renderiza el componente App en el elemento con el ID 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>, // Fin del renderizado
)