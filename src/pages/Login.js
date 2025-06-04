import React, { useState, useContext } from 'react';
import { Form, Button, Card, Container, Alert, Image } from 'react-bootstrap';
import axios from '../context/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import logo from '../assets/logo.png'; // Ajusta la ruta al logo

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('/login', { email, password });
            const { user, token } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            navigate('/home');
        } catch (error) {
            setError(
                error.response?.data?.message || 'Credenciales incorrectas. Por favor, inténtalo nuevamente.'
            );
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #003A72, #0061C1)' }}>
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Card className="shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '10px' }}>
                    <Card.Body>
                        <div className="text-center mb-4">
                            <Image src={logo} alt="Logo" fluid style={{ maxHeight: '100px' }} />
                        </div>
                        <Card.Title className="text-center mb-4" style={{ color: '#003A72', fontWeight: 'bold' }}>
                            Ingresar
                        </Card.Title>
                        {error && (
                            <Alert variant="danger" onClose={() => setError(null)} dismissible>
                                {error}
                            </Alert>
                        )}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label style={{ color: '#003A72' }}>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Ingresa tu correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label style={{ color: '#003A72' }}>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                Ingresar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Login;
