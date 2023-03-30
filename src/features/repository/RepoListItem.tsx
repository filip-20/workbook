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
    <Card className="h-100">
      <Card.Body>
        <Card.Title as="h2" className="h5">
          {
            placeholder
              ? <Placeholder xs={2} bg="primary" />
              : <Link to={props.makeRepoLink('/', 'dir', item.owner.login, item.name)}>{item.name}</Link>
          }
          <span className="d-inline-block align-baseline fs-6 text-weight-normal ms-2">
            {
              placeholder
              ? <Placeholder xs={1} bg="secondary" size="sm" />
              : <Badge pill bg="light" text="secondary" className="border align-bottom">
                  {item.private ? 'Private' : 'Public'}
                </Badge>
            }
          </span>
        </Card.Title>
        <Card.Text className="small">
          {
            placeholder ? 
            <Placeholder xs={4} bg="secondary" />
            : item.description || <span className="text-muted">Bez popisu</span>
          }
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex flex-wrap justify-content-between align-items-baseline g-2">
        {
          placeholder
          ? <Placeholder xs={2} bg="secondary" size="sm" className="me-2"/>
          : <span className="d-inline-block small me-2 text-muted">
              {item.owner.login}
            </span>
        }
        {
          placeholder
          ? <Placeholder xs={3} bg="secondary" size="sm" />
          : (item.updated_at &&
            <span className="text-muted small">
              {"Updated "}
              <Moment locale='en' fromNow>
                {item.pushed_at || item.updated_at}
              </Moment>
            </span>)
        }
      </Card.Footer>
    </Card>
  )
}

export default RepoListItem;