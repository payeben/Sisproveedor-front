import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from '../context/UserContext'; // Importa el contexto

function BasicExample() {
    const { user, setUser } = useContext(UserContext); // Obtén el usuario del contexto

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Si usas un token
        setUser(null); // Limpia el estado global del usuario
        window.location.href = '/login';
    };

    return (
        <Navbar expand="lg" style={{ background: 'linear-gradient(135deg, #003A72, #0061C1)' }} variant="dark">
            <Container>
                <Navbar.Brand href="/home">Sistema de Gestión de Evaluaciones</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" style={{ color: '#FFFFFF' }}>
                        {/* Enlaces para Administrador */}
                        {user?.rol_id === 1 && (
                            // <>
                            //     <Nav.Link href="/usuarios">Usuarios</Nav.Link>
                            //     <Nav.Link href="/roles">Roles</Nav.Link>
                            // </>
                            <NavDropdown title="Usuarios" id="evaluaciones-dropdown" style={{ color: '#FFFFFF' }}>
                                {user?.rol_id === 1 && (
                                    <NavDropdown.Item href="/crear-usuario">Crear</NavDropdown.Item>
                                )}
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/usuarios">Lista</NavDropdown.Item>
                            </NavDropdown>
                            
                        )}
                        {/* Enlaces para Administrador */}
                        {user?.rol_id === 1 && (
                            <NavDropdown title="Roles" id="evaluaciones-dropdown" style={{ color: '#FFFFFF' }}>
                                {user?.rol_id === 1 && (
                                    <NavDropdown.Item href="/crear-rol">Crear</NavDropdown.Item>
                                )}
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/roles">Lista</NavDropdown.Item>
                            </NavDropdown>
                            
                        )}                        
                        {/* Evaluaciones (para Admin y Evaluador) */}
                        {(user?.rol_id === 1 || user?.rol_id === 2 || user?.rol_id === 3) && (
                            <NavDropdown title="Evaluaciones" id="evaluaciones-dropdown" style={{ color: '#FFFFFF' }}>
                                {user?.rol_id === 1 && (
                                    <NavDropdown.Item href="/crear">Crear</NavDropdown.Item>
                                )}
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/evaluaciones">Lista</NavDropdown.Item>
                            </NavDropdown>
                        )}
                        {/* Proveedores (para Admin y Supervisor) */}
                        {(user?.rol_id === 1 || user?.rol_id === 3 || user?.rol_id === 2) && (
                            <NavDropdown title="Proveedores" id="proveedores-dropdown" style={{ color: '#FFFFFF' }}>
                                {user?.rol_id === 1 && (
                                    <NavDropdown.Item href="/crear-proveedor">Crear</NavDropdown.Item>

                                )}
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/proveedores">Lista</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                    {/* Botón de Cerrar Sesión */}
                    <NavDropdown title={<span style={{ color: '#FFFFFF' }}>Opciones</span>} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">Perfil</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
                        </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;
