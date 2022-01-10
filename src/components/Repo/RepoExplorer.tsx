import { useEffect, useRef } from "react";
import { Alert, Badge, Breadcrumb, Card, ListGroup, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { FileItem, openRepo, openFile, fetchFiles, selectRepoInfo, selectRepoState, selectStatus, closeRepo } from "../../store/repoExplorerSlice";
import { File, FolderFill } from 'react-bootstrap-icons';
import { BiGitBranch } from 'react-icons/bi'
import { BsCaretRightFill } from 'react-icons/bs'
import styles from './RepoExplorer.module.css';

export interface RepoExplorerProps {
  username: string,
  repo: string,
  branch?: string,
  path?: string,
  onPathChanged: (path: string, linkUrl: string) => void
  makeLink: (path: string, fileName: string, fileType: 'file' | 'dir', repo: string, branch: string) => string
}

function RepoExplorer(props: RepoExplorerProps) {
  const dispatch = useDispatch()
  const repoInfo = useAppSelector(selectRepoInfo);
  const repoState = useAppSelector(selectRepoState);
  const status = useAppSelector(selectStatus);

  const clickedLink = useRef('');

  useEffect(() => {
    dispatch(openRepo(props.username, props.repo, props.path, props.branch));
    return () => { dispatch(closeRepo()) };
  }, [props.username, props.repo]);

  useEffect(() => {
    console.log('redux path: ' + repoState?.path);
    console.log('prop path: ' + props.path);
    if (repoState && repoState.path !== props.path) {
      dispatch(fetchFiles(props.path || ''));
    }
  }, [props.path])

  useEffect(() => {
    if (repoState && props.path !== repoState.path && !(!props.path && repoState.path === '')) {
      props.onPathChanged(repoState.path, clickedLink.current);
    }
  }, [repoState?.path])

  const folderIcon = <FolderFill className={styles.itemIcon} />
  const fileIcon = <File className={styles.itemIcon} />

  if (!repoInfo || !repoState) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            <Spinner style={{ float: 'right' }} animation="border" />
          </Card.Title>
        </Card.Body>
      </Card>
    )
  } else {
    const renderPathbar = (currentPath: string) => {
      const items = [{
        name: repoInfo.repo,
        path: '',
        link: props.makeLink('', '', 'dir', repoInfo.repo, repoState.branch),
        active: '' === currentPath
      }];
      if (currentPath !== '') {
        let path = '';
        currentPath.split('/').forEach(item => {
          const p = path === '' ? item : `${path}/${item}`;
          items.push({
            name: item,
            path: p,
            link: props.makeLink(path, item, 'dir', repoInfo.repo, repoState.branch),
            active: p === currentPath,
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
                href={item.link}
                active={item.active}
                onClick={item.active ? undefined : (e => { e.preventDefault(); clickedLink.current = item.link; dispatch(fetchFiles(item.path)) })}
              >
                {item.name}
              </Breadcrumb.Item>
            ))
          }
        </Breadcrumb>
      )
    }

    const renderFileItem = (file: FileItem) => {
      let linkUrl: string;
      if (file.name === '..') {
        const reducer = (prev: string, current: string) => (prev === '' ? '' : prev + '/') + current;
        const path = repoState.path.split('/').slice(0, -2).reduce(reducer, '');
        const filename = repoState.path.split('/').slice(-2)[0]
        linkUrl = props.makeLink(path, filename, 'dir', repoInfo.repo, repoState.branch);
      } else {
        linkUrl = props.makeLink(repoState.path, file.name, file.type, repoInfo.repo, repoState.branch);
      }
      return (
        <ListGroup.Item className={styles.fileItem} key={file.name}>
          {file.type === 'file' ? fileIcon : folderIcon}
          <a
            href={linkUrl}
            className={styles.linkStyle}
            onClick={e => { e.preventDefault(); clickedLink.current = linkUrl; dispatch(openFile(file.name)) }}
          >
            {file.name}
          </a>
        </ListGroup.Item>
      )
    }

    let body;
    if (status.status === 'failed') {
      body = (
        <Alert variant="warning">
          Error: {status.error}
        </Alert>
      )
    } else {
      body = (
        <ListGroup variant="flush">
          {repoState.files.map((file) => renderFileItem(file))}
        </ListGroup>
      )
    }

    return (
      <Card>
        <Card.Header className="h5">
          <Badge><BiGitBranch />{repoState.branch}</Badge><BsCaretRightFill />
          {renderPathbar(repoState.path)}
          {status.status === 'loading' && <Spinner style={{ float: 'right' }} animation="border" />}
        </Card.Header>
        <Card.Body>
          {body}
        </Card.Body>
      </Card>
    )
  }
}

export default RepoExplorer;