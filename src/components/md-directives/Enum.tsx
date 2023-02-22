import React from 'react';
import styles from './Enum.module.scss';

export interface EnumProps {
  className?: string,
  children?: React.ReactNode,
}

const Enum:React.FC<EnumProps> = ({children, className}) => (
  (className !== undefined
    && Object.hasOwn(styles, className))
  ? <div className={`${styles[className]}`}>{children}</div>
  : <>{`[unknown enum style ${className}]`}{children}</>
);

export default Enum;
