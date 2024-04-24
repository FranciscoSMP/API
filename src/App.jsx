// En el archivo App.jsx

import { useState, useEffect } from 'react';
import './App.css';
import { Tarjetas } from './componentes/Tarjetas';

function App() {
  const [buscar, setBuscar] = useState('');
  const [existe, setExiste] = useState(false);
  const [resultadoGet, setResultadoGet] = useState(null);

  async function handleBuscar(e) {
    e.preventDefault();
    if (!buscar) {
      alert('Debe ingresar algo');
      return;
    }

    buscarSpotify(buscar);
  }

  async function buscarSpotify(buscar) {
    try {
      const url = `https://spotify23.p.rapidapi.com/search/?q=${buscar}&type=tracks&offset=0&limit=25&numberOfTopResults=5`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'e51b5793b8msh010d5eaeca2be7dp107499jsn24c8e21316c2',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      };
      const res = await fetch(url, options);
      const data = await res.json();
      setExiste(true);
      setResultadoGet(data.tracks.items);
    } catch (error) {
      console.error('Error en la solicitud GET:', error);
    }
  }

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