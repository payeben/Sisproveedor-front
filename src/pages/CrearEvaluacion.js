import React, { useState, useEffect, useContext } from 'react';
import axios from '../context/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Importa el contexto

const CrearEvaluacion = () => {
    const { user } = useContext(UserContext); // Obtén el usuario actual desde el contexto
    const [formData, setFormData] = useState({
        proveedor_id: '',
        responsableEvaluacion: user?.id || '', // Asigna automáticamente el usuario actual
        fecha: new Date().toISOString().split('T')[0],
        resultado: '',
        comentarios: '',
        nivelCriticidad: 'Baja',
        frecuenciaDefinida: 'Mensual',
        resultadoCierreGestion: 0,
        resultadoEnero: 0,
        resultadoJulio: 0,
        promedioAnual: 0,
    });

    const [proveedores, setProveedores] = useState([]); // Lista de proveedores
    const navigate = useNavigate();

    // Obtener proveedores
    useEffect(() => {
        axios
            .get('/proveedores')
            .then((response) => {
                if (response.data && Array.isArray(response.data.data)) {
                    setProveedores(response.data.data); // Accedemos al array dentro de `data`
                } else {
                    console.error('La API de proveedores no devolvió un array válido.');
                    setProveedores([]);
                }
            })
            .catch((error) => {
                console.error('Error al cargar proveedores:', error);
                setProveedores([]);
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
            .post('/evaluaciones', formData)
            .then(() => {
                alert('Evaluación creada con éxito');
                navigate('/evaluaciones');
            })
            .catch((error) => {
                console.error('Error al crear la evaluación:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h1>Crear Evaluación</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Proveedor</label>
                    <select
                        className="form-select"
                        name="proveedor_id"
                        value={formData.proveedor_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un proveedor</option>
                        {proveedores.length > 0 ? (
                            proveedores.map((proveedor) => (
                                <option key={proveedor.id} value={proveedor.id}>
                                    {proveedor.nombreRazonSocial}
                                </option>
                            ))
                        ) : (
                            <option disabled>Cargando proveedores...</option>
                        )}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Responsable Evaluación</label>
                    <input
                        type="text"
                        className="form-control"
                        name="responsableEvaluacion"
                        value={`${user?.nombre} ${user?.apellido}`} // Muestra el nombre del usuario actual
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input
                        type="date"
                        className="form-control"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Resultado (1-10)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="resultado"
                        min="1"
                        max="10"
                        value={formData.resultado}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Comentarios</label>
                    <textarea
                        className="form-control"
                        name="comentarios"
                        value={formData.comentarios}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Nivel de Criticidad</label>
                    <select
                        className="form-select"
                        name="nivelCriticidad"
                        value={formData.nivelCriticidad}
                        onChange={handleChange}
                        required
                    >
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Frecuencia Definida</label>
                    <select
                        className="form-select"
                        name="frecuenciaDefinida"
                        value={formData.frecuenciaDefinida}
                        onChange={handleChange}
                        required
                    >
                        <option value="Mensual">Mensual</option>
                        <option value="Trimestral">Trimestral</option>
                        <option value="Semestral">Semestral</option>
                        <option value="Anual">Anual</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Crear
                </button>
            </form>
        </div>
    );
};

export default CrearEvaluacion;
