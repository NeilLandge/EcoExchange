import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddItem from './pages/AddItem';
import ItemDetails from './pages/ItemDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/item/:id" element={<ItemDetails />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      <footer className="w-full text-center py-4 text-gray-500 opacity-80">
        Developed by Neil Landge
      </footer>
    </Router>
  );
}

export default App;
