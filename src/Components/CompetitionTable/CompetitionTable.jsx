import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Title from "../Title/Title";
import { useTablaContext } from "../../Data/TableData";

function CompetitionTable() {
  const { datosTabla, setDatosTabla } = useTablaContext();

  useEffect(() => {
    const calculateMaxColumnWidths = () => {
      const maxColumnWidths = {};
      datosTabla.forEach((item) => {
        for (const key in item.data) {
          if (
            typeof maxColumnWidths[key] === "undefined" ||
            maxColumnWidths[key] < item.data[key].toString().length
          ) {
            maxColumnWidths[key] = item.data[key].toString().length;
          }
        }
      });
      return maxColumnWidths;
    };

    const maxColumnWidths = calculateMaxColumnWidths();

    // Aplica los anchos máximos a las columnas de la tabla
    const tableHeaders = document.querySelectorAll(".table tbody td");
    tableHeaders.forEach((th) => {
      const columnName = th.getAttribute("data-column");
      if (columnName && maxColumnWidths[columnName]) {
        th.style.width = `${maxColumnWidths[columnName] * 0.7}rem`; // Ajusta el factor multiplicador según tus necesidades
      }
    });
  }, [datosTabla]);

  const agregarCompetidor = () => {
    setDatosTabla((prevDatosTabla) => [
      ...prevDatosTabla,
      {
        tipo: "item.data",
        data: {
          numero: "",
          nombre: "",
          peso: "",
          representacion: "",
          fechaNacimiento: "",
          arranque1: "",
          arranque2: "",
          arranque3: "",
          resultadoArranque: "",
          puestoArranque: "",
          envion1: "",
          envion2: "",
          envion3: "",
          resultadoEnvion: "",
          puestoEnvion: "",
          total: "",
          puestoTotal: "",
        },
      },
    ]);
  };

  const agregarLineaDivisoria = () => {
    setDatosTabla((prevDatosTabla) => [
      ...prevDatosTabla,
      {
        tipo: "lineaDivisoria",
        data: {
          divisiones: "",
        },
      },
    ]);
  };

  const borrarDatos = () => {
    localStorage.removeItem("tablaData");
    setDatosTabla([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue
    agregarCompetidor();
    borrarDatos();
  };

  const determinarColorFondo = (texto) => {
    if (/\(\d+\)/.test(texto)) {
      return "fondoRojo"; // Si contiene paréntesis, fondo rojo
    } else if (texto.match(/[0-9]+\.$/)) {
      return "fondoAzul"; // Si contiene números sin paréntesis, fondo azul
    } else {
      return "fondoNegro"; // En otros casos (vacío o sin números ni paréntesis), fondo negro
    }
  };

  // Función para calcular el resultado de Arranque
  const calcularResultadoArranque = (campo1, campo2, campo3) => {
    if (
      (determinarColorFondo(campo1) === "fondoAzul" ||
        determinarColorFondo(campo2) === "fondoAzul" ||
        determinarColorFondo(campo3) === "fondoAzul") &&
      campo1 &&
      campo2 &&
      campo3
    ) {
      let valor1 = campo1 === "-" ? 0 : parseInt(campo1);
      let valor2 = campo2 === "-" ? 0 : parseInt(campo2);
      let valor3 = campo3 === "-" ? 0 : parseInt(campo3);
      const contieneParentesisCampo1 = /\(\d+\)/.test(campo1);
      const contieneParentesisCampo2 = /\(\d+\)/.test(campo2);
      const contieneParentesisCampo3 = /\(\d+\)/.test(campo3);

      if (contieneParentesisCampo1) {
        valor1 = campo1.replace(/\(\d+\)/g, "");
      }

      if (contieneParentesisCampo2) {
        valor2 = campo2.replace(/\(\d+\)/g, "");
      }

      if (contieneParentesisCampo3) {
        valor3 = campo3.replace(/\(\d+\)/g, "");
      }

      if (
        determinarColorFondo(campo1) === "fondoNegro" ||
        determinarColorFondo(campo2) === "fondoNegro" ||
        determinarColorFondo(campo3) === "fondoNegro"
      ) {
        if (campo1 === "-" || campo2 === "-" || campo3 === "-") {
          return Math.max(valor1, valor2, valor3).toString();
        }
        return "";
      }
      return Math.max(valor1, valor2, valor3).toString();
    }

    return "";
  };
  // Función para calcular el resultado de Envión
  const calcularResultadoEnvion = (campo1, campo2, campo3) => {
    if (
      (determinarColorFondo(campo1) === "fondoAzul" ||
        determinarColorFondo(campo2) === "fondoAzul" ||
        determinarColorFondo(campo3) === "fondoAzul") &&
      campo1 &&
      campo2 &&
      campo3
    ) {
      let valor1 = campo1 === "-" ? 0 : parseInt(campo1);
      let valor2 = campo2 === "-" ? 0 : parseInt(campo2);
      let valor3 = campo3 === "-" ? 0 : parseInt(campo3);
      const contieneParentesisCampo1 = /\(\d+\)/.test(campo1);
      const contieneParentesisCampo2 = /\(\d+\)/.test(campo2);
      const contieneParentesisCampo3 = /\(\d+\)/.test(campo3);

      if (contieneParentesisCampo1) {
        valor1 = campo1.replace(/\(\d+\)/g, "");
      }

      if (contieneParentesisCampo2) {
        valor2 = campo2.replace(/\(\d+\)/g, "");
      }

      if (contieneParentesisCampo3) {
        valor3 = campo3.replace(/\(\d+\)/g, "");
      }

      if (
        determinarColorFondo(campo1) === "fondoNegro" ||
        determinarColorFondo(campo2) === "fondoNegro" ||
        determinarColorFondo(campo3) === "fondoNegro"
      ) {
        if (campo1 === "-" || campo2 === "-" || campo3 === "-") {
          return Math.max(valor1, valor2, valor3).toString();
        }
        return "";
      }
      return Math.max(valor1, valor2, valor3).toString();
    }

    return "";
  };

  return (
    <div className="body">
      <Title />
      <div className="table">
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>N°</th>
              <th rowSpan={2}>NOMBRE DEL DEPORTISTA</th>
              <th rowSpan={2}>PESO CORPORAL (KG)</th>
              <th rowSpan={2}>REPRESENTACIÓN</th>
              <th className="tit" colSpan="3">
                ARRANQUE
              </th>
              <th rowSpan={2}>RESULTADO</th>
              <th rowSpan={2}>PUESTO</th>
              <th className="tit" colSpan="3">
                ENVION
              </th>
              <th rowSpan={2}>RESULTADO</th>
              <th rowSpan={2}>PUESTO</th>
              <th rowSpan={2}>TOTAL</th>
              <th rowSpan={2}>PUESTO</th>
            </tr>
            <tr>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
            </tr>
          </thead>
          <tbody>
            {datosTabla.map((item, index) => (
              <React.Fragment key={index}>
                {item.tipo === "lineaDivisoria" && (
                  <tr key={`lineaDivisoria${index}`}>
                    <td className="linea-divisoria" colSpan="16">
                      <input
                        className="input-divisoria"
                        placeholder="Div. 55KG"
                        type="text"
                        value={item.data.divisiones}
                        onChange={(e) =>
                          setDatosTabla((prevLinea) => {
                            const newLinea = [...prevLinea];
                            newLinea[index].data.divisiones = e.target.value;
                            return newLinea;
                          })
                        }
                      />
                    </td>
                  </tr>
                )}
                {item.tipo === "item.data" && (
                  <tr>
                    <td data-column="numero">{index + 1}</td>
                    <td data-column="nombre">
                      <input
                        type="text"
                        value={item.data.nombre}
                        onChange={(e) =>
                          setDatosTabla((prevCompetidores) => {
                            const newCompetidores = [...prevCompetidores];
                            newCompetidores[index].data.nombre = e.target.value;
                            return newCompetidores;
                          })
                        }
                      />
                    </td>
                    <td data-column="peso">
                      <input
                        type="number"
                        step="0.001"
                        value={item.data.peso}
                        onChange={(e) =>
                          setDatosTabla((prevCompetidores) => {
                            const newCompetidores = [...prevCompetidores];
                            newCompetidores[index].data.peso = e.target.value;
                            return newCompetidores;
                          })
                        }
                      />
                    </td>
                    <td data-column="representacion">
                      <input
                        type="text"
                        value={item.data.representacion}
                        onChange={(e) =>
                          setDatosTabla((prevCompetidores) => {
                            const newCompetidores = [...prevCompetidores];
                            newCompetidores[index].data.representacion =
                              e.target.value;
                            return newCompetidores;
                          })
                        }
                      />
                    </td>
                    <td
                      className={determinarColorFondo(item.data.arranque1)}
                      data-column="arranque1"
                    >
                      <input
                        className={determinarColorFondo(item.data.arranque1)}
                        type="text"
                        value={item.data.arranque1}
                        onChange={(e) =>
                          setDatosTabla((prevCompetidores) => {
                            const newCompetidores = [...prevCompetidores];
                            newCompetidores[index].data.arranque1 =
                              e.target.value;
                            return newCompetidores;
                          })
                        }
                      />
                    </td>
                    <td
                      className={determinarColorFondo(item.data.arranque2)}
                      data-column="arranque2"
                    >
                      <input
                        className={determinarColorFondo(item.data.arranque2)}
                        type="text"
                        value={item.data.arranque2}
                        onChange={(e) =>
                          setDatosTabla((prevCompetidores) => {
                            const newCompetidores = [...prevCompetidores];
                            newCompetidores[index].data.arranque2 =
                              e.target.value;
                            return newCompetidores;
                          })
                        }
                      />
                    </td>
                    <td
                      className={determinarColorFondo(item.data.arranque3)}
                      data-column="arranque3"
                    >
                      <input
                        className={determinarColorFondo(item.data.arranque3)}
                        type="text"
                        value={item.data.arranque3}
                        onChange={(e) =>
                          setDatosTabla((prevCompetidores) => {
                            const newCompetidores = [...prevCompetidores];
                            newCompetidores[index].data.arranque3 =
                              e.target.value;
                            return newCompetidores;
                          })
                        }
                      />
                    </td>
                    <td className="resultado" data-column="resultadoArranque">
                      {calcularResultadoArranque(
                        item.data.arranque1,
                        item.data.arranque2,
                        item.data.arranque3
                      )}
                    </td>
                    <td data-column="puestoArranque">
                      <input
                        type="text"
                        value={item.data.puestoArranque}
                        onChange={(e) =>
                          setDatosTabla((prevCompetidores) => {
                            const newCompetidores = [...prevCompetidores];
                            newCompetidores[index].data.puestoArranque =
                              e.target.value;
                            return newCompetidores;
                          })
                        }
                      />
                    </td>
                    <td
                      className={determinarColorFondo(item.data.envion1)}
                      data-column="envion1"
                    >
                      <input
                        className={determinarColorFondo(item.data.envion1)}
                        type="text"
                        value={item.data.envion1}
                        onChange={(e) =>
                          setDatosTabla((prevCompetidores) => {
                            const newCompetidores = [...prevCompetidores];
                            newCompetidores[index].data.envion1 =
                              e.target.value;
                            return newCompetidores;
                          })
                        }
                      />
                    </td>
                    <td
                      className={determinarColorFondo(item.data.envion2)}
                      data-column="envion2"
                    >
                      <input
                        className={determinarColorFondo(item.data.envion2)}
                        type="text"
                        value={item.data.envion2}
                        onChange={(e) =>
                          setDatosTabla((prevCompetidores) => {
                            const newCompetidores = [...prevCompetidores];
                            newCompetidores[index].data.envion2 =
                              e.target.value;
                            return newCompetidores;
                          })
                        }
                      />
                    </td>
                    <td
                      className={determinarColorFondo(item.data.envion3)}
                      data-column="envion3"
                    >
                      <input
                        className={determinarColorFondo(item.data.envion3)}
                        type="text"
                        value={item.data.envion3}
                        onChange={(e) =>
                          setDatosTabla((prevCompetidores) => {
                            const newCompetidores = [...prevCompetidores];
                            newCompetidores[index].data.envion3 =
                              e.target.value;
                            return newCompetidores;
                          })
                        }
                      />
                    </td>
                    <td className="resultado" data-column="resultadoEnvion">
                      {calcularResultadoEnvion(
                        item.data.envion1,
                        item.data.envion2,
                        item.data.envion3
                      )}
                    </td>
                    <td data-column="puestoEnvion">
                      <input
                        type="text"
                        value={item.data.puestoEnvion}
                        onChange={(e) =>
                          setDatosTabla((prevCompetidores) => {
                            const newCompetidores = [...prevCompetidores];
                            newCompetidores[index].data.puestoEnvion =
                              e.target.value;
                            return newCompetidores;
                          })
                        }
                      />
                    </td>
                    <td className="total" data-column="resultadoTotal">
                      {(() => {
                        const tieneValores =
                          item.data.arranque1 &&
                          item.data.arranque2 &&
                          item.data.arranque3 &&
                          item.data.envion1 &&
                          item.data.envion2 &&
                          item.data.envion3;

                        if (tieneValores) {
                          const resultadoArranque = calcularResultadoArranque(
                            item.data.arranque1,
                            item.data.arranque2,
                            item.data.arranque3
                          );
                          const resultadoEnvion = calcularResultadoEnvion(
                            item.data.envion1,
                            item.data.envion2,
                            item.data.envion3
                          );

                          // Asegúrate de que los resultados sean números, si no, asigna 0
                          const valorResultadoArranque = isNaN(
                            resultadoArranque
                          )
                            ? 0
                            : parseInt(resultadoArranque);
                          const valorResultadoEnvion = isNaN(resultadoEnvion)
                            ? 0
                            : parseInt(resultadoEnvion);

                          // Realiza la suma de los valores como números y luego conviértela a cadena
                          const suma = (
                            valorResultadoArranque + valorResultadoEnvion
                          ).toString();
                          return (item.data.total = isNaN(suma) ? 0 : suma);
                        } else {
                          return null;
                        }
                      })()}
                    </td>
                    <td data-column="puestoTotal">
                      <input
                        type="text"
                        value={item.data.puestoTotal}
                        onChange={(e) =>
                          setDatosTabla((prevCompetidores) => {
                            const newCompetidores = [...prevCompetidores];
                            newCompetidores[index].data.puestoTotal =
                              e.target.value;
                            return newCompetidores;
                          })
                        }
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={agregarCompetidor}>
          Agregar Competidor
        </button>
        <button type="button" onClick={agregarLineaDivisoria}>
          Agregar línea divisoria
        </button>
        <Link className="link-TablaDePuntajes" to="/TablaDePuntajes">
          <button className="boton-TablaDePuntajes" type="button">
            Tabla de Puntajes
          </button>
        </Link>
        <button type="button" onClick={() => borrarDatos()}>
          Borrar
        </button>
      </form>
    </div>
  );
}

export default CompetitionTable;
