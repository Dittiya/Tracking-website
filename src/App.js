// import './App.css';
import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-700 text-white">
      <nav className='bg-gray-800 flex sm:justify-left space-x-4 pl-4'>
        {[
          ['Home', ''],
          ['History', 'history'],
        ].map(([title, url]) => (
          <Link key={title} to={url} className='rounded-lg px-3 py-2 font-medium hover:bg-slate-100 hover:text-slate-900'>
            {title}
          </Link>
        ))}
      </nav>
      <Outlet />
      <footer className="bg-gray-700 text-gray-700">
        <h1>Deez</h1>
      </footer>
    </div>
  );
}

export default App;
