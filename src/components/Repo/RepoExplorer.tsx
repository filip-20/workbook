import { useEffect, useRef } from "react";
import { Alert, Badge, Breadcrumb, Card, ListGroup, Nav, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { FileItem, openRepo, openFile, fetchFiles, selectRepoInfo, selectRepoState, selectStatus, closeRepo } from "../../store/repoExplorerSlice";
import { File, FolderFill } from 'react-bootstrap-icons';
import { BiGitBranch } from 'react-icons/bi';
import { BsCaretRightFill } from 'react-icons/bs';
import styles from './RepoExplorer.module.css';
import { Link } from "react-router-dom";
import RepoPathbar from "./RepoPathbar";

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
    const renderFileItem = (file: FileItem) => {
      let linkUrl: string;
      if (file.name === '..') {
        const reducer = (prev: string, current: string) => (prev === '' ? '' : prev + '/') + current;
        const path = repoState.path.split('/').slice(0, -2).reduce(reducer, '');
        const filename = repoState.path.split('/').slice(-2)[0];
        linkUrl = props.makeLink(path, filename, 'dir', repoInfo.repo, repoState.branch);
      } else {
        linkUrl = props.makeLink(repoState.path, file.name, file.type, repoInfo.repo, repoState.branch);
      }
      return (
        <ListGroup.Item className={styles.fileItem} key={file.name}>
          {file.type === 'file' ? fileIcon : folderIcon}
          <Link className={styles.linkStyle} to={linkUrl}>{file.name}</Link>
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
          <RepoPathbar repoName={props.repo} branch={repoState.branch} path={repoState.path} makeLink={props.makeLink} />
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