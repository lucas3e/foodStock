import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StockPage from './pages/StockPage';
import MenuPage from './pages/MenuPage';
import ReportsPage from './pages/ReportsPage';
import UsersPage from './pages/UsersPage';
import Layout from './components/layout/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Simulação de autenticação
  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        {isAuthenticated ? (
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/estoque" element={<StockPage />} />
            <Route path="/cardapios" element={<MenuPage />} />
            <Route path="/relatorios" element={<ReportsPage />} />
            <Route path="/usuarios" element={<UsersPage />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;