import React, { useState, useEffect, useContext } from 'react';
import axios from '../context/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Importa el contexto

const EditarEvaluacion = () => {
    const { id } = useParams(); // Obtener el ID de la evaluación desde la URL
    const navigate = useNavigate();
    const { user } = useContext(UserContext); // Obtén el usuario actual desde el contexto

    const [formData, setFormData] = useState({
        proveedor_id: '',
        responsableEvaluacion: '', // Prellena con el usuario actual si no hay otro valor
        fecha: '',
        resultado: '',
        comentarios: '',
        nivelCriticidad: 'Baja',
        frecuenciaDefinida: 'Mensual',
    });

    const [proveedores, setProveedores] = useState([]);

    // Cargar los datos de la evaluación al iniciar
    useEffect(() => {
        axios.get(`/evaluaciones/${id}`)
            .then((response) => {
                const data = response.data;
                setFormData({
                    ...data,
                    responsableEvaluacion: data.responsableEvaluacion || user?.id, // Usar el usuario actual si está vacío
                });
            })
            .catch((error) => {
                console.error('Error al cargar la evaluación:', error);
            });
    }, [id, user]);

    // Cargar los proveedores
    useEffect(() => {
        axios.get('/proveedores')
            .then((response) => {
                if (response.data && Array.isArray(response.data.data)) {
                    setProveedores(response.data.data);
                } else {
                    console.error('La API de proveedores no devolvió un array válido.');
                }
            })
            .catch((error) => {
                console.error('Error al cargar proveedores:', error);
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
        axios.put(`/evaluaciones/${id}`, formData)
            .then(() => {
                alert('Evaluación actualizada con éxito');
                navigate('/evaluaciones'); // Volver a la lista de evaluaciones
            })
            .catch((error) => {
                console.error('Error al actualizar la evaluación:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h1>Editar Evaluación</h1>
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
                        {proveedores.map((proveedor) => (
                            <option key={proveedor.id} value={proveedor.id}>
                                {proveedor.nombreRazonSocial}
                            </option>
                        ))}
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
                <button type="submit" className="btn btn-primary">Actualizar</button>
            </form>
        </div>
    );
};

export default EditarEvaluacion;
