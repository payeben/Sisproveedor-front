import React, { useState, useEffect, useContext } from 'react';
import axios from '../context/axiosConfig'; // Usa la instancia configurada
import { Link } from 'react-router-dom';
import { Table, Button, Card, Pagination } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';


const ListaProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const { user } = useContext(UserContext); // Obtener el usuario del contexto


    // Cargar proveedores desde la API
    useEffect(() => {
        cargarProveedores(currentPage);
    }, [currentPage]);

    const cargarProveedores = (page) => {
        axios
            .get(`/proveedores?page=${page}`)
            .then((response) => {
                if (response.data && Array.isArray(response.data.data)) {
                    setProveedores(response.data.data); // Datos de los proveedores
                    setCurrentPage(response.data.current_page); // Página actual
                    setLastPage(response.data.last_page); // Última página disponible
                } else {
                    console.error('La API de proveedores no devolvió un array válido.');
                    setProveedores([]);
                }
            })
            .catch((error) => {
                console.error('Error al cargar proveedores:', error);
            });
    };

    // Función para eliminar un proveedor
    const eliminarProveedor = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este proveedor?')) {
            axios
                .delete(`/proveedores/${id}`)
                .then(() => {
                    alert('Proveedor eliminado con éxito');
                    cargarProveedores(currentPage); // Recargar la página actual
                })
                .catch((error) => {
                    console.error('Error al eliminar el proveedor:', error);
                });
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
                <Card.Header
                    className="text-center text-white"
                    style={{ backgroundColor: '#003366' }}
                >
                    <h2 className="fw-bold">Lista de Proveedores</h2>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="text-muted">
                            Aquí puedes ver todos los proveedores registrados en el sistema.
                        </p>
                        {user?.rol_id !== 2 && (
                            <Link to="/crear-proveedor">
                                <Button variant="success">Crear Proveedor</Button>
                            </Link>
                        )}
                    </div>
                    <Table hover responsive>
                        <thead style={{ backgroundColor: '#004080', color: 'white' }}>
                            <tr>
                                <th>ID</th>
                                <th>Nombre/Razón Social</th>
                                <th>NIT</th>
                                <th>Teléfono</th>
                                <th>Persona de Contacto</th>
                                <th>Tipo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proveedores.length > 0 ? (
                                proveedores.map((proveedor) => (
                                    <tr key={proveedor.id}>
                                        <td>{proveedor.id}</td>
                                        <td>{proveedor.nombreRazonSocial}</td>
                                        <td>{proveedor.NIT}</td>
                                        <td>{proveedor.telefono}</td>
                                        <td>{proveedor.personaContacto}</td>
                                        <td>{proveedor.tipoProveedor}</td>
                                        <td>
                                            <Link to={`/ver-proveedor/${proveedor.id}`}>
                                                <Button variant="info" size="sm" className="me-2">
                                                    Ver
                                                </Button>
                                            </Link>
                                            {user?.rol_id !== 2 && (
                                                <Link to={`/editar-proveedor/${proveedor.id}`}>
                                                    <Button variant="warning" size="sm" className="me-2">
                                                        Editar
                                                    </Button>
                                                </Link>
                                            )}
                                            {user?.rol_id !== 2 && (
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => eliminarProveedor(proveedor.id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            )}

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No hay proveedores registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-center mt-3">{renderPagination()}</div>
                </Card.Body>
                <Card.Footer className="text-center">
                    <p className="text-muted mb-0">
                        Universidad Nur - Sistema de Gestión de Proveedores
                    </p>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default ListaProveedores;
