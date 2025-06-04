import React, { useState, useEffect } from 'react';
import axios from '../context/axiosConfig';
import { useParams, Link } from 'react-router-dom';
import { Card, Table, Button } from 'react-bootstrap';

const VerUsuario = () => {
    const { id } = useParams(); // Obtener el ID del usuario desde la URL
    const [usuario, setUsuario] = useState(null);

    // Cargar los datos del usuario al iniciar
    useEffect(() => {
        axios
            .get(`/users/${id}`)
            .then((response) => {
                setUsuario(response.data); // Guardar los datos del usuario
            })
            .catch((error) => {
                console.error('Error al cargar el usuario:', error);
            });
    }, [id]);

    if (!usuario) {
        return (
            <div className="container mt-5">
                <p>Cargando usuario...</p>
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
                    <h2 className="fw-bold">Detalles del Usuario</h2>
                </Card.Header>
                <Card.Body>
                    <Table bordered responsive>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{usuario.id}</td>
                            </tr>
                            <tr>
                                <th>Nombre</th>
                                <td>{usuario.nombre}</td>
                            </tr>
                            <tr>
                                <th>Apellido</th>
                                <td>{usuario.apellido}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{usuario.email}</td>
                            </tr>
                            <tr>
                                <th>Teléfono</th>
                                <td>{usuario.telefono}</td>
                            </tr>
                            <tr>
                                <th>Rol</th>
                                <td>{usuario.rol ? usuario.rol.nombre : 'Sin rol asignado'}</td>
                            </tr>
                            <tr>
                                <th>Descripción del Rol</th>
                                <td>{usuario.rol ? usuario.rol.descripcion : 'No aplica'}</td>
                            </tr>
                            <tr>
                                <th>Fecha de Creación</th>
                                <td>{new Date(usuario.created_at).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>Última Actualización</th>
                                <td>{new Date(usuario.updated_at).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-end">
                        <Link to="/usuarios">
                            <Button variant="secondary" className="me-2">
                                Volver a la Lista
                            </Button>
                        </Link>
                        <Link to={`/editar-usuario/${usuario.id}`}>
                            <Button variant="warning">Editar Usuario</Button>
                        </Link>
                    </div>
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

export default VerUsuario;
