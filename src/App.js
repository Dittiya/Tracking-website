import logo from './assets/prts.webp';
import './App.css';
import Typewriter from './Typewriter.component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="prts" />
        <h1>Call API</h1>
        <Typewriter text="Welcome, Doctor of Rhodes Island"/>
      </header>
    </div>
  );
}

export default App;
