import { Routes, Route } from 'react-router-dom';
import History from './History';
import Navigation from './Navigation';

function App() {
  return (
    <div className="min-h-screen bg-gray-700 text-white">
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route path='history' element={<History />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
