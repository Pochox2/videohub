import React, {useState} from "react";

const validarUrl = (url) => {
    try {
        const ur = new URL(url);
        return ur.hostname.includes("youtube.com") || ur.hostname.includes("youtu.be");
    } catch {
        return false;
    }
};

const BuscarId = (url) => {
    try {
            const u = new URL(url);
            if (u.hostname.includes("youtu.be")) {
                return u.pathname.slice(1);
            }
            return new URLSearchParams(u.search).get("v");
        } catch {
            return null;
        }
};



const CancionForm = ({canciones, agregarC}) => {
    const [nombre, setNombre] = useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    
    const duplicada = (url) => canciones.some((s) => s.url === url);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre.trim() || !url.trim()) {
            setError("Completar todos los campos.");
            return;
        }
        if (!validarUrl(url)) {
            setError("La URL debe ser de YouTube.");
            return;
        }
        if (duplicada(url)) {
            setError("La canción ya fue agregada anteriormente.");
            return;
        }

        const videoId = BuscarId(url);
        if (!videoId) {
            setError("No se pudo reproducir el video");
            return;
        }

        const cancionNueva = {
            id: Date.now(),
            nombre,
            url,
            videoId,
            plays: 0
            };
        
        agregarC(cancionNueva);
        setNombre("");
        setUrl("");
        setError("");
    };

    return (
        <form onSubmit={handleSubmit} className="formAdd">
            <input
                type="text"
                placeholder="Nombre de la cancion"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="inputAdd"
            />
            <input
                type="text"
                placeholder="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="inputAdd"
            />
            {error && <p className="pError">{error}</p>}
            <button
            type="submit"
            className="btnAdd"
            >
                Agregar
            </button>
        </form>
    );
}

export default CancionForm
