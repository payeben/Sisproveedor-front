import React, { useState } from 'react';
import axios from '../context/axiosConfig';
import { useNavigate } from 'react-router-dom';

const CrearRol = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('/roles', formData) // Ruta para crear rol
            .then(() => {
                alert('Rol creado con éxito');
                navigate('/roles'); // Redirigir a la lista de roles
            })
            .catch((error) => {
                console.error('Error al crear el rol:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h1>Crear Rol</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre del Rol</label>
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
                    <label className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    Crear Rol
                </button>
            </form>
        </div>
    );
};

export default CrearRol;
