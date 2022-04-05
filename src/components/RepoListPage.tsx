import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { authSelectors } from "../store/authSlice";
import { useAppSelector } from "../store/hooks";
import Err404Page from "./Err404Page";
import LoginPage from "./LoginPage";
import RepoList from "./Repo/RepoList";

function RepoListPage() {
  const params = useParams();
  const authState = useAppSelector(authSelectors.authState);

  if (params.page && params.page.match("^[1-9]\\d*$") === null) {
    return <Err404Page />
  }

  if (authState !== "authenticated") {
    return <LoginPage msg="Pre pokračovanie sa musíte prihlásiť" readirectTo={window.location.pathname} />
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