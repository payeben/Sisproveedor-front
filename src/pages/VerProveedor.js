import React, { useState, useEffect, useContext } from 'react';
import axios from '../context/axiosConfig';
import { useParams, Link } from 'react-router-dom';
import { Card, Table, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';


const VerProveedor = () => {
    const { id } = useParams();
    const [proveedor, setProveedor] = useState(null);
    const { user } = useContext(UserContext); // Obtener el usuario del contexto


    // Cargar los datos del proveedor al iniciar
    useEffect(() => {
        axios
            .get(`/proveedores/${id}`)
            .then((response) => {
                setProveedor(response.data); // Guardar los datos del proveedor
            })
            .catch((error) => {
                console.error('Error al cargar el proveedor:', error);
            });
    }, [id]);

    if (!proveedor) {
        return (
            <div className="container mt-5">
                <p>Cargando proveedor...</p>
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
                    <h2 className="fw-bold">Detalles del Proveedor</h2>
                </Card.Header>
                <Card.Body>
                    <Table bordered responsive>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{proveedor.id}</td>
                            </tr>
                            <tr>
                                <th>Nombre/Razón Social</th>
                                <td>{proveedor.nombreRazonSocial}</td>
                            </tr>
                            <tr>
                                <th>NIT</th>
                                <td>{proveedor.NIT}</td>
                            </tr>
                            <tr>
                                <th>Dirección</th>
                                <td>{proveedor.direccion}</td>
                            </tr>
                            <tr>
                                <th>Teléfono</th>
                                <td>{proveedor.telefono}</td>
                            </tr>
                            <tr>
                                <th>Persona de Contacto</th>
                                <td>{proveedor.personaContacto}</td>
                            </tr>
                            <tr>
                                <th>Celular</th>
                                <td>{proveedor.celular}</td>
                            </tr>
                            <tr>
                                <th>Encargado de Cobranza</th>
                                <td>{proveedor.encargadoCobranza}</td>
                            </tr>
                            <tr>
                                <th>Correo Electrónico</th>
                                <td>{proveedor.correoElectronico}</td>
                            </tr>
                            <tr>
                                <th>Producto/Servicio</th>
                                <td>{proveedor.productoServicio}</td>
                            </tr>
                            <tr>
                                <th>Tipo de Proveedor</th>
                                <td>{proveedor.tipoProveedor}</td>
                            </tr>
                            <tr>
                                <th>Fecha de Creación</th>
                                <td>{new Date(proveedor.created_at).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>Última Actualización</th>
                                <td>{new Date(proveedor.updated_at).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-end">
                        <Link to="/proveedores">
                            <Button variant="secondary" className="me-2">
                                Volver a la Lista
                            </Button>
                        </Link>
                        {user?.rol_id !== 2 && (
                        <Link to={`/editar-proveedor/${proveedor.id}`}>
                            <Button variant="warning">Editar Proveedor</Button>
                        </Link>
                        )}
                    </div>
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

export default VerProveedor;
