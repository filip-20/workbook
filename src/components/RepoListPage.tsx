import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { selectUser } from "../store/authSlice";
import { useAppSelector } from "../store/hooks";
import RepoList from "./Repo/RepoList";

function RepoListPage() {
  const user = useAppSelector(selectUser);
  const params = useParams();
  
  let page;
  if (params.page) {
    page = parseInt(params.page)
  }

  const makeRepoLink = (repoName: string) => `/repo/${repoName}`;
  const makePageLink = (page: number) => page === 1 ? '/repos' : `/repos/${page}`;

  const username = user ? user.login : 'LineageOS';

  return (
    <Container>
      <h1>Zoznam repozitárov</h1>
      <RepoList
        itemsPerPage={10}
        page={(params.page && parseInt(params.page)) || undefined}
        makePageLink={makePageLink}
        makeRepoLink={makeRepoLink}
      />
    </Container>
  )
}

export default RepoListPage;