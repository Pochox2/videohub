const CancionU = ({ cancion, reproduciendo, borrar})  =>{

    if (!cancion) {
    console.warn("Canción no definida en CancionU");
    return null;
    }
    console.log(cancion);
    return (
        
        <div className="cancionitem">
            <span>{cancion.nombre}</span>
            <span className="repros">👁️‍🗨️ {cancion.plays}</span>
            <div className="acciones">
                <button onClick={() => reproduciendo(cancion.id)}>🖥️</button>
                <button onClick={() => borrar(cancion.id)} className="btnborrar">X</button>
        </div>
        </div>
    );
};

export default CancionU;