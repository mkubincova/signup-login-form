import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  const [errors, setErrors] = React.useState({});
  const [user, setUser] = React.useState({});

  //fetch user data
  React.useEffect(() => {
    fetch('/userInfo', { 
      method: "GET",
      headers: {
          'x-access-token': localStorage.getItem("token") //send jwt token with req
      }
    })
    .then((result) => result.json())
    //save error message or user information
    .then((info) => { (info.hasOwnProperty("message")) ? setErrors(info) : setUser(info); })
  }, [])

  return (
    <div className="welcome">
      {/* if there is error message display it, otherwise show user info */}
      <h3>{errors.message ? errors.message : "Welcome " + user.name + "!"}</h3>
      <p className="redirect">{errors.message ? <Link to="/login">Login</Link> : user.email}</p>
    </div>
    
  );
}

export default Welcome;