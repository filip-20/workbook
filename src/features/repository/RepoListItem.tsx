import { Badge, Card, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import 'moment/locale/sk';

export interface RepoInfo {
  id: number,
  owner: {login: string},
  name: string,
  description: string | null,
  private: boolean,
  pushed_at?: string | null | undefined,
  updated_at?: string | null | undefined
}

export interface RepoListProps {
  item: RepoInfo,
  placeholder?: boolean,
  makeRepoLink: (path: string, fileType: 'file' | 'dir', owner: string, repo: string, branch?: string) => string,
}

function RepoListItem(props: RepoListProps) {
  const { item, placeholder } = props;
  return (
    <Card as="article" className="h-100">
      <Card.Body className="vstack">
        <Card.Title>
          {
            placeholder
              ? <Placeholder xs={3} bg="primary" />
              : <>
                <Link to={props.makeRepoLink('/', 'dir', item.owner.login, item.name)}>
                  {item.owner.login}/{item.name}
                </Link>
                {"  "}
                <span className="d-inline-block align-baseline fs-6 text-weight-normal">
                  <Badge pill bg="light" text="secondary" className="border align-bottom">
                    {item.private ? 'Private' : 'Public'}
                  </Badge>
                </span>
              </>
          }
        </Card.Title>
        <Card.Text className="mb-2 flex-fill">
          {
            placeholder ? 
            <Placeholder xs={4} bg="secondary" />
            : item.description || <span className="text-muted">No description</span>
          }
        </Card.Text>
        <Card.Text className="text-muted">
          {
            placeholder
            ? <Placeholder xs={3} bg="secondary" size="sm" />
            : (item.updated_at &&
              <small className="text-muted">
                {"Updated "}
                <Moment locale='en' fromNow>
                  {item.pushed_at || item.updated_at}
                </Moment>
              </small>)
          }
        </Card.Text>
      </Card.Body>
      {/* <Card.Footer className="d-flex flex-wrap justify-content-between align-items-baseline g-2">
        {
          placeholder
          ? <Placeholder xs={2} bg="secondary" size="sm" className="me-2"/>
          : <span className="d-inline-block small me-2 text-muted">
              {item.owner.login}
            </span>
        }
      </Card.Footer> */}
    </Card>
  )
}

export default RepoListItem;