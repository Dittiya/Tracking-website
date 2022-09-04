import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import History from './History';
import Counter from './Counter';

function App() {
  return (
    <div className="min-h-screen bg-gray-700 text-white">
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route path='/' element={<Home />} />
          <Route path='history' element={<History />} />
          <Route path='calculator' element={<Counter />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
