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
        <Card.Title>
          {
            placeholder ?
              <Placeholder xs={2} bg="primary" />
              : <Link to={props.makeRepoLink('/', 'dir', item.owner.login, item.name)}>{item.name}</Link>
          }
        </Card.Title>
        <Card.Text>
          {
            placeholder ? 
            <Placeholder xs={4} bg="secondary" />
            : item.description || <span className="text-muted">Bez popisu</span>
          }
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        {
          placeholder ? 
          <Placeholder xs={1} bg="secondary" />
          : <Badge pill bg="secondary">{item.private ? 'Súkromný' : 'Verejný'}</Badge>
        }
        {
          placeholder ? 
          <Placeholder style={{ float: 'right' }} xs={3} />
          : (item.updated_at && <div className="text-muted" style={{ float: 'right' }}>Zmenené <Moment locale='sk' fromNow>{item.pushed_at || item.updated_at}</Moment></div>)
        }
      </Card.Footer>
    </Card>
  )
}

export default RepoListItem;