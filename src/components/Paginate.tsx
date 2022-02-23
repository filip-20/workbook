import { useMemo } from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export interface PaginateProps {
  pageCount: number,
  currentPage: number,
  pagesFromStart?: number,
  pagesToEnd?: number,
  pagesAroundCurrent?: number,
  makePageLink: (page: number) => string,
}

const defaultProps: {
  pagesAroundCurrent: number,
  pagesFromStart: number,
  pagesToEnd: number
} = {
  pagesAroundCurrent: 2,
  pagesFromStart: 2,
  pagesToEnd: 2,
}

function Paginate(props: PaginateProps) {
  const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

  const pages = useMemo(() => {
    const pages: { [key: number]: boolean } = {};
    let from, to;
    /* pages from start */
    from = 1;
    to = clamp(props.pagesFromStart!!, 1, props.pageCount);
    for (let i = from; i <= to; i++) {
      pages[i] = true;
    }
    /* pages around current page */
    from = clamp(props.currentPage - props.pagesAroundCurrent!!, 1, props.pageCount);
    to = clamp(props.currentPage + props.pagesAroundCurrent!!, 1, props.pageCount);
    for (let i = from; i <= to; i++) {
      pages[i] = true;
    }
    /* pages to end */
    from = clamp(props.pageCount - props.pagesToEnd!! + 1, 1, props.pageCount);
    to = props.pageCount;
    for (let i = from; i <= to; i++) {
      pages[i] = true;
    }
    return pages;
  }, [props.currentPage, props.pageCount, props.pagesAroundCurrent, props.pagesFromStart, props.pagesToEnd])


  const pageItems: Array<JSX.Element> = [];
  let prevPage = 0;
  const keys = []
  for (let p in pages) {
    keys.push(parseInt(p));
  }
  let id = 0;
  keys.sort((a, b) => a-b).forEach(page => {
    if (page - prevPage !== 1) {
      pageItems.push((
        <Pagination.Ellipsis key={`e${id++}`} disabled/>
      ))
    }
    prevPage = page;
    if (page === props.currentPage) {
      pageItems.push((
        <Pagination.Item key={page} active>{page}</Pagination.Item>
      ))
    } else {
      pageItems.push((
        <LinkContainer key={page} to={props.makePageLink(page)}><Pagination.Item>{page}</Pagination.Item></LinkContainer>
      ))
    }
  })

  return (
    <Pagination className="justify-content-center">
      <LinkContainer to={props.makePageLink(1)}><Pagination.First /></LinkContainer>
      <LinkContainer to={props.makePageLink(props.currentPage - 1)}><Pagination.Prev /></LinkContainer>
      {pageItems}
      <LinkContainer to={props.makePageLink(props.currentPage + 1)}><Pagination.Next /></LinkContainer>
      <LinkContainer to={props.makePageLink(props.pageCount)}><Pagination.Last /></LinkContainer>
    </Pagination>
  )
}

Paginate.defaultProps = defaultProps

export default Paginate;