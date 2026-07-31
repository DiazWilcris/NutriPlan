import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const userData = localStorage.getItem('nutriplan_user');
  const user = userData ? JSON.parse(userData) : null;

  return (
    <nav className="navbar navbar-dark bg-success px-4 shadow-sm d-flex justify-content-between">
      <span className="navbar-brand fw-bold mb-0 h1">NutriPlan</span>
      {user && (
        <span className="text-white">
          Hola, <strong>{user.nombre}</strong> <span className="badge bg-light text-success ms-2">{user.rol}</span>
        </span>
      )}
    </nav>
  );
};

export default Navbar;