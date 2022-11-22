import { Alert, Badge, Card, ListGroup, Placeholder, Spinner } from "react-bootstrap";
import { File, FolderFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import Pathbar from "./Pathbar";
import { ContentDirectory, ReposGetContentApiResponse, useReposGetContentQuery, useReposGetQuery, useReposListBranchesQuery } from "../../api/githubApi/endpoints/repos";
import BranchSelect from "./BranchSelect";
import { displayLoadable } from "./displayLoadable";

import styles from './styles.module.css';
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { BsSlashCircle } from "react-icons/bs";
import { HiDocumentAdd } from 'react-icons/hi'
import CreateFileButton from "./CreateFileButton";
import { useRef } from "react";
import { emptySheet } from "../sheet/slice/sheetSlice";
import { getSessionBranchName } from "../sheetStorage/github/githubStorage";

export interface RepoExplorerProps {
  owner: string,
  repo: string,
  branch?: string,
  path: string,
  makeLink: (path: string, fileType: 'file' | 'dir', owner: string, repo: string, branch?: string) => string
  transformFileItem?: (path: string, fileType: 'file' | 'dir') => { changeIcon?: JSX.Element }
}

type FileItem = {
  name: string,
  type: 'file' | 'dir',
};

function isEmptyRepoError(error: any) {
  type github404response = {
    status: number,
    data: {
      message: string,
      documentation_url: string,
    }
  }
  let githubErrResponse;
  try {
    githubErrResponse = error as github404response
  } catch (e) {
    return false;
  }
  if (githubErrResponse
    && githubErrResponse.status === 404
    && githubErrResponse.data.message === 'This repository is empty.') {
    return true;
  }
  return false;
}

export function pathURIEncode(path: string) {
  return path.split('/').map(p => encodeURIComponent(p)).reduce((p, c) => `${p}/${c}`);
}

function RepoExplorer(props: RepoExplorerProps) {
  const { owner, repo, path, makeLink, transformFileItem } = props;
  let { branch } = props;

  const repoInfo = useReposGetQuery({ owner, repo }, { skip: branch !== undefined });
  const branches = useReposListBranchesQuery({ owner, repo, perPage: 100 }, { skip: branch === undefined && !repoInfo.isSuccess });
  const content = useReposGetContentQuery({ owner, repo, ref: branch, path: pathURIEncode(path) }, { skip: branch === undefined && !repoInfo.isSuccess && !branches.isSuccess });


  console.log('repo explorer');
  console.log(content)

  const existingFilenames = useRef<Set<string>>(new Set());
  
  if (repoInfo.isSuccess && !branch) {
    branch = repoInfo.data.default_branch;
  }

  const folderIcon = <FolderFill />
  const fileIcon = <File />

  const loading = <div style={{ width: '100%', textAlign: 'center' }}><Spinner animation="grow" role="status" /></div>
  const err = (message: string) => {
    return <Alert variant="danger">{message}</Alert>
  }

  const emptyOrError = (error: FetchBaseQueryError | SerializedError) => {
    if (isEmptyRepoError(error)) {
      return (
        <div className="text-center text-muted">
          <BsSlashCircle style={{ margin: '5em', marginBottom: '2em' }} size={'10em'} />
          <h3>Prázdny repozitár</h3>
        </div>
      )
    }
    return err('Načítanie súborov zlyhalo');
  }

  const renderFileItem = (file: FileItem) => {
    let filePath: string;

    if (file.name === '..') {
      const reducer = (prev: string, current: string) => (prev === '' ? '' : prev + '/') + current;
      filePath = path.split('/').slice(0, -1).reduce(reducer, '');
    } else {
      filePath = path === '' ? file.name : `${path}/${file.name}`;
    }
    const link = makeLink(filePath, file.type, owner, repo, branch);
    let icon = file.type === 'file' ? fileIcon : folderIcon

    const unsavedChanges = () => {
      const branchList = branches.data;
      const expectedSessionBranchName = getSessionBranchName({owner, repo, path: filePath, ref: branch || ''});
      return branchList?.find(b => b.name == expectedSessionBranchName) !== undefined;
    }

    if (transformFileItem) {
      let { changeIcon } = transformFileItem(filePath, file.type);
      if (changeIcon) {
        icon = changeIcon;
      }
    }

    if (content.isFetching) {
      return (
        <ListGroup.Item className={styles.fileItem} key={file.name}>
        <span className={styles.itemIcon}>{icon}</span>
        <Placeholder xs={1} bg="secondary" />
      </ListGroup.Item>
      )
    }

    return (
      <ListGroup.Item className={styles.fileItem} key={file.name}>
        <span className={styles.itemIcon}>{icon}</span>
        {link ? <Link className={styles.linkStyle} style={{marginRight: '1em'}} to={link}>{file.name}</Link> : file.name}
        {unsavedChanges() && <Badge pill bg="secondary">unmerged</Badge>}
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

    existingFilenames.current.clear();
    for (const item of files) {
      existingFilenames.current.add(item.name);
    }

    return <ListGroup variant="flush">{files.map((file) => renderFileItem({ name: file.name, type: file.type === 'file' ? 'file' : 'dir' }))}</ListGroup>
  }

  return (
    <Card>
      <Card.Header className="h5">
        <BranchSelect owner={owner} repo={repo} path={path} branch={branch} makeLink={makeLink} />
        <Pathbar style={{ marginLeft: '1rem' }} owner={owner} repoName={repo} branch={branch} path={path} makeLink={makeLink} />
        <div style={{ float: 'right' }}>
          <CreateFileButton
            owner={owner} repo={repo} path={path} branch={branch}
            existingFilenames={existingFilenames.current}
            transformFilename={(filename: string) => `${filename}.workbook`}
            commitMessage="new workbook"
            withContent={JSON.stringify(emptySheet)}
          >
            <HiDocumentAdd /> Vytvoriť zošit
          </CreateFileButton>
        </div>
      </Card.Header>
      <Card.Body>
        {displayLoadable(content, loading, renderFiles, emptyOrError)}
      </Card.Body>
    </Card>
  )
}

export default RepoExplorer;