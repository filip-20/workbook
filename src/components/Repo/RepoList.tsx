import React, { useRef } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import Paginate from "../Paginate";
import RepoListItem, { RepoInfo } from "./RepoListItem";
import { useReposListForAuthenticatedUserHeadersQuery, useSearchReposHeadersQuery } from "../../services/githubApi/baseApi";
import { MinimalRepository, useReposListForAuthenticatedUserQuery } from "../../services/githubApi/endpoints/repos";
import { displayLoadable } from "./displayLoadable";
import Err404Page from "../Err404Page";
import { useSearchReposQuery } from "../../services/githubApi/endpoints/search";
import { BsSlashCircle } from "react-icons/bs";

export interface RepoListProps {
  itemsPerPage: number,
  page?: number,
  sort?: "created" | "updated" | "pushed" | "full_name",
  affiliation?: string,
  query?: string,
  user: string,
  makeRepoLink: (path: string, fileType: 'file' | 'dir', owner: string, repo: string, branch?: string) => string,
  makePageLink: (page: number) => string,
}

function RepoList(props: RepoListProps) {
  const { itemsPerPage, page, sort, affiliation, query } = props;

  const repos = useReposListForAuthenticatedUserQuery({ perPage: itemsPerPage, page, sort, affiliation: affiliation || 'owner' }, { skip: query !== undefined });
  const paginationInfo = useReposListForAuthenticatedUserHeadersQuery({ perPage: itemsPerPage, affiliation: affiliation || 'owner' }, { skip: query !== undefined });

  const q = useSearchReposQuery({ q: (`${query} user:${props.user}`) }, { skip: query === undefined })
  const paginationInfo2 = useSearchReposHeadersQuery({ q: (`${query} user:${props.user}`) }, { skip: query === undefined });
  console.log('repo list render');
  const parseLastPage = (link?: string) => {
    let lastPage: number | null = null;
    if (link) {
      link.split(', ').forEach(item => {
        const parts = item.split('; ');
        if (parts[1] === 'rel="last"') {
          const match = parts[0].match(/.*[?&]+page=([0-9]+)/)
          /* was positive integer parsed? */
          if (match && match[1] !== undefined && /^\d+$/.test(match[1])) {
            lastPage = parseInt(match[1]);
          }
        }
      })
    }
    if (!lastPage) {
      return 1
    } else {
      return lastPage;
    }
  }

  const lastPage = useRef<number | undefined>(undefined);

  const renderListItem = (item: RepoInfo) => {
    return (
      <Col key={item.id} md={6} style={{ padding: '0.5rem' }}>
        <RepoListItem placeholder={repos.isFetching} item={item} makeRepoLink={props.makeRepoLink} />
      </Col>
    )
  }
  const loading = <div style={{ width: '100%', textAlign: 'center' }}><Spinner animation="grow" role="status" /></div>
  const err = (message: string) => {
    return <Alert variant="danger">{message}</Alert>
  }
  const renderList = (data: RepoInfo[]) => {
    if (data.length === 0) {
      return (
        <div className="text-center text-muted">
          <BsSlashCircle style={{ margin: '5em', marginBottom: '2em' }} size={'10em'} />
          <h3>Nenašli sa žiadne repozitáre</h3>
        </div>
      )
    } else {
      return <Row>{data.map(item => renderListItem(item))}</Row>
    }
  }
  const renderPagination = (data: { link?: string }) => {
    lastPage.current = parseLastPage(data.link);
    return lastPage.current !== 1 ? <Paginate makePageLink={props.makePageLink} pageCount={lastPage.current} currentPage={page || 1} /> : <></>
  }

  if (lastPage.current && page && page > lastPage.current) {
    return err('Ste za poslednou stranou');
  }

  let body;
  if (query) {
    if (q.isError) {
      body = err('Načítanie repozitárov zlyhalo');
    } else if (q.isLoading) {
      body = loading;
    } else if (q.isSuccess) {
      body = (<>
        {renderList(q.data.items.filter(r => r.owner !== null).map(r => { return { ...r, owner: { login: r.owner!.login } } }))}
        {displayLoadable(paginationInfo2, <></>, renderPagination, err('Načítanie stránkovania zlyhalo'))}
      </>
      )
    }

  } else {
    body = (
      <>
        {displayLoadable(repos, loading, renderList, err('Načítanie repozitárov zlyhalo'))}
        {displayLoadable(paginationInfo, <></>, renderPagination, err('Načítanie stránkovania zlyhalo'))}
      </>
    )
  }

  return (
    <Container>
      {body}
    </Container>
  )
}

export default RepoList;