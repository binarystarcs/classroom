import './App.css';
import { ReminderBar } from './components/ReminderBar';
import { Toolbar } from './components/Toolbar';

function App() {
  return (
    <div className="fullscreen">
      <ReminderBar/>
      <Toolbar/>
    </div>
  );
}

export default App;
