import './App.css';
import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div className="container bg-gray-700 text-white h-screen">
      <nav className='bg-gray-800 flex sm:justify-left space-x-4 pl-4'>
        {[
          ['Home', ''],
          ['History', 'history'],
        ].map(([title, url]) => (
          <Link to={url} className='rounded-lg px-3 py-2 font-medium hover:bg-slate-100 hover:text-slate-900'>
            {title}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
