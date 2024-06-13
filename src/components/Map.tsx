import Improvement from '../models/Improvement';
import './Map.css'
import Tile from './Tile';

interface Props {
    improvements: Improvement[];
}

const Map = ({improvements}:Props) => {
  return (
    <div className='Map'>
        {improvements.map((imp) => <Tile improvement={imp}/>)}
    </div>
  )
};

export default Map;
