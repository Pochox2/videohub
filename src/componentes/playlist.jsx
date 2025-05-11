import CancionU from './cancion.jsx';

const Playlist1 = ({ canciones, reproduciendo, borrar }) => {
  
  return (
    <div>
      {canciones.length === 0 && <p>No hay canciones aún.</p>}
      {canciones.map((cancion) => (
        <CancionU key={cancion.id} cancion={cancion} reproduciendo={reproduciendo} borrar={borrar} />
      ))}
    </div>
  );
};

export default Playlist1;