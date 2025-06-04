import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Importa el contexto
import { Card, Container, Row, Col, Image } from 'react-bootstrap'; // Importa componentes de react-bootstrap
import logo from '../assets/logo.png'; // Ajusta la ruta al logo

const Home = () => {
    const { user } = useContext(UserContext);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Buenos días';
        if (hour < 18) return 'Buenas tardes';
        return 'Buenas noches';
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #003A72, #0061C1)' }}>
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Row>
                    <Col>
                        <Card style={{ width: '30rem', borderRadius: '10px' }} className="text-center shadow-lg p-4">
                            <Card.Body>
                                <Image src={logo} alt="Logo" fluid style={{ maxHeight: '100px', marginBottom: '20px' }} />
                                <Card.Title style={{ color: '#003A72', fontWeight: 'bold', fontSize: '1.5rem' }}>
                                    {getGreeting()}, {user?.nombre} {user?.apellido}!
                                </Card.Title>
                                <Card.Text style={{ color: '#555' }}>
                                    Bienvenido al sistema de gestion de evaluaciones de la Universidad NUR.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
