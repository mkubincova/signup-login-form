import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Login() {
  let history = useHistory();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    let field = e.target.id;
    let value = e.target.value;
    if(field === "email"){
      setEmail(value);
    }else if(field === "password"){
      setPassword(value)
    } 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {email: email , password: password }
    
    fetch('/login', { method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then((result) => result.json())
        .then((info) => { 
          if(info.hasOwnProperty("message")){
            setErrors(info);
          } else {
            localStorage.setItem("token", info.token)
            history.push("/welcome");
          }
        })
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="john@gmail.com" value={email} onChange={handleChange} className={errors.email ? "red" : null}/>

        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={handleChange} className={errors.password ? "red" : null}/>
        <br/>
        <small>{errors.message ? errors.message : ""}</small>

        <button type="submit">Submit</button>
      </form>
      <p className="redirect">No account yet? <Link exact={true} to="/">Signup</Link></p>
    </div>
  );
}

export default Login;
