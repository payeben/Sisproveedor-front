import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Card, Pagination, Modal, Form } from 'react-bootstrap';
import axios from '../context/axiosConfig';
import { UserContext } from '../context/UserContext';
import '../components/style.css';

const ListaEvaluaciones = () => {
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const { user } = useContext(UserContext); // Obtener el usuario del contexto

    // Cargar evaluaciones desde la API
    useEffect(() => {
        cargarEvaluaciones(currentPage);
    }, [currentPage]);

    const cargarEvaluaciones = (page) => {
        axios
            .get(`/evaluaciones?page=${page}`)
            .then((response) => {
                if (response.data && Array.isArray(response.data.data)) {
                    setEvaluaciones(response.data.data);
                    setCurrentPage(response.data.current_page);
                    setLastPage(response.data.last_page);
                } else {
                    console.error('La API de evaluaciones no devolvió un array válido.');
                    setEvaluaciones([]);
                }
            })
            .catch((error) => {
                console.error('Error al cargar evaluaciones:', error);
            });
    };

    // Función para eliminar una evaluación
    const eliminarEvaluacion = (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta evaluación?')) {
            axios
                .delete(`/evaluaciones/${id}`)
                .then(() => {
                    alert('Evaluación eliminada con éxito');
                    cargarEvaluaciones(currentPage);
                })
                .catch((error) => {
                    console.error('Error al eliminar la evaluación:', error);
                });
        }
    };

    // Funciones para manejar el modal
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedId('');
    };

    const handleDownload = (type) => {
        if (selectedId) {
            if (type === 'pdf') {
                window.open(`http://localhost:8000/api/reportes/evaluacion/${selectedId}/pdf`, '_blank');
            } else if (type === 'excel') {
                window.open(`http://localhost:8000/api/reportes/evaluacion/${selectedId}/excel`, '_blank');
            }
            handleCloseModal();
        } else {
            alert('Por favor selecciona una evaluación.');
        }
    };

    // Renderizar la paginación
    const renderPagination = () => {
        const items = [];
        for (let number = 1; number <= lastPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
        return (
            <Pagination>
                <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                />
                {items}
                <Pagination.Next
                    disabled={currentPage === lastPage}
                    onClick={() => setCurrentPage(currentPage + 1)}
                />
            </Pagination>
        );
    };

    return (
        <div className="container mt-5">
            <Card className="shadow-lg">
                <Card.Header className="text-center text-white" style={{ backgroundColor: '#003366' }}>
                    <h2 className="fw-bold">Lista de Evaluaciones</h2>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="text-muted">
                            Aquí puedes gestionar las evaluaciones de proveedores. Usa las acciones para ver, editar o eliminar una evaluación.
                        </p>
                        <div>
                            {user?.rol_id !== 3 && (
                                <Link to="/crear">
                                    <Button variant="success" className="me-2">Crear Evaluación</Button>
                                </Link>
                            )}
                            {user?.rol_id === 3 && (
                                <Button variant="primary" onClick={handleShowModal}>
                                    Generar Reporte
                                </Button>
                            )}
                        </div>
                    </div>
                    <Table hover responsive>
                        <thead style={{ backgroundColor: '#004080', color: 'white' }}>
                            <tr>
                                <th>ID</th>
                                <th>Proveedor</th>
                                <th>Responsable</th>
                                <th>Fecha</th>
                                <th>Resultado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evaluaciones.length > 0 ? (
                                evaluaciones.map((evaluacion) => (
                                    <tr key={evaluacion.id}>
                                        <td>{evaluacion.id}</td>
                                        <td>{evaluacion.proveedor.nombreRazonSocial}</td>
                                        <td>{evaluacion.responsable.nombre}</td>
                                        <td>{evaluacion.fecha}</td>
                                        <td>{evaluacion.resultado}</td>
                                        <td>
                                            <Link to={`/ver/${evaluacion.id}`}>
                                                <Button variant="info" size="sm" className="me-2">Ver</Button>
                                            </Link>
                                            {user?.rol_id !== 3 && (
                                            <Link to={`/editar/${evaluacion.id}`}>
                                                <Button variant="warning" size="sm" className="me-2">Editar</Button>
                                            </Link>
                                            )}
                                            {user?.rol_id !== 3 && (
                                            <Button variant="danger" size="sm" onClick={() => eliminarEvaluacion(evaluacion.id)}>Eliminar</Button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No hay evaluaciones registradas.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-center mt-3">{renderPagination()}</div>
                </Card.Body>
            </Card>

            {/* Modal para seleccionar el tipo de reporte */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Generar Reporte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="selectEvaluacion">
                        <Form.Label>Selecciona una evaluación</Form.Label>
                        <Form.Control as="select" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                            <option value="">-- Selecciona una evaluación --</option>
                            {evaluaciones.map((evaluacion) => (
                                <option key={evaluacion.id} value={evaluacion.id}>
                                    {`ID: ${evaluacion.id} - ${evaluacion.proveedor.nombreRazonSocial}`}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                    <Button variant="danger" onClick={() => handleDownload('pdf')}>PDF</Button>
                    <Button variant="success" onClick={() => handleDownload('excel')}>Excel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ListaEvaluaciones;
