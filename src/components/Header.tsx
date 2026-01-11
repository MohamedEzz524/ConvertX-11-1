import { Link } from 'react-router-dom';
import Button from './Button';
import logo from '../assets/Logo.png';

const Header = () => {
  return (
    <header className="header--border hidden items-center justify-between rounded-xl px-3 py-4 sm:flex md:px-5">
      <div className="mask pointer-events-none absolute inset-0 z-0 rounded-xl bg-[linear-gradient(170deg,rgba(255,155,165,0.6)_0%,rgba(134,44,53,0.6)_35%)] p-[2px]"></div>
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="block h-auto w-24 max-md:hidden md:w-32"
          draggable={false}
        />
      </Link>

      <div className="flex justify-between gap-3 max-md:flex-1 md:gap-5">
        <Button
          text="BOOK A CONSULTATION"
          link="/book-consultation"
          type="outline"
        />
        <Button text="START NOW" link="/getting-started" type="bulk" />
      </div>
    </header>
  );
};

export default Header;
