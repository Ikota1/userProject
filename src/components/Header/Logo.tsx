import classes from './Logo.module.css';

export default function Logo() {
  return (
    <div>
      <h1 className={classes.logo}>
        <span>U</span>sers <span>P</span>roject
      </h1>
    </div>
  );
}
