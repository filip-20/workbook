import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from './RepoExplorer.module.css';

export interface RepoPathbarProps {
  repoName: string,
  branch: string,
  path: string,
  makeLink: (path: string, fileName: string, fileType: 'file' | 'dir', repo: string, branch: string) => string
}

function RepoPathbar(props: RepoPathbarProps) {
  const items = [{
    name: props.repoName,
    path: '',
    link: props.makeLink('', '', 'dir', props.repoName, props.branch),
    active: '' === props.path
  }];
  if (props.path !== '') {
    let path = '';
    props.path.split('/').forEach(item => {
      const p = path === '' ? item : `${path}/${item}`;
      items.push({
        name: item,
        path: p,
        link: props.makeLink(path, item, 'dir', props.repoName, props.branch),
        active: p === props.path,
      });
      path += path === '' ? item : '/' + item
    });
  }

  return (
    <Breadcrumb className={styles.pathBreadcrumb} style={{ display: 'inline-block' }}>
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

export default RepoPathbar;