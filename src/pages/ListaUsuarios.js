import React, { useState, useEffect } from 'react';
import axios from '../context/axiosConfig'; // Usa la instancia configurada
import { Link } from 'react-router-dom';
import { Table, Button, Card } from 'react-bootstrap';

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    // Obtener usuarios desde la API
    useEffect(() => {
        axios
            .get('/users') // La baseURL ya está configurada en axiosConfig
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error('Error al cargar los usuarios:', error);
                if (error.response && error.response.status === 401) {
                    alert('No autorizado. Por favor, inicie sesión.');
                }
            });
    }, []);

    const eliminarUsuario = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
            axios
                .delete(`/users/${id}`)
                .then(() => {
                    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
                })
                .catch((error) => {
                    console.error('Error al eliminar el usuario:', error);
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
                    <h2 className="fw-bold">Lista de Usuarios</h2>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="text-muted">
                            Aquí puedes gestionar los usuarios registrados en el sistema. Usa las
                            acciones para ver, editar o eliminar un usuario.
                        </p>
                        <Link to="/crear-usuario">
                            <Button variant="success">Crear Usuario</Button>
                        </Link>
                    </div>
                    <Table hover responsive>
                        <thead style={{ backgroundColor: '#004080', color: 'white' }}>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.length > 0 ? (
                                usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.apellido}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.telefono}</td>
                                        <td>{usuario.rol?.nombre || 'Sin rol asignado'}</td>
                                        <td>
                                            <Link to={`/ver-usuario/${usuario.id}`}>
                                                <Button variant="info" size="sm" className="me-2">
                                                    Ver
                                                </Button>
                                            </Link>
                                            <Link to={`/editar-usuario/${usuario.id}`}>
                                                <Button variant="warning" size="sm" className="me-2">
                                                    Editar
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => eliminarUsuario(usuario.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No hay usuarios registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="text-center">
                    <p className="text-muted mb-0">
                        Universidad Nur - Sistema de Gestión de Usuarios
                    </p>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default ListaUsuarios;
