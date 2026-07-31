import { useState, useEffect } from 'react';
import axios from 'axios';

const Alimentos = () => {
  const [alimentos, setAlimentos] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', category: 'Proteína', calories: '', protein: '', carbohydrates: '', fat: '' });

  const fetchAlimentos = () => {
    axios.get('https://nutriplan-11f4.onrender.com/foods')
      .then(res => setAlimentos(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchAlimentos(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://nutriplan-11f4.onrender.com/foods', form).then(() => {
      fetchAlimentos();
      setForm({ name: '', category: 'Proteína', calories: '', protein: '', carbohydrates: '', fat: '' });
    });
  };

  const handleDelete = (id) => {
    if(window.confirm('¿Eliminar este alimento?')) {
      axios.delete(`https://nutriplan-11f4.onrender.com/foods/${id}`).then(() => fetchAlimentos());
    }
  };

  const alimentosFiltrados = alimentos.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h2 className="mb-4 text-success">Gestión de Alimentos</h2>
      
      <div className="card p-3 mb-4 shadow-sm">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="Nombre" required 
              value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div className="col-md-2">
            <select className="form-select" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option value="Proteína">Proteína</option>
              <option value="Carbohidrato">Carbohidrato</option>
              <option value="Grasa">Grasa</option>
              <option value="Vegetal">Vegetal</option>
              <option value="Fruta">Fruta</option>
            </select>
          </div>
          <div className="col-md-2">
            {/* Se agregó min="0" aquí */}
            <input type="number" className="form-control" placeholder="Calorías" required min="0"
              value={form.calories} onChange={e => setForm({...form, calories: e.target.value})} />
          </div>
          <div className="col-md-2">
            {/* Se agregó min="0" aquí */}
            <input type="number" className="form-control" placeholder="Prot (g)" required min="0"
              value={form.protein} onChange={e => setForm({...form, protein: e.target.value})} />
          </div>
          <div className="col-md-2">
            {/* Se agregó min="0" aquí */}
            <input type="number" className="form-control" placeholder="Carb (g)" required min="0"
              value={form.carbohydrates} onChange={e => setForm({...form, carbohydrates: e.target.value})} />
          </div>
          <div className="col-md-2">
            {/* Se agregó min="0" aquí */}
            <input type="number" className="form-control" placeholder="Grasa (g)" required min="0"
              value={form.fat} onChange={e => setForm({...form, fat: e.target.value})} />
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success fw-bold">Agregar Alimento</button>
          </div>
        </form>
      </div>

      <input type="text" className="form-control mb-3" placeholder="Buscar alimento por nombre..." 
        value={search} onChange={e => setSearch(e.target.value)} />

      <table className="table table-bordered table-hover bg-white shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Calorías</th>
            <th>Proteínas (g)</th>
            <th>Carbohidratos (g)</th>
            <th>Grasas (g)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alimentosFiltrados.map(alimento => (
            <tr key={alimento.id}>
              <td>{alimento.name}</td>
              <td><span className="badge bg-secondary">{alimento.category}</span></td>
              <td>{alimento.calories}</td>
              <td>{alimento.protein}</td>
              <td>{alimento.carbohydrates}</td>
              <td>{alimento.fat}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(alimento.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alimentos;