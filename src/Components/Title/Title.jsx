import { useTablaContext } from "../../Data/TableData";

function Title() {
  // Usar el estado para almacenar los valores de los campos de entrada
  const {
    titulo,
    setTitulo,
    categoria,
    setCategoria,
    divisiones,
    setDivisiones,
  } = useTablaContext();

  return (
    <div className="contenedor-total">
    <div className="imagen">
    <img className="img" src={process.env.PUBLIC_URL + "/Captura.PNG"} alt="Mi Imagen" />
  </div>
    <div className="titulos">
      <input
        className="h1"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
      />
      <div className="subTitulos">
        <h2 className="h2">
          Categoría:
          <input
            className="h2"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Categoría"
          />
        </h2>
        <h2 className="h2">
          Divisiones:
          <input
            className="h2"
            value={divisiones}
            onChange={(e) => setDivisiones(e.target.value)}
            placeholder="Divisiones"
          />
        </h2>
      </div>
    </div>
    </div>
  );
}

export default Title;
