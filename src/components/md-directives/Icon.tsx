import './Icon.css';

interface IconProps {
  className?: string,
  children?: React.ReactNode
}

const textColorClasses:RegExp = /^text-(primary|secondary|success|danger|warning|info|light|dark|body|muted|white)$/;

const Icon:React.FC<IconProps> = ({children: icon, className = ''}) => {
  let classes: Array<string> = className.trim().split(' ');

  if (!icon || icon === true) {
    return <>[Unspecified icon]</>
  }

  const iconName = icon.toString();
  let bsIcon = icon;

  if (Object.hasOwn(wbIcons, iconName)) {
    bsIcon = wbIcons[iconName].icon;
    if (!classes.some(c => textColorClasses.test(c))) {
      classes = [...classes, wbIcons[iconName].className]
    }
  }
  return (
    <span className={[`bi-${bsIcon}`, ...classes].join(' ')} />
  )
}

const wbIcons:{ [key: string]: {icon: string, className: string} } = {
  'explanation': {
    icon: 'lightbulb-fill',
    className: 'text-primary'
  },
  'info': {
    icon: 'info-circle-fill',
    className: 'text-primary'
  },
  'warning': {
    icon: 'exclamation-triangle-fill',
    className: 'text-warning'
  },
  'help': {
    icon: 'life-preserver',
    className: 'text-danger'
  },
  'question': {
    icon: 'question-circle-fill',
    className: 'text-primary'
  },
  'write': {
    icon: 'pen-fill',
    className: 'text-primary'
  },
  'tools': {
    icon: 'tools',
    className: 'text-primary'
  },
  'unknown': {
    icon: 'question-circle-fill',
    className: 'text-secondary'
  },
  'good': {
    icon: 'check-circle-fill',
    className: 'text-success'
  },
  'bad': {
    icon: 'x-circle-fill',
    className: 'text-danger'
  },
  'technical': {
    icon: 'gear-fill',
    className: 'text-primary'
  },
  'deadline': {
    icon: 'calendar-check-fill',
    className: 'text-primary'
  },
  'submission': {
    icon: 'file-earmark-arrow-up-fill',
    className: 'text-primary'
  },
  'source': {
    icon: 'book-half',
    className: 'text-primary'
  },
  'bonus': {
    icon: 'star-fill',
    className: 'text-warning'
  },
  'rules': {
    icon: 'asterisk',
    className: 'text-danger'
  },
}

export default Icon;
