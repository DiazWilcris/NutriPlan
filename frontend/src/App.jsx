import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="content p-4 w-100">
          <Routes>
            <Route path="/" element={<h1>NutriPlan Inicio</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;