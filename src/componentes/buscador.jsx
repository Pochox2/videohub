function BuscadorCancion ({value, onChange}) {
    return (
      <input
        type="text"
        placeholder="Buscar canción.."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="inputBuscador"
      />  
    );

}

export default BuscadorCancion