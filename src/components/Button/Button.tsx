import { Link } from 'react-router-dom';
import classes from './Button.module.css';

interface ButtonProps {
  link: string;
  title: string;
  onClick?: () => void;
}

export default function Button({ link, title, onClick }: ButtonProps) {
  return (
    <Link to={link} className={classes.button} onClick={onClick}>
      {title}
    </Link>
  );
}
