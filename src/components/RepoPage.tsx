import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import RepoExplorer from "./Repo/RepoExplorer";

function RepoPage() {
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);

  const makeLink = (path: string, fileName: string, fileType: 'file' | 'dir', repo: string, branch: string) => {
    const type = fileType === 'file' ? 'blob' : 'tree';
    const absPath = fileName === '' ? path : (path === '' ? fileName : `${path}/${fileName}`);
    return `/repo/${repo}/${type}/${branch}/${absPath}`
  }

  const onPathChangedHandler = (_: string, linkUrl: string) => {
    navigate(linkUrl);
  }

  return (
    <Container>
      <RepoExplorer
        username="LineageOS"
        repo={params.repo!!}
        branch={params.branch}
        path={params['*']}
        makeLink={makeLink}
        onPathChanged={onPathChangedHandler}
      />
    </Container>
  )
}

export default RepoPage;