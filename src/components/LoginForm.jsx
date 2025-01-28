import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./LoginForm.css";

export function LoginForm({ setName, setToken }) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loginError, setLoginError] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user === "" || password === "") {
            setError(true);
            return;
        }
        setError(false);
        
        try {
            // Intentar hacer login
            const response = await axios.post("http://localhost:5289/api/Login", {
                email: user,
                password: password,
            });

            // Si obtenemos un token, lo guardamos
            if (response.data.token) {
                setToken(response.data.token); // Guardamos el token
                setName(user); // Asignamos el nombre de usuario
            } else {
                setLoginError("Correo o contraseña incorrectos.");
                setToken(null); // Aseguramos que el token sea null en caso de error
            }
        } catch (error) {
            // Si la respuesta es un error 401, se maneja el error
            if (error.response && error.response.status === 401) {
                setLoginError("Correo o contraseña incorrectos.");
            } else {
                setLoginError("Error desconocido. Inténtalo de nuevo.");
            }
            setToken(null); // Asegurarse de que el token sea null en caso de error
        }
    };

    return (
        <section>
            <h1>Login</h1>

            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                />
                <button type="submit">Iniciar Sesión</button>
            </form>

            {error && <p>Todos los campos son obligatorios.</p>}
            {loginError && <p>{loginError}</p>}
        </section>
    );
}

// Validación de props
LoginForm.propTypes = {
    setName: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired,
};
