import AST from "react-markdown/lib/ast-to-react";

interface XRefProps {
    id?: string,
    className?: string,
    label?: string,
    children?: React.ReactNode,
    node?: AST.Element,
  }
  
  const XRef:React.FC<XRefProps> =
    ({className = '', label, children, node, ...props}) => {
      const id = (children || '').toString();
      const classes = className.trim().split(' ');
      const base = classes.find(c => Object.hasOwn(wbXRefBases, c));
      const otherClasses = classes.filter(
        (c) => c !== base && c !== 'hide-id'
      );
      return ((id === '' || base === undefined)
        ? <>{'[source link with no id or unknown base]'}</>
        : <WbXRef
            id={id}
            label={label}
            hideId={classes.includes('hide-id')}
            base={wbXRefBases[base]}
            className={otherClasses.join(' ')}
            {...props}
          />
      );
  }

interface WbXRefProps {
  id: string,
  hideId?: boolean,
  label?: string,
  base: string,
  className: string,
}

const WbXRef:React.FC<WbXRefProps> =
  ({id, hideId, label, base, ...props}) =>
    <a href={`${base}${id}`} {...props}>
      {label}{label ? '\u00a0' : ''}{hideId || id}
    </a>

const wbXRefBases:{ [key: string]: string } = {
  'exbook': 'https://fmfi-uk-1-ain-412.github.io/lpi/teoreticke-ain/zbierka.pdf#exparagraph.',
  'lec': 'https://fmfi-uk-1-ain-412.github.io/lpi/prednasky/poznamky-z-prednasok.pdf#theorem.'
}

export default XRef;
