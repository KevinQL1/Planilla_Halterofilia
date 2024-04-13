import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Importa Navigate desde react-router-dom
import User from "./Components/User/User";
import TableCompetition from "./Components/CompetitionTable/CompetitionTable";
import TablePoins from "./Components/TablePoints/TablePoins";
import { TablaProvider } from "./Data/TableData"; // Importa el TablaProvider

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <TablaProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <div className="boton-cerrar">
                  <button className="boton-cerrar" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                  <Navigate to="/TablaDeCompeticion" />
                </div>
              ) : (
                <User onLogin={handleLogin} />
              )
            }
          ></Route>
          <Route
            path="/TablaDeCompeticion"
            element={<TableCompetition />}
          ></Route>
          <Route path="/TablaDePuntajes" element={<TablePoins />}></Route>
        </Routes>
      </BrowserRouter>
    </TablaProvider>
  );
}

export default App;
