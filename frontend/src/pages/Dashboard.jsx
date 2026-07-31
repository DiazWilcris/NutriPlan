import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPlanes: 0,
    totalAlimentos: 0,
    planesActivos: 0,
    ultimoPlan: 'Ninguno'
  });
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get('https://nutriplan-11f4.onrender.com/plans'),
      axios.get('https://nutriplan-11f4.onrender.com/foods')
    ]).then(([resPlanes, resAlimentos]) => {
      const planes = resPlanes.data;
      const alimentos = resAlimentos.data;
      
      setStats({
        totalPlanes: planes.length,
        totalAlimentos: alimentos.length,
        planesActivos: planes.filter(p => p.status === 'Activo').length,
        ultimoPlan: planes.length > 0 ? planes[planes.length - 1].name : 'Ninguno'
      });

      const categorias = {};
      alimentos.forEach(a => {
        categorias[a.category] = (categorias[a.category] || 0) + 1;
      });

      setChartData({
        labels: Object.keys(categorias),
        datasets: [{
          data: Object.values(categorias),
          backgroundColor: ['#198754', '#0d6efd', '#ffc107', '#dc3545', '#0dcaf0'],
          borderWidth: 1,
        }]
      });
    }).catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-success fw-bold">Resumen de NutriPlan</h2>
      
      <div className="row g-4 mb-5">
        {/* Tarjetas de estadísticas */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm h-100 border-success border-top border-3">
            <div className="card-body">
              <h5 className="card-title text-muted">Total de Planes</h5>
              <h2 className="display-5 fw-bold text-success">{stats.totalPlanes}</h2>
              <Link to="/planes" className="btn btn-sm btn-outline-success mt-2">Ver planes</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm h-100 border-primary border-top border-3">
            <div className="card-body">
              <h5 className="card-title text-muted">Total de Alimentos</h5>
              <h2 className="display-5 fw-bold text-primary">{stats.totalAlimentos}</h2>
              <Link to="/alimentos" className="btn btn-sm btn-outline-primary mt-2">Ver alimentos</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm h-100 border-warning border-top border-3">
            <div className="card-body">
              <h5 className="card-title text-muted">Planes Activos</h5>
              <h2 className="display-5 fw-bold text-warning">{stats.planesActivos}</h2>
            </div>
          </div>
        </div>
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

      {/* Gráfico de Categorías */}
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-sm p-4">
            <h5 className="text-center text-muted mb-4">Distribución de Alimentos por Categoría</h5>
            {chartData ? <Doughnut data={chartData} /> : <p className="text-center">Cargando gráfico...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;