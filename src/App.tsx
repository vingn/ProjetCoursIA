import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import DestinationsPage from './pages/DestinationsPage';
import Reservation from './pages/Reservation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
