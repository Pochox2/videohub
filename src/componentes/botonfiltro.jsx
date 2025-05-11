function BotonFiltro({ordenar}) {
    return (
        <button
            onClick={ordenar}
            className="btn_filtro"
            >
                Ordenar por cantidad de reproducciones
            </button>
    );
}

export default BotonFiltro