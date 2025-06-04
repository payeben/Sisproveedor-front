import React, { useState, useEffect } from 'react';
import axios from '../context/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

const EditarRol = () => {
    const { id } = useParams(); // Obtener el ID del rol desde la URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
    });

    // Cargar los datos del rol al iniciar
    useEffect(() => {
        axios
            .get(`/roles/${id}`)
            .then((response) => {
                setFormData(response.data); // Cargar los datos en el formulario
            })
            .catch((error) => {
                console.error('Error al cargar el rol:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`/roles/${id}`, formData) // Ruta para actualizar rol
            .then(() => {
                alert('Rol actualizado con éxito');
                navigate('/roles'); // Volver a la lista de roles
            })
            .catch((error) => {
                console.error('Error al actualizar el rol:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h1>Editar Rol</h1>
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
                    Actualizar Rol
                </button>
            </form>
        </div>
    );
};

export default EditarRol;
