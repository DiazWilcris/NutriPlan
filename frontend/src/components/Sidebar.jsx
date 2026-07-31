import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="p-3 bg-light border-end" style={{ width: '250px', height: '100vh' }}>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-dark" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white bg-success rounded fw-bold" to="/planes">Planes Alimenticios</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-dark" to="/alimentos">Alimentos</Link>
        </li>
        <li className="nav-item mt-4">
          <Link className="btn btn-outline-danger w-100" to="/">Cerrar sesión</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;