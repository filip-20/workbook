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
  const {pageCount, currentPage, pagesFromStart, pagesToEnd, pagesAroundCurrent, makePageLink} = props

  const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

  const pages = useMemo(() => {
    const pages: { [key: number]: boolean } = {};
    let from, to;
    /* pages from start */
    from = 1;
    to = clamp(pagesFromStart!!, 1, pageCount);
    for (let i = from; i <= to; i++) {
      pages[i] = true;
    }
    /* pages around current page */
    from = clamp(currentPage - pagesAroundCurrent!!, 1, pageCount);
    to = clamp(currentPage + pagesAroundCurrent!!, 1, pageCount);
    for (let i = from; i <= to; i++) {
      pages[i] = true;
    }
    /* pages to end */
    from = clamp(pageCount - pagesToEnd!! + 1, 1, pageCount);
    to = pageCount;
    for (let i = from; i <= to; i++) {
      pages[i] = true;
    }
    return pages;
  }, [currentPage, pageCount, pagesAroundCurrent, pagesFromStart, pagesToEnd])


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
    if (page === currentPage) {
      pageItems.push((
        <Pagination.Item key={page} active>{page}</Pagination.Item>
      ))
    } else {
      pageItems.push((
        <LinkContainer key={page} to={makePageLink(page)}><Pagination.Item>{page}</Pagination.Item></LinkContainer>
      ))
    }
  })

  return (
    <Pagination className="justify-content-center">
      {currentPage === 1 ? <Pagination.First disabled /> : <LinkContainer to={makePageLink(1)}><Pagination.First /></LinkContainer>}
      {currentPage === 1 ? <Pagination.Prev disabled /> : <LinkContainer to={makePageLink(currentPage - 1)}><Pagination.Prev /></LinkContainer>}
      {pageItems}
      {currentPage === pageCount ? <Pagination.Next disabled /> : <LinkContainer to={makePageLink(currentPage + 1)}><Pagination.Next /></LinkContainer>}
      {currentPage === pageCount ? <Pagination.Last disabled /> : <LinkContainer to={makePageLink(pageCount)}><Pagination.Last /></LinkContainer>}
    </Pagination>
  )
}

Paginate.defaultProps = defaultProps

export default Paginate;