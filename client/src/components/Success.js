import { Link } from 'react-router-dom';

function Success() {

  return (
    <div className="success">
      <h3>Your account was created successfully!</h3>
      <p className="redirect"><Link exact={true} to="/login">Login</Link></p>
    </div>
    
  );
}

export default Success;
