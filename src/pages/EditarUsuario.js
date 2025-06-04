import React, { useState, useEffect } from 'react';
import axios from '../context/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

const EditarUsuario = () => {
    const { id } = useParams(); // Obtener el ID del usuario desde la URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        rol_id: '',
    });

    const [roles, setRoles] = useState([]); // Lista de roles

    // Cargar los datos del usuario al iniciar
    useEffect(() => {
        axios
            .get(`/users/${id}`)
            .then((response) => {
                setFormData(response.data); // Cargar los datos en el formulario
            })
            .catch((error) => {
                console.error('Error al cargar el usuario:', error);
            });
    }, [id]);

    // Cargar los roles
    useEffect(() => {
        axios
            .get('/roles') // Ruta para obtener los roles
            .then((response) => {
                if (response.data && Array.isArray(response.data)) {
                    setRoles(response.data);
                } else {
                    console.error('La API de roles no devolvió un array válido.');
                }
            })
            .catch((error) => {
                console.error('Error al cargar roles:', error);
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
            .put(`/users/${id}`, formData)
            .then(() => {
                alert('Usuario actualizado con éxito');
                navigate('/usuarios'); // Volver a la lista de usuarios
            })
            .catch((error) => {
                console.error('Error al actualizar el usuario:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h1>Editar Usuario</h1>
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
                    />
                    <small className="form-text text-muted">
                        Deja este campo vacío si no deseas cambiar la contraseña.
                    </small>
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
                        {roles.map((rol) => (
                            <option key={rol.id} value={rol.id}>
                                {rol.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Actualizar Usuario
                </button>
            </form>
        </div>
    );
};

export default EditarUsuario;
