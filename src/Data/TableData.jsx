import React, { createContext, useState, useContext } from "react";

const TablaContext = createContext();

export const TablaProvider = ({ children }) => {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [divisiones, setDivisiones] = useState("");
  const [datosTabla, setDatosTabla] = useState([
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
        puntos: "",
        robi: "",
      },
    },
  ]);

  return (
    <TablaContext.Provider
      value={{
        datosTabla,
        setDatosTabla,
        divisiones,
        setDivisiones,
        categoria,
        setCategoria,
        titulo,
        setTitulo,
      }}
    >
      {children}
    </TablaContext.Provider>
  );
};

export const useTablaContext = () => {
  return useContext(TablaContext);
};
