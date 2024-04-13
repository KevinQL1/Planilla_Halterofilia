import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Title from "../Title/Title";
import { useTablaContext } from "../../Data/TableData";
import html2canvas from "html2canvas";

function TablePoints() {
  const { datosTabla, categoria, divisiones } = useTablaContext();

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

  // Función para calcular el resultado de Arranque
  const calcularResultadoArranque = (campo1, campo2, campo3) => {
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

    if (!campo1 && !campo2 && !campo3) {
      return "";
    } else if (campo1 && campo2 && campo3) {
      return Math.max(valor1, valor2, valor3);
    }
  };

  const calcularPuntos = (puesto) => {
    // Parsea el valor de puesto a un entero
    const puestoNumero = parseInt(puesto);

    if (isNaN(puestoNumero)) {
      // Si el análisis falla (no es un número válido), muestra null o un mensaje de error, según lo que desees
      return null; // O puedes retornar un mensaje de error: "Puesto no válido"
    }

    if (puestoNumero === 1) {
      return 28;
    } else if (puestoNumero === 2) {
      return 25;
    } else if (puestoNumero === 3) {
      return 23;
    } else {
      return Math.max(0, 22 - (puestoNumero - 4)); // Resta de 1 en 1 a partir del 4to puesto
    }
  };

  // Función para calcular el resultado de Envión
  const calcularResultadoEnvion = (campo1, campo2, campo3) => {
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

    if (!campo1 && !campo2 && !campo3) {
      return "";
    } else if (campo1 && campo2 && campo3) {
      return Math.max(valor1, valor2, valor3);
    }
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

  const divisionesRecordMujer = {
    divisiones: "45, 49, 55, 59, 64, 71, 76, 81, 87, +87",
    records: "191, 216, 233, 247, 261, 273, 278, 283, 294, 335",
  };

  const divisionesRecordHombre = {
    divisiones: "55, 61, 67, 73, 81, 89, 96, 102, 109, +109",
    records: "294, 318, 339, 364, 378, 396, 416, 412, 435, 492",
  };

  const validateCategoryMale = (peso) => {
    console.log("aja: ", peso);
    const recordsMale = divisionesRecordHombre.records
      .split(",")
      .map((item) => item.trim());
    if (peso <= 55) {
      const record = recordsMale[0];
      return record;
    } else if (peso > 55 && peso <= 61) {
      const record = recordsMale[1];
      return record;
    } else if (peso > 61 && peso <= 67) {
      const record = recordsMale[2];
      return record;
    } else if (peso > 67 && peso <= 73) {
      const record = recordsMale[3];
      return record;
    } else if (peso > 73 && peso <= 81) {
      const record = recordsMale[4];
      return record;
    } else if (peso > 81 && peso <= 89) {
      const record = recordsMale[5];
      return record;
    } else if (peso > 89 && peso <= 96) {
      const record = recordsMale[6];
      return record;
    } else if (peso > 96 && peso <= 102) {
      const record = recordsMale[7];
      return record;
    } else if (peso > 102 && peso <= 109) {
      const record = recordsMale[8];
      return record;
    } else if (peso > 109) {
      const record = recordsMale[9];
      return record;
    } else if (peso === undefined) {
      return 0;
    }
  };

  const validateCategoryFemale = (peso) => {
    const recordsFemale = divisionesRecordMujer.records
      .split(",")
      .map((item) => item.trim());
    if (peso <= 45) {
      const record = recordsFemale[0];
      return record;
    } else if (peso > 45 && peso <= 49) {
      const record = recordsFemale[1];
      return record;
    } else if (peso > 49 && peso <= 55) {
      const record = recordsFemale[2];
      return record;
    } else if (peso > 55 && peso <= 59) {
      const record = recordsFemale[3];
      return record;
    } else if (peso > 59 && peso <= 64) {
      const record = recordsFemale[4];
      return record;
    } else if (peso > 64 && peso <= 71) {
      const record = recordsFemale[5];
      return record;
    } else if (peso > 71 && peso <= 76) {
      const record = recordsFemale[6];
      return record;
    } else if (peso > 76 && peso <= 81) {
      const record = recordsFemale[7];
      return record;
    } else if (peso > 81 && peso <= 87) {
      const record = recordsFemale[8];
      return record;
    } else if (peso > 87) {
      const record = recordsFemale[9];
      return record;
    } else if (peso === undefined) {
      return 0;
    }
  };

  const calculateRobi = (peso, total) => {
    const regex = /m/i;

    if (regex.test(categoria)) {
      const divCatMale = validateCategoryMale(peso);
      const A = 1000 / Math.pow(divCatMale, 3.321928095);
      const Full = A * Math.pow(total, 3.321928095);
      const WSSCTotalMale = Full.toFixed(4);
      return WSSCTotalMale;
    } else {
      const divCatFemale = validateCategoryFemale(peso);
      const A = 1000 / Math.pow(divCatFemale, 3.321928095);
      const Full = A * Math.pow(total, 3.321928095);
      const WSSCTotalFemale = Full.toFixed(4);
      return WSSCTotalFemale;
    }
  };

  const tableRef = useRef(null);

  const captureTable = () => {
    const table = tableRef.current;
    
    // Agregar una clase temporal para ajustar la posición de la tabla
    table.classList.add("capture-mode");
    
    // Utilizar html2canvas para capturar la tabla
    html2canvas(table, {
      scrollX: 0, // Asegura que no haya desplazamiento horizontal
      scrollY: -window.scrollY, // Ajusta el desplazamiento vertical
    }).then((canvas) => {
      // Crear un enlace para descargar la imagen
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `planilla_de_competencia_${divisiones}.png`;
      link.click();
    
      // Quitar la clase temporal para restaurar la posición original de la tabla
      table.classList.remove("capture-mode");
    });
  };

  return (
    <div className="body">
      <Title />
      <div className="table">
        <table ref={tableRef}>
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
              <th rowSpan={2}>PUNTOS</th>
              <th rowSpan={2}>ROBI</th>
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
                    <td className="td-divisoria" colSpan="18">
                      {item.data.divisiones}
                    </td>
                  </tr>
                )}
                {item.tipo === "item.data" && (
                  <tr>
                    <td data-column="numero">{index + 1}</td>
                    <td data-column="nombre">{item.data.nombre}</td>
                    <td data-column="peso">{item.data.peso}</td>
                    <td data-column="representacion">
                      {item.data.representacion}
                    </td>
                    <td
                      className={determinarColorFondo(item.data.arranque1)}
                      data-column="arranque1"
                    >
                      {item.data.arranque1}
                    </td>
                    <td
                      className={determinarColorFondo(item.data.arranque2)}
                      data-column="arranque2"
                    >
                      {item.data.arranque2}
                    </td>
                    <td
                      className={determinarColorFondo(item.data.arranque3)}
                      data-column="arranque3"
                    >
                      {item.data.arranque3}
                    </td>
                    <td className="resultado" data-column="resultadoArranque">
                      {calcularResultadoArranque(
                        item.data.arranque1,
                        item.data.arranque2,
                        item.data.arranque3
                      )}
                    </td>
                    <td data-column="puestoArranque">
                      {item.data.puestoArranque}
                    </td>
                    <td
                      className={determinarColorFondo(item.data.envion1)}
                      data-column="envion1"
                    >
                      {item.data.envion1}
                    </td>
                    <td
                      className={determinarColorFondo(item.data.envion2)}
                      data-column="envion2"
                    >
                      {item.data.envion2}
                    </td>
                    <td
                      className={determinarColorFondo(item.data.envion3)}
                      data-column="envion3"
                    >
                      {item.data.envion3}
                    </td>
                    <td className="resultado" data-column="resultadoEnvion">
                      {calcularResultadoEnvion(
                        item.data.envion1,
                        item.data.envion2,
                        item.data.envion3
                      )}
                    </td>
                    <td data-column="puestoEnvion">{item.data.puestoEnvion}</td>
                    <td className="total" data-column="resultadoTotal">
                      {item.data.total}
                    </td>
                    <td data-column="puestoTotal">{item.data.puestoTotal}</td>
                    <td data-column="puntos">
                      {item.data.puestoTotal !== ""
                        ? calcularPuntos(item.data.puestoTotal)
                        : null}
                    </td>
                    <td className="total" data-column="robi">
                      {isNaN(calculateRobi(item.data.peso, item.data.total))
                        ? 0
                        : calculateRobi(item.data.peso, item.data.total)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <form className="form-puntaje">
        <Link className="link-Atras" to="/TablaDeCompeticion">
          <button className="link-Atras" type="button">
            Atras
          </button>
        </Link>
        <button type="button" onClick={captureTable}>
          guardar
        </button>
      </form>
    </div>
  );
}

export default TablePoints;
