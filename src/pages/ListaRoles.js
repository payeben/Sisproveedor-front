import React, { useState, useEffect } from 'react';
import axios from '../context/axiosConfig'; // Usa la instancia configurada
import { Link } from 'react-router-dom';
import { Table, Button, Card } from 'react-bootstrap';

const ListaRoles = () => {
    const [roles, setRoles] = useState([]);

    // Obtener roles desde la API
    useEffect(() => {
        axios
            .get('/roles')
            .then(response => {
                setRoles(response.data);
            })
            .catch(error => {
                console.error('Error al cargar los roles:', error);
                if (error.response && error.response.status === 401) {
                    alert('No autorizado. Por favor, inicie sesión.');
                }
            });
    }, []);

    const eliminarRol = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este rol?')) {
            axios
                .delete(`/roles/${id}`)
                .then(() => {
                    setRoles(roles.filter(rol => rol.id !== id));
                })
                .catch(error => {
                    console.error('Error al eliminar el rol:', error);
                });
        }
    };

    return (
        <div className="container mt-5">
            <Card className="shadow-lg">
                <Card.Header
                    className="text-center text-white"
                    style={{ backgroundColor: '#003366' }}
                >
                    <h2 className="fw-bold">Lista de Roles</h2>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="text-muted">
                            Aquí puedes gestionar los roles del sistema. Usa las acciones para ver, editar o eliminar un rol.
                        </p>
                        <Link to="/crear-rol">
                            <Button variant="success">Crear Rol</Button>
                        </Link>
                    </div>
                    <Table hover responsive>
                        <thead style={{ backgroundColor: '#004080', color: 'white' }}>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.length > 0 ? (
                                roles.map((rol) => (
                                    <tr key={rol.id}>
                                        <td>{rol.id}</td>
                                        <td>{rol.nombre}</td>
                                        <td>{rol.descripcion}</td>
                                        <td>
                                            <Link to={`/ver-rol/${rol.id}`}>
                                                <Button variant="info" size="sm" className="me-2">
                                                    Ver
                                                </Button>
                                            </Link>
                                            <Link to={`/editar-rol/${rol.id}`}>
                                                <Button variant="warning" size="sm" className="me-2">
                                                    Editar
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => eliminarRol(rol.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No hay roles registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
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

export default ListaRoles;
