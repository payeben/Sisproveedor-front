import React, { useState } from 'react';
import axios from '../context/axiosConfig';
import { useNavigate } from 'react-router-dom';

const CrearProveedor = () => {
    const [formData, setFormData] = useState({
        nombreRazonSocial: '',
        NIT: '',
        direccion: '',
        telefono: '',
        personaContacto: '',
        celular: '',
        encargadoCobranza: '',
        correoElectronico: '',
        productoServicio: '',
        proveedorNuevo: 0,
        tipoProveedor: '',
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
            .post('/proveedores', formData)
            .then(() => {
                alert('Proveedor creado con éxito');
                navigate('/proveedores');
            })
            .catch((error) => {
                console.error('Error al crear el proveedor:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h1>Crear Proveedor</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre/Razón Social</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombreRazonSocial"
                        value={formData.nombreRazonSocial}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">NIT</label>
                    <input
                        type="text"
                        className="form-control"
                        name="NIT"
                        value={formData.NIT}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
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
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Persona de Contacto</label>
                    <input
                        type="text"
                        className="form-control"
                        name="personaContacto"
                        value={formData.personaContacto}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Celular</label>
                    <input
                        type="text"
                        className="form-control"
                        name="celular"
                        value={formData.celular}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Encargado de Cobranza</label>
                    <input
                        type="text"
                        className="form-control"
                        name="encargadoCobranza"
                        value={formData.encargadoCobranza}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        name="correoElectronico"
                        value={formData.correoElectronico}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Producto/Servicio</label>
                    <input
                        type="text"
                        className="form-control"
                        name="productoServicio"
                        value={formData.productoServicio}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tipo de Proveedor</label>
                    <input
                        type="text"
                        className="form-control"
                        name="tipoProveedor"
                        value={formData.tipoProveedor}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        </div>
    );
};

export default CrearProveedor;
