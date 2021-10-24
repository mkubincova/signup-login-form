import { Link } from 'react-router-dom';

function Failure() {

  return (
    <div className="failure">
      <h3>Oops, something went wrong with your request, please try again later.</h3>
      <p className="redirect"><Link exact={true} to="/">Signup</Link></p>
    </div>
    
  );
}

export default Failure;
