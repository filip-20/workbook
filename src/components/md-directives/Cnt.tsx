import classNames from 'classnames/dedupe';
import './Cnt.module.scss';

export interface CntProps {
  className?: string,
  children?: React.ReactNode,
  data?: string,
}

const counters = ['a', 'b', 'c', 'd', 'e'];
const ops = ['use', 'inc', 'reset', 'set', 'set-0'];

const Cnt:React.FC<CntProps> = ({className, children, data}) => (
  (children !== undefined
    && counters.includes((children ?? '').toString())
    && (className === undefined
        || className.trim().split(' ').every(c => ops.includes(c.trim()))
       ))
  ? <span
      className={classNames(`counter-${children}`, className)}
      {...(data !== undefined ? {data} : {})}
    />
  : <>{`[Unknown counter ${children} or operation ${className}]`}</>
)


export default Cnt;