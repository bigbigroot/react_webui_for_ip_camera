import React from 'react';
import './App.css';
import MyStyleNavbar from './myStyleNavbar'
import LoginForm from './login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyStyleNavbar />
        <LoginForm />
      </header>
    </div>
  );
}

export default App;
