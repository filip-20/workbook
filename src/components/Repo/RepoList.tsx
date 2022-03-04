import React from "react";
import { Alert,Col, Container, Row, Spinner } from "react-bootstrap";
import Paginate from "../Paginate";
import RepoListItem from "./RepoListItem";
import { useReposListForAuthenticatedUserHeadersQuery } from "../../services/githubApi/baseApi";
import { MinimalRepository, useReposListForAuthenticatedUserQuery } from "../../services/githubApi/endpoints/repos";
import { displayLoadable } from "./displayLoadable";

export interface RepoListProps {
  itemsPerPage: number,
  page?: number,
  makeRepoLink: (repoName: string) => string,
  makePageLink: (page: number) => string,
}

function RepoList(props: RepoListProps) {
  const { itemsPerPage, page } = props;

  const repos = useReposListForAuthenticatedUserQuery({ perPage: itemsPerPage, page });
  const paginationInfo = useReposListForAuthenticatedUserHeadersQuery({perPage: itemsPerPage, type: 'owner'});

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

  const renderListItem = (item: MinimalRepository) => {
    return (
      <Col key={item.id} md={6} style={{ padding: '0.5rem' }}>
        <RepoListItem placeholder={repos.status === 'pending'} item={item} makeRepoLink={props.makeRepoLink} />
      </Col>
    )
  }
  const loading = <div style={{width: '100%', textAlign: 'center'}}><Spinner animation="grow" role="status" /></div>
  const err = (message: string) => {
    return <Alert variant="danger">{message}</Alert>
  }
  const renderList = (data: MinimalRepository[]) => <Row>{data.map(item => renderListItem(item))}</Row>
  const renderPagination = (data: {link?: string}) => {
    const lastPage = parseLastPage(data.link);
    return lastPage !== 1 ? <Paginate makePageLink={props.makePageLink} pageCount={lastPage} currentPage={page || 1} /> : <></>
  }

  return (
    <Container>
      {displayLoadable(repos, loading, renderList, err('Načítanie repozitárov zlyhalo'))}
      {displayLoadable(paginationInfo, <></>, renderPagination, err('Načítanie stránkovania zlyhalo'))}
    </Container>
  )
}

export default RepoList;