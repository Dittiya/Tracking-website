import logo from './assets/prts.webp';
import './App.css';
import Typewriter from './Typewriter.component';
import { ClickableImage } from './ClickableImage.component';
import { Link } from 'react-router-dom';

function Preload() {
  return (
    <div className="App">
      <header className="App-header">
        <ClickableImage source={logo} />
        <h1>primitive_rhodesisland_terminal_service</h1>
        <Typewriter sentence="Connection: request"/>
        <Link to="history">History</Link>
      </header>
    </div>
  );
}

export default Preload;
