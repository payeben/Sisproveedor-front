import React, { useState, useEffect } from 'react';
import axios from '../context/axiosConfig';
import { useNavigate } from 'react-router-dom';

const CrearUsuario = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        rol_id: '',
    });

    const [roles, setRoles] = useState([]); // Lista de roles
    const navigate = useNavigate();

    // Obtener roles
    useEffect(() => {
        axios
            .get('/roles') // Ruta para obtener roles
            .then((response) => {
                if (response.data && Array.isArray(response.data)) {
                    setRoles(response.data); // Aseguramos que la respuesta sea un array
                } else {
                    console.error('La API de roles no devolvió un array válido.');
                    setRoles([]);
                }
            })
            .catch((error) => {
                console.error('Error al cargar roles:', error);
                setRoles([]);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('/users', formData) // Ruta para crear usuario
            .then(() => {
                alert('Usuario creado con éxito');
                navigate('/usuarios'); // Redirigir a la lista de usuarios
            })
            .catch((error) => {
                console.error('Error al crear el usuario:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h1>Crear Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <select
                        className="form-select"
                        name="rol_id"
                        value={formData.rol_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un rol</option>
                        {roles.length > 0 ? (
                            roles.map((rol) => (
                                <option key={rol.id} value={rol.id}>
                                    {rol.nombre}
                                </option>
                            ))
                        ) : (
                            <option disabled>Cargando roles...</option>
                        )}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Crear Usuario
                </button>
            </form>
        </div>
    );
};

export default CrearUsuario;
