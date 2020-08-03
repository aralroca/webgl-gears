import { h } from 'preact';
import './App.css'

const WIDTH = 400
const HEIGHT = 400

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WebGL Gears</h1>
      </header>
      <canvas width={WIDTH} height={HEIGHT} />
    </div>
  );
}

export default App;
