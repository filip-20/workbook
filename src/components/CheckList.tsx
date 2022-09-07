import { useRef, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { BsCheckSquare, BsSquare } from "react-icons/bs";

export interface CheckListProps {
  children: React.ReactElement<CheckListItemProps>[],
  checked?: string[],
  onCheckedChange?: (checked: string[]) => void
}

export interface CheckListItemProps {
  children: JSX.Element | string,
  name: string,
  checked?: boolean,
  onToggle?: (checked: boolean) => void
}

function CheckList(props: CheckListProps) {
  const checkedList = useRef<{ [key: string]: boolean }>(props.checked ? props.checked.reduce((p, c) => Object.assign(p, { [c]: true }), {}) : {});
  return <ListGroup variant="flush">
    {
      props.children.map(c => {
        if (checkedList.current[c.props.name] === undefined) {
          checkedList.current[c.props.name] = c.props.checked || false;
        }
        const _c = checkedList.current[c.props.name];

        const _t = c.props.onToggle;
        const onToggle = (checked: boolean) => {
          checkedList.current[c.props.name] = checked;
          props.onCheckedChange && props.onCheckedChange(Object.entries(checkedList.current).filter(v => v[1] === true).map(v => v[0]));
          _t && _t(checked);
        }
        return <CheckListItem {...c.props} key={c.props.name} checked={_c} onToggle={onToggle} />
      })
    }
  </ListGroup>
}

function CheckListItem(props: CheckListItemProps) {
  const [checked, setChecked] = useState(props.checked || false)

  const handleClick = async () => {
    let c = await new Promise<boolean>((resolve => {
      setChecked(prev => {resolve(!prev); return !prev})
    }));
    props.onToggle && props.onToggle(c);
  }

  return (
    <ListGroup.Item action onClick={handleClick}>
      {checked ? <BsCheckSquare className="me-2" /> : <BsSquare className="me-2" />}
      {props.children}
    </ListGroup.Item>
  )
}

export default Object.assign(CheckList, { Item: CheckListItem })
