import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} className="mx-auto w-35" alt="logo" />
    </Link>
  );
};

export default Logo;
