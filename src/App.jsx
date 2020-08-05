import { h } from 'preact';
import useGears from './useGears';
import './App.css';

const WIDTH = 400;
const HEIGHT = 400;

function App() {
  const canvasRef = useGears();

  return (
    <div className="App">
      <header className="App-header">
        <h1>WebGL Gears</h1>
      </header>
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
    </div>
  );
}

export default App;
