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
      <h2 className="mb-4 text-success">Gestión de Planes Alimenticios</h2>
      
      {/* Formulario */}
      <div className="card p-3 mb-4 shadow-sm">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Nombre" required 
              value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Objetivo" required 
              value={form.objective} onChange={e => setForm({...form, objective: e.target.value})} />
          </div>
          <div className="col-md-2">
            <input type="number" className="form-control" placeholder="Calorías" required 
              value={form.calories} onChange={e => setForm({...form, calories: e.target.value})} />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="Duración" required 
              value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">Guardar</button>
          </div>
        </form>
      </div>

      {/* Búsqueda */}
      <input type="text" className="form-control mb-3" placeholder="Buscar plan por nombre..." 
        value={search} onChange={e => setSearch(e.target.value)} />

      {/* Tabla */}
      <table className="table table-bordered table-hover bg-white shadow-sm">
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
              <td>{plan.name}</td>
              <td>{plan.objective}</td>
              <td>{plan.calories} kcal</td>
              <td>{plan.duration}</td>
              <td><span className="badge bg-primary">{plan.status}</span></td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(plan.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Planes;