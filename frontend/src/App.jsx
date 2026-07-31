import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login'; 
import Planes from './pages/Planes';
import Alimentos from './pages/Alimentos';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('nutriplan_user');
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  if (isLoginPage) {
    return children; 
  }

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <Navbar />
      <div className="d-flex flex-grow-1 overflow-hidden">
        <Sidebar />
        <main className="flex-grow-1 p-4 bg-white overflow-auto m-3 rounded shadow-sm border">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/alimentos" element={<Alimentos />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;