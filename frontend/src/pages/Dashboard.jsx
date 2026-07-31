import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPlanes: 0,
    totalAlimentos: 0,
    planesActivos: 0,
    ultimoPlan: 'Ninguno'
  });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3000/plans'),
      axios.get('http://localhost:3000/foods')
    ]).then(([resPlanes, resAlimentos]) => {
      const planes = resPlanes.data;
      const alimentos = resAlimentos.data;
      
      const activos = planes.filter(p => p.status === 'Activo').length;
      const ultimo = planes.length > 0 ? planes[planes.length - 1].name : 'Ninguno';

      setStats({
        totalPlanes: planes.length,
        totalAlimentos: alimentos.length,
        planesActivos: activos,
        ultimoPlan: ultimo
      });
    }).catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-success">Resumen de NutriPlan</h2>
      
      <div className="row g-4">
        {/* Tarjeta 1: Total de Planes */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm h-100 border-success border-top border-3">
            <div className="card-body">
              <h5 className="card-title text-muted">Total de Planes</h5>
              <h2 className="display-5 fw-bold text-success">{stats.totalPlanes}</h2>
              <Link to="/planes" className="btn btn-sm btn-outline-success mt-2">Ver planes</Link>
            </div>
          </div>
        </div>

        {/* Tarjeta 2: Total de Alimentos */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm h-100 border-primary border-top border-3">
            <div className="card-body">
              <h5 className="card-title text-muted">Total de Alimentos</h5>
              <h2 className="display-5 fw-bold text-primary">{stats.totalAlimentos}</h2>
              <Link to="/alimentos" className="btn btn-sm btn-outline-primary mt-2">Ver alimentos</Link>
            </div>
          </div>
        </div>

        {/* Tarjeta 3: Planes Activos */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm h-100 border-warning border-top border-3">
            <div className="card-body">
              <h5 className="card-title text-muted">Planes Activos</h5>
              <h2 className="display-5 fw-bold text-warning">{stats.planesActivos}</h2>
            </div>
          </div>
        </div>

        {/* Tarjeta 4: Último Plan */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm h-100 border-info border-top border-3">
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title text-muted">Último Registrado</h5>
              <p className="fs-5 fw-bold text-info mb-0 text-truncate" title={stats.ultimoPlan}>
                {stats.ultimoPlan}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;