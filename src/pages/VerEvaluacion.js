import React, { useState, useEffect, useContext } from 'react';
import axios from '../context/axiosConfig';
import { useParams, Link } from 'react-router-dom';
import { Card, Table, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';

const VerEvaluacion = () => {
    const { id } = useParams(); // Obtener el ID de la evaluación desde la URL
    const [evaluacion, setEvaluacion] = useState(null);
    const { user } = useContext(UserContext); // Obtener el usuario del contexto


    // Cargar los datos de la evaluación al iniciar
    useEffect(() => {
        axios
            .get(`/evaluaciones/${id}`)
            .then((response) => {
                setEvaluacion(response.data); // Guardar los datos de la evaluación
            })
            .catch((error) => {
                console.error('Error al cargar la evaluación:', error);
            });
    }, [id]);

    if (!evaluacion) {
        return (
            <div className="container mt-5">
                <p>Cargando evaluación...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <Card className="shadow-lg">
                <Card.Header
                    className="text-center text-white"
                    style={{ backgroundColor: '#003366' }}
                >
                    <h2 className="fw-bold">Detalles de la Evaluación</h2>
                </Card.Header>
                <Card.Body>
                    <Table bordered responsive>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{evaluacion.id}</td>
                            </tr>
                            <tr>
                                <th>Proveedor</th>
                                <td>{evaluacion.proveedor.nombreRazonSocial}</td>
                            </tr>
                            <tr>
                                <th>Responsable</th>
                                <td>{evaluacion.responsable.nombre}</td>
                            </tr>
                            <tr>
                                <th>Fecha</th>
                                <td>{evaluacion.fecha}</td>
                            </tr>
                            <tr>
                                <th>Resultado</th>
                                <td>{evaluacion.resultado}</td>
                            </tr>
                            <tr>
                                <th>Comentarios</th>
                                <td>{evaluacion.comentarios}</td>
                            </tr>
                            <tr>
                                <th>Nivel de Criticidad</th>
                                <td>{evaluacion.nivelCriticidad}</td>
                            </tr>
                            <tr>
                                <th>Frecuencia Definida</th>
                                <td>{evaluacion.frecuenciaDefinida}</td>
                            </tr>
                            <tr>
                                <th>Resultado Cierre de Gestión</th>
                                <td>{evaluacion.resultadoCierreGestion}</td>
                            </tr>
                            <tr>
                                <th>Resultado Enero</th>
                                <td>{evaluacion.resultadoEnero}</td>
                            </tr>
                            <tr>
                                <th>Resultado Julio</th>
                                <td>{evaluacion.resultadoJulio}</td>
                            </tr>
                            <tr>
                                <th>Promedio Anual</th>
                                <td>{evaluacion.promedioAnual}</td>
                            </tr>
                            <tr>
                                <th>Fecha de Creación</th>
                                <td>{new Date(evaluacion.created_at).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>Última Actualización</th>
                                <td>{new Date(evaluacion.updated_at).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-end">
                        <Link to="/evaluaciones">
                            <Button variant="secondary" className="me-2">
                                Volver a la Lista
                            </Button>
                        </Link>
                        {user?.rol_id !== 3 && (
                        <Link to={`/editar/${evaluacion.id}`}>
                            <Button variant="warning">Editar Evaluación</Button>
                        </Link>
                        )}
                    </div>
                </Card.Body>
                <Card.Footer className="text-center">
                    <p className="text-muted mb-0">
                        Universidad Nur - Sistema de Gestión de Evaluaciones
                    </p>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default VerEvaluacion;
