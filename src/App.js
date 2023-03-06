import './App.css';
import React,{useRef} from 'react';
import Users from './Componets/Users';
import './App.css'
function App() {

  const bodyRef = useRef('')
  return (
    <main ref={bodyRef}>
      <Users bodyRef={bodyRef}/>
    </main>
  );
}

export default App;
