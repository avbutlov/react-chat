import React, {useState, useEffect} from "react";
import Login from "./components/login/login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import socket from "./socket";

function App() {

  const [users, setUsers] = useState({});



  useEffect(() => {
    socket.on('setUsers', newUsers => {
      setUsers(newUsers)
    })
  }, [])

  console.log(users)

  return (
    <div className="App">
      <Router>
        <Route path='/:id?' render={({match}) => {
          const { id } = match.params;
          return <Login roomLink={id}/>
        }}/>
        
      </Router>
    </div>
  );
}

export default App;
