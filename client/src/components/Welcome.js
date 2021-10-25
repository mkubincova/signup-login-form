import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  const [errors, setErrors] = React.useState({});
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    fetch('/userInfo', { 
      method: "GET",
      headers: {
          'x-access-token': localStorage.getItem("token")
      }
    })
    .then((result) => result.json())
    .then((info) => { (info.hasOwnProperty("message")) ? setErrors(info) : setUser(info); })
  }, [])

  return (
    <div className="welcome">
      <h3>{errors.message ? errors.message : "Welcome " + user.name + "!"}</h3>
      <p className="redirect">{errors.message ? <Link to="/login">Login</Link> : user.email}</p>
    </div>
    
  );
}

export default Welcome;