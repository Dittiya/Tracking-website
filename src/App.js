import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import History from './History';

function App() {
  return (
    <div className="min-h-screen bg-gray-700 text-white">
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route path='/' element={<Home />} />
          <Route path='history' element={<History />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
