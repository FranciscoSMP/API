import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [cancion, setCancion] = useState('')
  const [canciones, setCanciones] = useState([])

  function handleSearch(e){
    e.preventDefault();
    if(cancion.trim()==''){
      alert('Debe ingresar algo')
      return
    }
    setCancion('')
    getSong(cancion)
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e51b5793b8msh010d5eaeca2be7dp107499jsn24c8e21316c2',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

  async function getSong(cancion){
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=multi&offset=0&limit=10&numberOfTopResults=5`
      let data = await fetch(url,options)
      let res = await data.json()
      setCanciones(res.tracks.items)
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }

  return (
    <>
    <h2>Spotify API</h2>
    <form onSubmit={handleSearch}>
      <input type="text" value={cancion} onChange={e => setCancion(e.target.value)} />
      <button type='submit'>Buscar</button>
    </form>
    {canciones.map((cancion, index) => (
      <>
        <div key = {index}>
          <img src={cancion.data.albumOfTrack.coverArt.sources[0].url} alt="" srcset="" />
          <h2>{cancion.data.name}</h2>
          <a href={cancion.data.uri}><button>Escuchar Canción</button></a>
        </div>
      </>
    ))}
    </>
  )
}
 
export default App