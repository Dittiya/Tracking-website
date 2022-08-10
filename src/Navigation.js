import { Outlet, Link } from 'react-router-dom';

function Navigation() {
  const routes = [
    ['Home', '/'],
    ['History', 'history'],
    ['Calculator', 'calculator']
  ];

  return (
    <div>
      <nav className='bg-gray-800 flex sm:justify-left space-x-4 pl-4'>
        {routes.map(([title, url]) => (
          <Link key={title} to={url} className='rounded-lg px-3 py-2 font-medium hover:bg-slate-100 hover:text-slate-900'>
            {title}
          </Link>
        ))}
      </nav>
      <Outlet />
      <footer className="bg-gray-700">
        <h1 className='text-gray-700'>Deez</h1>
      </footer>
    </div>
  );
}

export default Navigation;
