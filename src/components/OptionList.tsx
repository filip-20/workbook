import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { BsCheckCircle, BsCircle } from "react-icons/bs";

export interface OptionsListProps {
  children: React.ReactElement<OptionsListItemProps>[],
  selected: string,
  onSelectedChange?: (selected: string) => void
}

export interface OptionsListItemProps {
  children: JSX.Element | string,
  name: string,
  selected?: boolean,
  onSelected?: (name: string) => void
}

function OptionsList(props: OptionsListProps) {
  const [selected, setSelected] = useState(props.selected);
  useEffect(() => {
    props.onSelectedChange && props.onSelectedChange(selected);
  }, [selected])
  return <ListGroup variant="flush">
    {
      props.children.map(c => {
        const _s = c.props.onSelected;
        const onSelected = (name: string) => {
          setSelected(name);
          _s && _s(name);
        }
        return <OptionsListItem {...c.props} key={c.props.name} selected={c.props.name === selected} onSelected={onSelected} />
      })
    }
  </ListGroup>
}

function OptionsListItem(props: OptionsListItemProps) {
  return (
    <ListGroup.Item action onClick={() => props.onSelected && props.onSelected(props.name)}>
      {props.selected === true ? <BsCheckCircle className="me-2" /> : <BsCircle className="me-2" />}
      {props.children}
    </ListGroup.Item>
  )
}

export default Object.assign(OptionsList, { Item: OptionsListItem })
