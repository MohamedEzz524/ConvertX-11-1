import { Link } from 'react-router-dom';

type ButtonProps = {
  text: string;
  link: string;
  type: 'bulk' | 'outline';
  disabled?: boolean;
};

const Button = ({ text, type, link, disabled }: ButtonProps) => {
  const baseClasses = `${type === 'bulk' ? 'button-gradient bulk-btn' : 'outline-btn'}`;

  if (disabled) {
    return (
      <span
        className={`${baseClasses} pointer-events-none cursor-not-allowed text-[12px] font-bold opacity-50 sm:text-[16px] lg:text-[13px] xl:text-[16px]`}
        aria-disabled="true"
      >
        {text}
      </span>
    );
  }

  return (
    <Link
      to={link}
      className={`${baseClasses} pointer-events-auto text-[12px] font-bold sm:text-[16px] lg:text-[13px] xl:text-[16px]`}
    >
      {text}
    </Link>
  );
};

export default Button;
