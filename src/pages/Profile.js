import React, { useContext } from 'react';
import { Card, Table } from 'react-bootstrap';
import { UserContext } from '../context/UserContext'; // Importa el contexto del usuario

const Profile = () => {
    const { user } = useContext(UserContext); // Obtén el usuario del contexto

    if (!user) {
        return (
            <div className="container mt-5">
                <p>No hay un usuario logueado.</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <Card className="shadow-lg">
                <Card.Header as="h5" className="bg-primary text-white">
                    Perfil del Usuario
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td><strong>Nombre</strong></td>
                                <td>{user.nombre}</td>
                            </tr>
                            <tr>
                                <td><strong>Email</strong></td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Teléfono</strong></td>
                                <td>{user.telefono}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Profile;
