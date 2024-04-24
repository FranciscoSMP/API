import React from 'react';
import './tarjetas.css'; // Importa estilos CSS para este componente

// Definición del componente Tarjetas
export const Tarjetas = ({ segundaBusqueda }) => {

  // Función para formatear la duración de la canción  
  const formatDuration = (milliseconds) => {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  
  // Función para obtener el enlace de Spotify de una canción
  const getSpotifyLink = (uri) => {
    const trackId = uri.split(':').pop(); // Obtiene el ID de la canción
    return `https://open.spotify.com/intl-es/track/${trackId}`;
  };

  // Función para marcar una canción como "Me Gusta"
  const marcarCancionComoMeGusta = async (cancionId) => {
    try {
      const url = 'https://spotify-web-api3.p.rapidapi.com/v1/social/spotify/getmylikedsongs';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': 'e51b5793b8msh010d5eaeca2be7dp107499jsn24c8e21316c2',
          'X-RapidAPI-Host': 'spotify-web-api3.p.rapidapi.com'
        },
        body: JSON.stringify({
          trackId: cancionId
        })
      };
      const res = await fetch(url, options);
      if (res.ok) {
        alert('¡Canción marcada como "Me Gusta" con éxito!'); // Muestra mensaje de éxito
      } else {
        alert('Error al marcar la canción como "Me Gusta":', res.status); // Muestra mensaje de error
      }
    } catch (error) {
      alert('Error al marcar la canción como "Me Gusta":', error); // Muestra mensaje de error en caso de excepción
    }
  };

  // Renderizado del componente
  return (
    <div className='container'>
      {segundaBusqueda.map((cancion, i) => (
        <div key={i}>
          <div className="cancion">
            <h2>{cancion.data.name}</h2>
            <h4>Artista: {cancion.data.artists.items[0].profile.name}</h4>
            <h4>Álbum: {cancion.data.albumOfTrack.name}</h4>
            <h4>Duración: {formatDuration(cancion.data.duration.totalMilliseconds)} Minutos</h4>          
            <img src={cancion.data.albumOfTrack.coverArt.sources[0].url} alt={cancion.data.name}/>
            <p><a href={getSpotifyLink(cancion.data.uri)} className="title" target="_blank" rel="noopener noreferrer">Escuchar Canción</a></p>
            <p><a href={cancion.data.uri}>Abrir en Spotify</a></p>
            <button onClick={() => marcarCancionComoMeGusta(cancion.data.id)}>Me Gusta</button>
          </div>
        </div>
      ))}
    </div>
  );
};