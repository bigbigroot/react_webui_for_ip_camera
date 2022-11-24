import './App.css';
import './pages.css'
import '@fontsource/roboto'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import {AppsPageNavbar} from './myStyleNavbar';
import {LoginPage} from './login';
import {CameraPage} from './CameraDisplayer';

function App() {
  return (
    <div className="App">
      <header>
        <AppsPageNavbar />
      </header>
      <main>
        <CameraPage />
      </main>
    </div>
  );
}

export default App;
