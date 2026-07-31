import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login'; 
import Planes from './pages/Planes';
import Alimentos from './pages/Alimentos';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  if (isLoginPage) {
    return children; 
  }

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="content p-4 w-100">
          {children}
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/alimentos" element={<Alimentos />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;