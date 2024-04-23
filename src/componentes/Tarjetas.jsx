import React from 'react';
import './tarjetas.css';

export const Tarjetas = ({ segundaBusqueda }) => {
  const formatDuration = (milliseconds) => {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getSpotifyLink = (uri) => {
    const trackId = uri.split(':').pop(); // Obtiene el ID de la canción
    return `https://open.spotify.com/intl-es/track/${trackId}`;
  };

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
            <p><a href={cancion.data.uri} className="title">Abrir en Spotify</a></p>
          </div>
        </div>
      ))}
    </div>
  );
};
