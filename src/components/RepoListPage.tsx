import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import RepoList from "./Repo/RepoList";

function RepoListPage() {
  const params = useParams();
  const navigate = useNavigate()
  
  let page;
  if (params.page) {
    page = parseInt(params.page)
  }

console.log('RepoListPage called with page: ' + page);

  const pageChangeHandler = (page: number) => {
    console.log('navigating to ' + page);
    navigate('/repos/' + page);
    //window.history.pushState(null, "New Page Title", '/repos/' + page)
    window.scrollTo(0, 0)
  }

  const repoClickHandler = (repo: string) => {
    console.log('repo selected: ' + repo);
    navigate('/repo/' + repo);
  }

  return (
    <Container>
      <h1>Zoznam repozitárov: </h1>
      <RepoList
        username="LineageOS"
        itemsPerPage={10}
        page={(params.page && parseInt(params.page)) || undefined}
        onPageChanged={pageChangeHandler}
        onRepoClicked={repoClickHandler}
      />
    </Container>
  )
}

export default RepoListPage;