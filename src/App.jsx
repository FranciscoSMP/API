import { useState } from 'react'
import './App.css'
import { Tarjetas } from './componentes/Tarjetas'

function App() {

  const [buscar, setBuscar] = useState();
  const [existe, setExiste] = useState(false);
  const [segundaBusqueda, setSegundaBusqueda] = useState();

  function handleBuscar(e){
    if(!buscar){
      e.preventDefault();
      alert('Debe ingresar algo')
    }else{
      e.preventDefault();
      buscarSpotify(buscar)   
    }
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e51b5793b8msh010d5eaeca2be7dp107499jsn24c8e21316c2',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

  async function buscarSpotify(buscar){
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${buscar}&type=tracks&offset=0&limit=25&numberOfTopResults=5`
      let res = await fetch(url, options)
      let data = await res.json();
      setExiste(true)
      setSegundaBusqueda(data.tracks.items)
      
    } catch (error) {
      console.log(`Error: ${e}`)
    }
  }

  return (
    <div className="App">
     <h3>Spotify API</h3>
     <form onSubmit={handleBuscar}>
      <input type="text" name="" id="" 
        placeholder='Ingrese un artista o canción'
        onChange={e => setBuscar(e.target.value)}
      />
      <button>Buscar</button>
     </form>
     {existe&&(
      <>
        <Tarjetas
        segundaBusqueda = {segundaBusqueda}
        />
      </>
     )}
    </div>
    
  )
}
 
export default App