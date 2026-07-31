import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('nutriplan_user'); 
    navigate('/'); 
  };

  return (
    <div className="p-3 bg-white border-end shadow-sm" style={{ width: '250px', height: '100%' }}>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-dark rounded custom-hover" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-dark rounded custom-hover" to="/planes">Planes Alimenticios</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-dark rounded custom-hover" to="/alimentos">Alimentos</Link>
        </li>
        <li className="nav-item mt-4">
          <button onClick={handleLogout} className="btn btn-outline-danger w-100 fw-bold">
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;