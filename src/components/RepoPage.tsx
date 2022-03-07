import { Alert, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { selectUser } from "../store/authSlice";
import { useAppSelector } from "../store/hooks";
import RepoExplorer from "./Repo/RepoExplorer";


/**
 *  Parses part of URL that folows repo. 
 *  If branch name contains slashes, it is put between colons which can't be in branch name.  
 *  @see https://git-scm.com/docs/git-check-ref-format
 */
function parseGithubUrlPath(urlPath: string): {branch?: string, type: 'file' | 'dir', path: string} | {error: 'invalid_path'} {
  if (urlPath === '') {
    return { type: 'dir', path: ''};
  } else {
    const _type = urlPath.slice(0, 5);
    const rest = urlPath.slice(5);
    let type: 'file' | 'dir';
    if (_type === 'tree/') {
      type = 'dir';
    } else if (_type === 'blob/') {
      type = 'file';
    } else {
      return { error: 'invalid_path' }
    }
    let branch, path;
    if (rest.charAt(0) === ':') {
      const m = rest.match(/^:([^:]+):\//);
      if (!(m && m.length === 2)) {
        return { error: 'invalid_path' }
      }
      branch = m[1];
      path = rest.slice(branch.length + 3);
    } else {
      branch = rest.split('/')[0];
      path = rest.slice(branch.length + 1);
    }
    return {branch, type, path};
  }
}

function RepoPage() {
  const user = useAppSelector(selectUser);
  const params = useParams();

  const makeLink = (path: string, fileType: 'file' | 'dir', repo: string, branch?: string) => {
    const type = fileType === 'file' ? 'blob' : 'tree';
    let bPart = '';
    if (branch) {
      bPart = branch.includes('/') ? `:${branch}:/` : `${branch}/`;
    }
    return `/repo/${repo}/${type}/${bPart}${path}`;
  }

  const urlPath = params['*'] || '';
  const parsed = parseGithubUrlPath(urlPath);
  let body;
  if (!user) {
    body = <Alert variant="danger">Chyba autentifikácie</Alert>
  } else if ('error' in parsed) {
    return (<Alert variant="danger">Chyba URL</Alert>)
  } else {
    const username = user.login;
    const { branch, path } = parsed;
    body = (
      <RepoExplorer
        owner={username}
        repo={params.repo!!}
        branch={branch}
        path={path}
        makeLink={makeLink}
      />
    )
  }

  return (
    <Container>
      <h1>{params.repo!!}</h1>
      {body}
    </Container>
  )
}

export default RepoPage;