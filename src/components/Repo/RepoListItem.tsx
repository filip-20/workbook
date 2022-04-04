import { Badge, Card, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import 'moment/locale/sk';
import { MinimalRepository } from "../../services/githubApi/endpoints/repos";

export interface RepoListProps {
  item: MinimalRepository,
  placeholder?: boolean,
  makeRepoLink: (repoName: string) => string
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
              : <Link to={props.makeRepoLink(item.name)}>{item.name}</Link>
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
          : <Badge pill bg="secondary">{item.private ? 'Private' : 'Public'}</Badge>
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