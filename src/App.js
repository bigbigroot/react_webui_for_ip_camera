import './App.css';
import './pages.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import AppsPageNavbar from './myStyleNavbar';
import LoginForm from './login';
// import LivePlayer from './CameraDisplayer';

function App() {
  return (
    <div className="App">
      <header>
        <AppsPageNavbar />
      </header>
      <main className='App-main'>
        <LoginForm />
      </main>
    </div>
  );
}

export default App;
