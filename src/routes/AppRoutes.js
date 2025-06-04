import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ListaEvaluaciones from '../pages/ListaEvaluaciones';
import CrearEvaluacion from '../pages/CrearEvaluacion';
import EditarEvaluacion from '../pages/EditarEvaluacion';
import VerEvaluacion from '../pages/VerEvaluacion';
import ListaUsuarios from '../pages/ListaUsuarios';
import CrearUsuario from '../pages/CrearUsuario';
import EditarUsuario from '../pages/EditarUsuario';
import VerUsuario from '../pages/VerUsuario';
import ListaProveedores from '../pages/ListaProveedores';
import CrearProveedor from '../pages/CrearProveedores';
import EditarProveedor from '../pages/EditarProveedor';
import VerProveedor from '../pages/VerProveedor';
import ListaRoles from '../pages/ListaRoles';
import CrearRol from '../pages/CrearRol';
import EditarRol from '../pages/EditarRol';
import VerRol from '../pages/VerRol';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

const routes = [
    { path: '/evaluaciones', component: <ListaEvaluaciones /> },
    { path: '/crear', component: <CrearEvaluacion /> },
    { path: '/editar/:id', component: <EditarEvaluacion /> },
    { path: '/ver/:id', component: <VerEvaluacion /> },
    { path: '/usuarios', component: <ListaUsuarios /> },
    { path: '/crear-usuario', component: <CrearUsuario /> },
    { path: '/ver-usuario/:id', component: <VerUsuario /> },
    { path: '/editar-usuario/:id', component: <EditarUsuario /> },
    { path: '/proveedores', component: <ListaProveedores /> },
    { path: '/crear-proveedor', component: <CrearProveedor /> },
    { path: '/editar-proveedor/:id', component: <EditarProveedor /> },
    { path: '/ver-proveedor/:id', component: <VerProveedor /> },
    { path: '/roles', component: <ListaRoles /> },
    { path: '/crear-rol', component: <CrearRol /> },
    { path: '/editar-rol/:id', component: <EditarRol /> },
    { path: '/ver-rol/:id', component: <VerRol /> },
];

const AppRoutes = () => {
    return (
        <BrowserRouter>
                <Routes>
                    {/* Rutas Públicas */}
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                    {/* Rutas Desprotegidas (sin PrivateRoute) */}
                    {routes.map(({ path, component }) => (
                        <Route key={path} path={path} element={component} />
                    ))}
                </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
