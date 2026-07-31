import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email === 'wilcris@nutriplan.com' && password === '12345') {
      const user = { nombre: 'Wilcris Díaz', rol: 'Administrador' };
      localStorage.setItem('nutriplan_user', JSON.stringify(user));
      navigate('/dashboard');
    } else if (email === 'usuario@nutriplan.com' && password === '12345') {
      const user = { nombre: 'Usuario Paciente', rol: 'Cliente' };
      localStorage.setItem('nutriplan_user', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      setError('Credenciales incorrectas. Intenta con wilcris@nutriplan.com y clave 12345');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm border-top border-success border-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4 fw-bold text-success">NutriPlan</h2>
        
        {error && <div className="alert alert-danger text-center p-2">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-success w-100 fw-bold">
            Iniciar sesión
          </button>
        </form>
        <div className="text-center mt-3 text-muted" style={{ fontSize: '0.85rem' }}>
          <p className="mb-0">Solo personal autorizado.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;