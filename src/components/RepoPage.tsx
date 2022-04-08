import { Alert, Container } from "react-bootstrap";
import { BsFillStarFill } from "react-icons/bs";
import { useLocation, useParams } from "react-router-dom";
import { authSelectors } from "../store/authSlice";
import { useAppSelector } from "../store/hooks";
import Err404Page from "./Err404Page";
import LoginPage from "./LoginPage";
import RepoExplorer from "./Repo/RepoExplorer";


/**
 *  Parses part of URL that folows after repo name. 
 *  In urlPath we have string of format '{tree|blob}/{branch_name}/{repo_path}'. 
 *  Branch name can contain slashes. If it does, it is put between colons which can't be in branch name.  
 *  @see https://git-scm.com/docs/git-check-ref-format
 */
export function parseGithubUrlPath(urlPath: string): {branch?: string, type: 'file' | 'dir', path: string} | {error: 'invalid_path'} {
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

export function makeLink(filepath: string, fileType: 'file' | 'dir', repo: string, branch?: string): string {
  const type = fileType === 'file' ? 'blob' : 'tree';
  let bPart = '';
  if (branch) {
    bPart = branch.includes('/') ? `:${branch}:/` : `${branch}/`;
  }
  const { extension } = parseFilepath(filepath);
  if (extension === 'workbook') {
    return `/sheet/${repo}/${type}/${bPart}${filepath}`;
  } else {
    return `/repo/${repo}/${type}/${bPart}${filepath}`;
  }
}

export function parseFilepath(filepath: string): {filename: string, extension: string} {
  const a = filepath.split('/');
  const filename = a[a.length-1];
  const b = filename.split('.');
  const extension = b[b.length-1];
  return {filename, extension}
}

function RepoPage() {
  const user = useAppSelector(authSelectors.user);
  const location = useLocation();
  const params = useParams();

  const transformFileItem = (filepath: string, type: 'file' | 'dir') => {
    const {filename, extension} = parseFilepath(filepath);
    if (extension === 'workbook') {
      return {changeIcon: <BsFillStarFill style={{strokeWidth: '1px', fill: 'yellow'}} />}
    }
    return {}
  }

  const urlPath = params['*'] || '';
  const parsed = parseGithubUrlPath(urlPath);
  let body;
  if (!user) {
    return <LoginPage msg="Pre pokračovanie sa musíte prihlásiť" readirectTo={location.pathname} />
  } else if ('error' in parsed || !params.repo) {
    return <Err404Page />
  } else {
    const username = user.login;
    const { branch, path } = parsed;
    body = (
      <RepoExplorer
        owner={username} repo={params.repo} branch={branch} path={path}
        makeLink={makeLink}
        transformFileItem={transformFileItem}
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