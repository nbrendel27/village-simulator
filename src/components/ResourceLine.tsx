import Resource from '../models/Resource';
import './ResourceLine.css'

interface Props {
    resource: Resource;
}

const ResourceLine = (props: Props) => {
  return (
    <tr><td>{props.resource.name}</td><td>{props.resource.amount}</td></tr>
  )
};

export default ResourceLine;
