import { useEffect } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import Moment from "react-moment";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeList, fetchRepos, openList, RepoItem, selectListInfo, selectListState } from "../../store/repoListSlice";
import Paginate from "../Paginate";

import 'moment/locale/sk';
import RepoListItem from "./RepoListItem";

export interface RepoListProps {
  username: string,
  itemsPerPage: number,
  page?: number,
  makeRepoLink: (repoName: string) => string,
  makePageLink: (page: number) => string,
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

  const renderItem = (item: RepoItem) => {
    return (
      <Col key={item.id} md={6} style={{ padding: '0.5rem' }}>
        <RepoListItem item={item} makeRepoLink={props.makeRepoLink} />
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
      <Paginate makePageLink={props.makePageLink} pageCount={lastPage} currentPage={currentPage || 1} />
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