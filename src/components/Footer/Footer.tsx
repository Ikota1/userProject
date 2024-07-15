import Logo from '../Header/Logo';
import classes from './Footer.module.css';

export default function Footer() {
  return (
    <div className={classes.footer}>
      <Logo />
      <h5>COPYRIGHT © 2024 USERS PROJECT</h5>
    </div>
  );
}
