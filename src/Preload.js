import logo from './assets/prts.webp';
import './App.css';
import Typewriter from './Typewriter.component';
import { ClickableImage } from './ClickableImage.component';

function Preload() {
  return (
    <div className="App">
      <header className="App-header">
        <ClickableImage source={logo} />
        <h1>primitive_rhodesisland_terminal_service</h1>
        <Typewriter sentence="Connection: request"/>
      </header>
    </div>
  );
}

export default Preload;
