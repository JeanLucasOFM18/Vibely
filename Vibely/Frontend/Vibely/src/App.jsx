import './App.css'
import { useState } from 'react';
import Home from './components/Home';
import Recommend from './components/Recommend';
import Footer from './components/Footer';

function App() {

  const [vista, setVista] = useState('home');
  const [response, setResponse] = useState(null); 

  return (
    <>
      {vista === 'home' && (
        <>
          <Home setVista={setVista} setResponse={setResponse}/>
          <Footer />
        </>
      )}
      {vista === 'recommend' && <Recommend setVista={setVista} response={response}/>}
    </>
  );
}

export default App
