import classNames from 'classnames/dedupe';
import styles from './Cnt.module.scss';

export interface CntProps {
  className?: string,
  children?: React.ReactNode,
}

const Cnt:React.FC<CntProps> = ({className = '', children}) => {
  const counter = (children ?? '').toString();

  const classes = [
    `cnt-${counter}`,
    ...className.trim().split(' ').filter(c => c !== '')
  ];

  return (
    classes.every(c => Object.hasOwn(styles, c))
    ? <span
        className={classNames([...classes.map(c => styles[c])])}
      />
    : <>{`[Unknown counter ${children} or operation ${className}]`}</>
  );
}


export default Cnt;