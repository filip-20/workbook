import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Err404Page from "./Err404Page";
import RepoList from "./Repo/RepoList";

function RepoListPage() {
  const params = useParams();

  if (params.page && params.page.match("^[1-9]\\d*$") === null) {
    return <Err404Page />
  }

  const makeRepoLink = (repoName: string) => `/repo/${repoName}`;
  const makePageLink = (page: number) => page === 1 ? '/' : `/repos/${page}`;
  return (
    <Container>
      <h1>Zoznam repozitárov</h1>
      <RepoList
        sort="created"
        itemsPerPage={10}
        page={(params.page && parseInt(params.page)) || undefined}
        makePageLink={makePageLink}
        makeRepoLink={makeRepoLink}
      />
    </Container>
  )
}

export default RepoListPage;