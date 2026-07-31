import { useState, useEffect } from 'react';
import axios from 'axios';

const Planes = () => {
  const [planes, setPlanes] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', objective: '', calories: '', duration: '', status: 'Activo' });

  const fetchPlanes = () => {
    axios.get('http://localhost:3000/plans')
      .then(res => setPlanes(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchPlanes(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/plans', form).then(() => {
      fetchPlanes();
      setForm({ name: '', objective: '', calories: '', duration: '', status: 'Activo' });
    });
  };

  const handleDelete = (id) => {
    if(window.confirm('¿Eliminar este plan?')) {
      axios.delete(`http://localhost:3000/plans/${id}`).then(() => fetchPlanes());
    }
  };

  const planesFiltrados = planes.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

return (
    <div>
      <h2 className="mb-4 text-success fw-bold">Gestión de Planes Alimenticios</h2>
      
      {/* Formulario Mejorado */}
      <div className="card p-4 mb-4 shadow-sm border-top border-success border-3">
        <h5 className="mb-3 text-muted">Crear Nuevo Plan</h5>
        <form onSubmit={handleSubmit} className="row g-3">
          
          <div className="col-md-4">
            <label className="form-label fw-bold">Nombre del plan</label>
            <input type="text" className="form-control" placeholder="Ej: Plan pérdida de peso - Juan" required 
              value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Objetivo</label>
            <select className="form-select" required value={form.objective} onChange={e => setForm({...form, objective: e.target.value})}>
              <option value="">Seleccione objetivo...</option>
              <option value="Perder peso">Perder peso</option>
              <option value="Ganar masa muscular">Ganar masa muscular</option>
              <option value="Mantener peso">Mantener peso</option>
              <option value="Mejorar alimentación">Mejorar alimentación</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">
              Calorías diarias <span title="Cantidad de energía diaria. Ej: 1500 kcal para pérdida de peso." style={{cursor: 'help'}}>ℹ️</span>
            </label>
            <input type="number" className="form-control" placeholder="Ej: 1500" required min="1"
              value={form.calories} onChange={e => setForm({...form, calories: e.target.value})} />
            <div className="form-text text-muted" style={{ fontSize: '0.75rem' }}>Ej: 1500 kcal moderado / 2500 kcal muscular</div>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Duración</label>
            <select className="form-select" required value={form.duration} onChange={e => setForm({...form, duration: e.target.value})}>
              <option value="">Seleccione duración...</option>
              <option value="1 semana">1 semana</option>
              <option value="2 semanas">2 semanas</option>
              <option value="1 mes">1 mes</option>
              <option value="3 meses">3 meses</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Estado</label>
            <select className="form-select" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option value="Activo">Activo</option>
              <option value="Completado">Completado</option>
              <option value="Pausado">Pausado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className="col-md-4 d-flex align-items-end">
            <button type="submit" className="btn btn-success w-100 fw-bold">Guardar Plan</button>
          </div>
        </form>
      </div>

      {/* Búsqueda y Tabla */}
      <input type="text" className="form-control mb-3" placeholder="Buscar plan por nombre..." 
        value={search} onChange={e => setSearch(e.target.value)} />

      <div className="table-responsive">
        <table className="table table-bordered table-hover bg-white shadow-sm align-middle">
          <thead className="table-light">
            <tr>
              <th>Nombre</th>
              <th>Objetivo</th>
              <th>Calorías</th>
              <th>Duración</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {planesFiltrados.map(plan => (
              <tr key={plan.id}>
                <td className="fw-bold">{plan.name}</td>
                <td>{plan.objective}</td>
                <td>{plan.calories} kcal</td>
                <td>{plan.duration}</td>
                <td>
                  <span className={`badge ${plan.status === 'Activo' ? 'bg-success' : plan.status === 'Completado' ? 'bg-primary' : plan.status === 'Pausado' ? 'bg-warning' : 'bg-danger'}`}>
                    {plan.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(plan.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Planes;