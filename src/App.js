import Tree from './components/tree/tree';
import './App.css';

function App() {
  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Nested JSON Viewer</h1>
      </header>
      <section id='content'>
        <Tree />
      </section>
      <footer>
        By Payam Jalili |{' '}
        <a href='mailto:payam.jalilii@gmail.com'>Payam.jalilii@gmail.com</a>
      </footer>
    </div>
  );
}

export default App;
