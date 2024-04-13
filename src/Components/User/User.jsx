// Login.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

function User({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Verificar el usuario y contraseña
    if (username === "admin" && password === "HalterofiliaEnvigado2023.") {
      onLogin(username);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <Link className="sin-subrayado" to="/">
      <div className="contenerdor-login">
        <div className="contenerdor-iniciar-sesion">
          <h2 className="iniciar-sesion">Iniciar Sesión</h2>
          <div className="contenedor-nombre-usuario">
            <label className="nombre-usuario">Nombre de Usuario:</label>
            <input
              type="text"
              className="input-nombre-usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="contenedor-contrasena">
            <label className="contrasena">Contraseña:</label>
            <input
              type="password"
              className="input-contrasena"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="contenedor-boton-iniciar-sesion">
            <button className="boton-iniciar-sesion" onClick={handleLogin}>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default User;
