import { Alert, Card, ListGroup, Spinner } from "react-bootstrap";
import { File, FolderFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import Pathbar from "./Pathbar";
import { ContentDirectory, ReposGetContentApiResponse, useReposGetContentQuery, useReposGetQuery } from "../../services/githubApi/endpoints/repos";
import BranchSelect from "./BranchSelect";
import { displayLoadable } from "./displayLoadable";

import styles from './styles.module.css';

export interface RepoExplorerProps {
  owner: string,
  repo: string,
  branch?: string,
  path: string,
  makeLink: (path: string, fileType: 'file' | 'dir', repo: string, branch?: string) => string
}

type FileItem = {
  name: string,
  type: 'file' | 'dir',
};

function RepoExplorer(props: RepoExplorerProps) {
  const { owner, repo, branch, path, makeLink } = props;

  const repoInfo = useReposGetQuery({ owner, repo }, { skip: branch !== undefined });
  const content = useReposGetContentQuery({ owner, repo, ref: branch, path }, { skip: branch === undefined && !repoInfo.isSuccess });

  const folderIcon = <FolderFill className={styles.itemIcon} />
  const fileIcon = <File className={styles.itemIcon} />

  const loading = <div style={{ width: '100%', textAlign: 'center' }}><Spinner animation="grow" role="status" /></div>
  const err = (message: string) => {
    return <Alert variant="danger">{message}</Alert>
  }
  const renderFileItem = (file: FileItem) => {
    let linkUrl: string;
    const b = branch || repoInfo.data!.default_branch
    if (file.name === '..') {
      const reducer = (prev: string, current: string) => (prev === '' ? '' : prev + '/') + current;
      const p = path.split('/').slice(0, -1).reduce(reducer, '');
      linkUrl = props.makeLink(p, 'dir', repo, b);
    } else {
      const p = path === '' ? file.name : `${path}/${file.name}`;
      linkUrl = props.makeLink(p, file.type, repo, b);
    }
    return (
      <ListGroup.Item className={styles.fileItem} key={file.name}>
        {file.type === 'file' ? fileIcon : folderIcon}
        <Link className={styles.linkStyle} to={linkUrl}>{file.name}</Link>
      </ListGroup.Item>
    )
  }

  const renderFiles = (data: ReposGetContentApiResponse) => {
    let files = [];
    if (path !== '') {
      files.push({ name: '..', type: 'dir' });
    }
    try {
      files.push(...data as ContentDirectory);
    } catch (e) {
      return err('Toto nie je priečinok');
    }
    type FileItem2 = { name: string, type: string };
    const cmp = (f1: FileItem2, f2: FileItem2) => {
      if (f1.type === f2.type) {
        return f1.name.localeCompare(f2.name)
      } else {
        // folders before files
        return f1.type === 'dir' ? -1 : 1;
      }
    }
    files.sort(cmp);
    return <ListGroup variant="flush">{files.map((file) => renderFileItem({ name: file.name, type: file.type === 'file' ? 'file' : 'dir' }))}</ListGroup>
}

return (
  <Card>
    <Card.Header className="h5">
      <BranchSelect owner={owner} repo={repo} path={path} branch={branch} makeLink={makeLink} />
      <Pathbar style={{marginLeft: '1rem'}} repoName={repo} branch={branch} path={path} makeLink={makeLink} />
    </Card.Header>
    <Card.Body>
      {displayLoadable(content, loading, renderFiles, () => err('Načítanie súborov zlyhalo'))}
    </Card.Body>
  </Card>
)
}

export default RepoExplorer;