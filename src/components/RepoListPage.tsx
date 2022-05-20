import { useRef, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { authSelectors } from "../store/authSlice";
import { useAppSelector } from "../store/hooks";
import CheckList from "./CheckList";
import Err404Page from "./Err404Page";
import LoginPage from "./LoginPage";
import OptionList from "./OptionList";
import { PopoverButton } from "./PopoverMenu";
import RepoList from "./Repo/RepoList";
import { makeRepoLink } from "./RepoPage";

function RepoListPage() {
  const location = useLocation();
  const params = useParams();
  const authState = useAppSelector(authSelectors.authState);
  const user = useAppSelector(authSelectors.user);

  const [affiliation, setAffiliation] = useState<string[]>(['owner']);
  const [sortBy, setSortBy] = useState<string>('pushed');
  const time = useRef<boolean>(false)
  const q = useRef('');
  const [query, setQuery] = useState<string | undefined>(undefined);

  if (params.page && params.page.match("^[1-9]\\d*$") === null) {
    return <Err404Page />
  }

  if (authState !== "authenticated") {
    return <LoginPage msg="Pre pokračovanie sa musíte prihlásiť" readirectTo={location.pathname} />
  }
  const makePageLink = (page: number) => page === 1 ? '/' : `/repos/${page}`;

  return (
    <Container>
      <h1>Zoznam repozitárov</h1>

      <Container>
        <Row>
          <Col className="my-1" md xs={12}>
            <FormControl type="text" placeholder="Hľadať repozitáre" style={{ display: 'inline-block', width: '100%' }} onChange={e => {
              console.log(e.target.value);
              q.current = e.target.value;
              if (time.current === false) {
                time.current = true;
                setTimeout(() => { setQuery(q.current === '' ? undefined : q.current); time.current = false }, 1000)
              }
            }
            } />
          </Col>
          <Col className="text-center my-1" md="auto" xs={6}>
            <PopoverButton className="" title="Zoradenie">
              <OptionList selected={sortBy} onSelectedChange={selected => setSortBy(selected)}>
                <OptionList.Item name="full_name">Názov</OptionList.Item>
                <OptionList.Item name="pushed">Dátum úpravy</OptionList.Item>
              </OptionList>
            </PopoverButton>
          </Col>
          <Col className="text-center my-1" md="auto" xs={6}>
            <PopoverButton className="" title="Repozitáre">
              <CheckList onCheckedChange={(arr) => { console.log(arr); setAffiliation(arr) }} checked={affiliation}>
                <CheckList.Item name="owner">Vlastné</CheckList.Item>
                <CheckList.Item name="organization_member">Organizačné</CheckList.Item>
              </CheckList>
            </PopoverButton>
          </Col>
        </Row>
        <hr className="my-1" />
      </Container>


      <RepoList
        user={user!.login}
        sort={sortBy as 'full_name' | 'pushed'}
        affiliation={affiliation.reduce((p, c) => `${p},${c}`, '')}
        query={query}
        itemsPerPage={10}
        page={(params.page && parseInt(params.page)) || undefined}
        makePageLink={makePageLink}
        makeRepoLink={makeRepoLink}
      />
    </Container >
  )
}

export default RepoListPage;