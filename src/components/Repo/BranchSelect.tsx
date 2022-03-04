import { useRef, useState } from "react";
import { Alert, Button, ListGroup, Overlay, Popover, Spinner } from "react-bootstrap";
import { BiGitBranch } from "react-icons/bi";
import { BsCaretDownFill, BsSlashCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ReposGetApiResponse, ReposListBranchesApiResponse, useReposGetQuery, useReposListBranchesQuery } from "../../services/githubApi/endpoints/repos";
import { displayLoadable } from "./displayLoadable";

import styles from "./styles.module.css";

export interface BranchSelectProps {
  owner: string,
  repo: string,
  branch?: string,
  path: string,
  makeLink: (path: string, fileType: 'file' | 'dir', repo: string, branch?: string) => string
}

function BranchSelect(props: BranchSelectProps) {
  const { owner, repo, branch, path, makeLink } = props;

  const [show, setShow] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  const [skip, setSkip] = useState(true);

  // load default branch if branch is undefined in props
  const repoInfo = useReposGetQuery({ owner, repo }, { skip: branch !== undefined });
  const branches = useReposListBranchesQuery({ owner, repo }, { skip });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShow(!show);
    // load branch list
    setSkip(false);
  };

  const loading = <Spinner animation="border" role="status" />
  const loadingSmall = <Spinner animation="border" size="sm" role="status" />
  const err = (message: string) => {
    return <Alert variant="danger">{message}</Alert>
  }
  const renderList = (data: ReposListBranchesApiResponse) => {
    console.log('render branch list');
    console.log(data)
    if (data.length === 0) {
      return (
        <div className="text-center text-muted">
          <BsSlashCircle style={{margin: '1em'}} size={'2em'} />
        </div>
      )
    }
    return (
      <ListGroup variant="flush">
        {data.map(b => {
          const linkTo = makeLink(path, 'dir', repo, b.name);
          const active = b.name === branch;
          return (
            <ListGroup.Item action active={active} key={b.name}>
              <Link className={styles.linkStyle} to={linkTo} onClick={() => setShow(false)}>{b.name}</Link>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    )
  }
  const renderBranchName = (name: string) => <><BiGitBranch />{name}<BsCaretDownFill /></>

  return (
    <>
      <Button ref={ref} onClick={handleClick}>
        {
          branch ?
          renderBranchName(branch)
          : displayLoadable(repoInfo, loadingSmall, (data: ReposGetApiResponse) => renderBranchName(data.default_branch), () => err('Načítanie vetvy zlyhalo'))
        }
      </Button>
      <Overlay
        show={show}
        target={ref.current}
        placement="bottom"
        containerPadding={10}
      >
        <Popover>
          <Popover.Body>
            {displayLoadable(branches, loading, renderList, () => err('Načítanie vetiev zlyhalo'))}
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  )
}

export default BranchSelect;