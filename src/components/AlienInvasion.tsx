import { useEffect, useState } from 'react';
import './AlienInvasion.css'

interface Props {
    setResource(name: string, amount: number):void;
    resourceAmount(name: string): number;
    resources: string[];
}

const AlienInvasion = ({setResource, resourceAmount, resources}: Props) => {
    const [invasion, setInvasion] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
        setInvasion(true);

        resources.forEach((resource) => {
            const lost = Math.floor(Math.random()*5);
            if(resourceAmount(resource)-lost > 0) {
                setResource(resource, lost*-1)
            }
        })

        const timeoutId2 = setTimeout(() => {
            setInvasion(false);
        }, 4000);
        return () => clearTimeout(timeoutId2);
    }, Math.floor(Math.random() * 50000))
    return () => clearTimeout(timeoutId);
  })
  return (
    <div style = {{display: invasion ? "block" : "none"}} className='AlienInvasion'>
        <img src="./src/assets/UFO.png" alt="" />
    </div>
  )
};

export default AlienInvasion;
