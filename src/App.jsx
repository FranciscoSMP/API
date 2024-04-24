// Importa los hooks useState y useEffect desde React
import { useState, useEffect } from 'react';
// Importa los estilos CSS del componente App
import './App.css';
// Importa el componente Tarjetas desde el archivo Tarjetas.js en la carpeta componentes
import { Tarjetas } from './componentes/Tarjetas';

// Definición del componente funcional App
function App() {
  // Definición de estados usando el hook useState
  const [buscar, setBuscar] = useState(''); // Estado para la entrada de búsqueda
  const [existe, setExiste] = useState(false); // Estado para verificar si existe un resultado de búsqueda
  const [resultadoGet, setResultadoGet] = useState(null); // Estado para almacenar el resultado de la búsqueda

  // Función asíncrona para manejar la búsqueda
  async function handleBuscar(e) {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (!buscar) { // Verifica si no se ha ingresado ningún término de búsqueda
      alert('Debe ingresar algo'); // Muestra una alerta si no se ha ingresado ningún término de búsqueda
      return; // Retorna para salir de la función
    }

    buscarSpotify(buscar); // Llama a la función para buscar en la API de Spotify
  }

  // Función asíncrona para realizar la búsqueda en la API de Spotify
  async function buscarSpotify(buscar) {
    try {
      // URL de la API de Spotify con el término de búsqueda
      const url = `https://spotify23.p.rapidapi.com/search/?q=${buscar}&type=tracks&offset=0&limit=25&numberOfTopResults=5`;
      // Opciones para la solicitud GET
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'e51b5793b8msh010d5eaeca2be7dp107499jsn24c8e21316c2',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      };
      // Realiza la solicitud GET a la API de Spotify
      const res = await fetch(url, options);
      // Convierte la respuesta en formato JSON
      const data = await res.json();
      // Establece el estado para indicar que existe un resultado de búsqueda
      setExiste(true);
      // Almacena los resultados de la búsqueda en el estado correspondiente
      setResultadoGet(data.tracks.items);
    } catch (error) {
      console.error('Error en la solicitud GET:', error); // Maneja cualquier error ocurrido durante la solicitud GET
    }
  }

  // Renderizado del componente App
  return (
    <div className="App">
      <h3>Spotify API</h3>
      <form onSubmit={handleBuscar}>
        <input
          type="text"
          placeholder="Ingrese un artista o canción"
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
        />
        <button>Buscar</button>
      </form>
      {existe && (
        <>
          <Tarjetas segundaBusqueda={resultadoGet} />
        </>
      )}
    </div>
  );
}

export default App;