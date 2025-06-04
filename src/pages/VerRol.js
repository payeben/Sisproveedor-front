import React, { useState, useEffect } from 'react';
import axios from '../context/axiosConfig';
import { useParams, Link } from 'react-router-dom';
import { Card, Table, Button } from 'react-bootstrap';

const VerRol = () => {
    const { id } = useParams(); // Obtener el ID del rol desde la URL
    const [rol, setRol] = useState(null);

    // Cargar los datos del rol al iniciar
    useEffect(() => {
        axios
            .get(`/roles/${id}`)
            .then((response) => {
                setRol(response.data); // Guardar los datos del rol
            })
            .catch((error) => {
                console.error('Error al cargar el rol:', error);
            });
    }, [id]);

    if (!rol) {
        return (
            <div className="container mt-5">
                <p>Cargando rol...</p>
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
                    <h2 className="fw-bold">Detalles del Rol</h2>
                </Card.Header>
                <Card.Body>
                    <Table bordered responsive>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{rol.id}</td>
                            </tr>
                            <tr>
                                <th>Nombre</th>
                                <td>{rol.nombre}</td>
                            </tr>
                            <tr>
                                <th>Descripción</th>
                                <td>{rol.descripcion}</td>
                            </tr>
                            <tr>
                                <th>Fecha de Creación</th>
                                <td>{new Date(rol.created_at).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>Última Actualización</th>
                                <td>{new Date(rol.updated_at).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-end">
                        <Link to="/roles">
                            <Button variant="secondary" className="me-2">
                                Volver a la Lista
                            </Button>
                        </Link>
                        <Link to={`/editar-rol/${rol.id}`}>
                            <Button variant="warning">Editar Rol</Button>
                        </Link>
                    </div>
                </Card.Body>
                <Card.Footer className="text-center">
                    <p className="text-muted mb-0">
                        Universidad Nur - Sistema de Gestión de Roles
                    </p>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default VerRol;
