import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';

const App = () => {
    
    return (
        <>
        <div className="w-100">
            <Navbar />
            <AppRoutes />
        </div>
        </>
    );
};

export default App;
