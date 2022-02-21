import { Badge, Card } from "react-bootstrap";
import { RepoItem } from "../../store/repoListSlice";

import 'moment/locale/sk';
import Moment from "react-moment";
import { Link } from "react-router-dom";

export interface RepoListProps {
  item: RepoItem,
  makeRepoLink: (repoName: string) => string
}

function RepoListItem(props: RepoListProps) {
  const { item } = props;
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>
          <Link to={props.makeRepoLink(item.name)}>{item.name}</Link>
        </Card.Title>
        <Card.Text>
          {item.description || <span className="text-muted">Bez popisu</span>}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Badge pill bg="secondary">
          {item.private ? 'Private' : 'Public'}
        </Badge>
        {item.updatedAt && <Moment locale='sk' className="text-muted" style={{ float: 'right' }} fromNow>{item.updatedAt}</Moment>}
      </Card.Footer>
    </Card>
  )
}

export default RepoListItem;