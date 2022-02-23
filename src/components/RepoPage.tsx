import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import RepoExplorer from "./Repo/RepoExplorer";

function RepoPage() {

  const params = useParams();

  //console.log(params);

  const makeLink = (path: string, fileType: 'file' | 'dir', repo: string, branch?: string) => {
    const type = fileType === 'file' ? 'blob' : 'tree';
    const b = branch ? branch + '/' : ''
    return `/repo/${repo}/${type}/${b}${path}`;
  }

  return (
    <Container>
      <h1>{params.repo!!}</h1>
      <RepoExplorer
        owner="LineageOS"
        repo={params.repo!!}
        branch={params.branch}
        path={params['*'] || ''}
        makeLink={makeLink}
      />
    </Container>
  )
}

export default RepoPage;