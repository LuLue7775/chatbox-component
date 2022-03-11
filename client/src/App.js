import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { ContactsProvider } from "./contexts/ContactsProvider";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [id, setId] = useLocalStorage('id', '')


  return (
    id 
    ?     
      <ContactsProvider>
        <Dashboard id={id}/>
      </ContactsProvider>
   : <Login onIdSubmit={setId} />

  );
}

export default App;
