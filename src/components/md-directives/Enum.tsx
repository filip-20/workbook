import './Enum.module.scss';

export interface EnumProps {
  className?: string,
  children?: React.ReactNode,
}

const enumStyles = ['a', 'i', 'A', 'I'];

const Enum:React.FC<EnumProps> = ({children, className}) => (
   (className !== undefined
    && enumStyles.includes(className))
   ? <div className={`enum-${className}`}>{children}</div>
   : <>{`[unknown enum style ${className}]`}{children}</>
);

export default Enum;
