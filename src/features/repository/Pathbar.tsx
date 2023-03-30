import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from './styles.module.css';

export interface PathbarProps {
  className?: string,
  owner: string,
  repoName: string,
  branch?: string,
  path: string,
  makeLink: (path: string, fileType: 'file' | 'dir', owner: string, repo: string, branch?: string) => string
}

function Pathbar(props: PathbarProps) {
  const items = [{
    name: props.repoName,
    path: '',
    link: props.makeLink('', 'dir', props.owner, props.repoName, props.branch),
    active: '' === props.path
  }];
  if (props.path !== '') {
    let path = '';
    props.path.split('/').forEach(item => {
      const p = path === '' ? item : `${path}/${item}`;
      path += path === '' ? item : '/' + item
      items.push({
        name: item,
        path: p,
        link: props.makeLink(path, 'dir', props.owner, props.repoName, props.branch),
        active: p === props.path,
      });
    });
  }

  return (
    <Breadcrumb className={`${styles.pathBreadcrumb} d-inline-block ${props.className ?? ""}`}>
      {
        items.map(item => (
          <Breadcrumb.Item
            key={item.path}
            className={item.active ? '' : styles.linkStyle}
            linkAs={Link} linkProps={{ to: item.link }}
            active={item.active}
          >
            {item.name}
          </Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  )
}

export default Pathbar;