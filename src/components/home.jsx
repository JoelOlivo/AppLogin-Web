import PropTypes from "prop-types";

export function Home({ token }) {
    if (!token) {
        return (
            <div>
                <h1>Acceso denegado</h1>
                <p>No estás autenticado.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Bienvenido</h1>
            {/* <h2>Tu token es:</h2>
            <pre>{token}</pre> */}
        </div>
    );
}

// Validación de props
Home.propTypes = {
    token: PropTypes.string,
};
