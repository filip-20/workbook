import { Alert, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { selectUser } from "../store/authSlice";
import { useAppSelector } from "../store/hooks";
import RepoExplorer from "./Repo/RepoExplorer";

function RepoPage() {
  const user = useAppSelector(selectUser);
  const params = useParams();

  const makeLink = (path: string, fileType: 'file' | 'dir', repo: string, branch?: string) => {
    const type = fileType === 'file' ? 'blob' : 'tree';
    const b = branch ? branch + '/' : ''
    return `/repo/${repo}/${type}/${b}${path}`;
  }

  let body;
  if (!user) {
    body = <Alert variant="danger">Chyba autentifikácie</Alert>
  } else {
    const username = user.login;
    body = (
      <RepoExplorer
        owner={username}
        repo={params.repo!!}
        branch={params.branch}
        path={params['*'] || ''}
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