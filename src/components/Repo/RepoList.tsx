import { useEffect } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import Moment from "react-moment";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeList, fetchRepos, openList, RepoItem, selectListInfo, selectListState } from "../../store/repoListSlice";
import Paginate from "../Paginate";

import 'moment/locale/sk';

export interface RepoListProps {
  username: string,
  itemsPerPage: number,
  page?: number,
  onPageChanged: (page: number) => void,
  onRepoClicked: (repo: string) => void,
}

function RepoList(props: RepoListProps) {
  const dispatch = useAppDispatch();
  const listInfo = useAppSelector(selectListInfo);
  const listState = useAppSelector(selectListState);

  useEffect(() => {
    console.log('calling openList with page ' + props.page)
    dispatch(openList(props.username, props.itemsPerPage, props.page))
    return () => { dispatch(closeList()) };
  }, [props.username, props.itemsPerPage]);

  useEffect(() => {
    if (listState && listState.currentPage !== props.page) {
      dispatch(fetchRepos(props.page));
    }
  }, [props.page]);

  useEffect(() => {
    if (listState && props.page !== listState.currentPage && !(!props.page && listState.currentPage === 1)) {
      props.onPageChanged(listState.currentPage);
    }
  }, [listState?.currentPage]);

  const renderItem = (item: RepoItem) => {
    return (
      <Col key={item.id} md={6} style={{ padding: '0.5rem' }}>
        <Card className="h-100">
          <Card.Header>
            <a href={`/repo/${item.name}`} onClick={(e) => { e.preventDefault(); props.onRepoClicked(item.name) }}>{item.name}</a>
            <Badge pill bg="secondary" style={{ float: 'right' }}>
              {item.private ? 'Private' : 'Public'}
            </Badge>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {item.description || <span className="text-muted">Bez popisu</span>}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Badge pill bg="primary" style={{ marginLeft: 'auto' }}>
              {item.language}
            </Badge>
            {item.updatedAt && <Moment locale='sk' className="text-muted" style={{ float: 'right' }} fromNow>{item.updatedAt}</Moment>}
          </Card.Footer>
        </Card>
      </Col>
    )
  }

  const onPageChangeHandler = (page: number) => {
    dispatch(fetchRepos(page));
  }

  if (!listInfo || !listState) {
    return (<></>)
  } else {
    const { lastPage } = listInfo;
    const { repos, currentPage } = listState;

    const pagination = (
      <Paginate onPageChange={onPageChangeHandler} pageCount={lastPage} currentPage={currentPage || 1} />
    )

    return (
      <Container>
        <Row>
          {listState.repos.map(item => renderItem(item))}
        </Row>
        {lastPage !== 1 && pagination}
      </Container>
    )
  }
}

export default RepoList;