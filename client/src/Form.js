import React from 'react';
import validate from './validateInput';

function Form() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    let field = e.target.id;
    let value = e.target.value;
    if(field === "name"){
      setName(value);
    }else if(field === "email"){
      setEmail(value);
    }else if(field === "password"){
      setPassword(value)
    } 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name: name, email: email , password: password }
    const inputErr = validate(data)

    var isEmpty = Object.entries(inputErr).length === 0;

    if(!isEmpty){
        setErrors(inputErr)
    } else{
        fetch('/signup', { method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then((result) => result.json())
            .then((info) => { console.log(info.message); })
            
        setName("");
        setEmail("");
        setPassword("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="John" value={name} onChange={handleChange} className={errors.name ? "red" : null}/>
        <small>{errors.name ? errors.name : ""}</small>

        <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="john@gmail.com" value={email} onChange={handleChange} className={errors.email ? "red" : null}/>
        <small>{errors.email ? errors.email : ""}</small>

        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={handleChange} className={errors.password ? "red" : null}/>
        <small>{errors.password ? errors.password : ""}</small>

        <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
