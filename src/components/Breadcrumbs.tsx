import { Link } from 'react-router-dom';

const Breadcrumbs = ({ text }: { text: string }) => {
  return (
    <div className="text-base text-white">
      <Link to="/" className="text-accentPrimary underline underline-offset-2">
        Home
      </Link>{' '}
      / {text}
    </div>
  );
};

export default Breadcrumbs;
