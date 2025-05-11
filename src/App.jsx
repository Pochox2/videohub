import { useState, useEffect, act } from 'react'
import BotonFiltro from './componentes/botonfiltro.jsx'
import BuscadorCancion from './componentes/buscador.jsx'
import CancionForm from './componentes/cancionform.jsx'
import ModalCancion from './componentes/modalcancion.jsx'
import Playlist1 from './componentes/playlist.jsx'
import './App.css'

function App() {
    const [canciones, setCanciones] = useState([]);
    const [cancionModal, setCancionModal] = useState(null);
    const [terminos, setTerminos] = useState("");
    const [filtrarPorRepros, setFiltroRepros] = useState(false);
    const [pantallaInicio, setPantallaInicio] = useState(false);
    
    useEffect(() => {
    try {
      const guardado = JSON.parse(localStorage.getItem('canciones')) || [];
      console.log('Canciones cargadas desde localStorage:', guardado);

      const cancionesValidadas = guardado.filter(cancion =>
        cancion &&
        typeof cancion.id === 'number' &&
        typeof cancion.nombre === 'string' &&
        typeof cancion.videoId === 'string' &&
        typeof cancion.url === 'string' &&
        typeof cancion.plays === 'number'
      );

      console.log('Canciones válidas cargadas:', cancionesValidadas);
      setCanciones(cancionesValidadas);
    } catch (e) {
      console.error('Error al cargar canciones desde localStorage:', e);
      setCanciones([]);
    } finally {
      setPantallaInicio(true);
    }
  }, []);

  useEffect(() => {
    if (pantallaInicio) {
      localStorage.setItem('canciones', JSON.stringify(canciones));
    }
  }, [canciones, pantallaInicio]);

  const agregarCancion = (cancionNueva) => {
    if (cancionNueva && cancionNueva.nombre && cancionNueva.videoId) {
      setCanciones([...canciones, cancionNueva]);
    }
  };

  const borrarCancion = (id) => {
    const actualizada = canciones.filter((cancion) => cancion.id !== id);
    setCanciones(actualizada);
  };

  const playCancion = (id) => {
    const actualizada = canciones.map((s) =>
      s.id === id ? { ...s, plays: s.plays + 1 } : s
    );
    setCanciones(actualizada);
    const seleccionada = actualizada.find((s) => s.id === id);
    setCancionModal(seleccionada);
  };

  const cerrarModal = () => setCancionModal(null);

  const filtradas = canciones.filter((s) =>
    s.nombre.toLowerCase().includes(terminos.toLowerCase())
  );

  const displayedSongs = filtrarPorRepros
    ? [...filtradas].sort((a, b) => b.plays - a.plays)
    : filtradas;

  return (
    <div className="all">
      <img src='../public/logooo.png' className='img_logo'></img>
      
      <CancionForm canciones={canciones} agregarC={agregarCancion} />
      <BuscadorCancion value={terminos} onChange={setTerminos}/>
      <BotonFiltro ordenar={setFiltroRepros} />
      <Playlist1 canciones={displayedSongs} reproduciendo={playCancion} borrar={borrarCancion}/>
      {cancionModal && (
        <ModalCancion videoId={cancionModal.videoId} onClose={cerrarModal} />

      )}
    </div>
  );
}

export default App;
