import { useState } from "react";

import "./App.css";
import ResourcesView from "./components/ResourcesView";
import Map from "./components/Map";
import Resource from "./models/Resource";
import Improvement from "./models/Improvement";
import { Type } from "./models/ImprovementsArray";

function App() {
  const [people, setPeople] = useState<Resource>({ name: "People", amount: 5 });
  const [papyrus, setPapyrus] = useState<Resource>({
    name: "Papyrus",
    amount: 5,
  });
  const [fish, setFish] = useState<Resource>({ name: "Fish", amount: 5 });
  const [bricks, setBricks] = useState<Resource>({ name: "Bricks", amount: 5 });
  const [water, setWater] = useState<Resource>({ name: "Water", amount: 5 });

  const [improvements, setImprovements] = useState<Improvement[]>(
    Array.apply(null, Array(25)).map((el, i) => {
      return { _id: i, type: "empty", level: 0 };
    })
  );

  const setResource = (name: string, amount: number) => {
    if (name.toLocaleLowerCase() === "people") {
      setPeople({
        name: people.name,
        amount: people.amount + amount,
      });
    } else if (name.toLocaleLowerCase() === "papyrus") {
      setPapyrus({
        name: papyrus.name,
        amount: papyrus.amount + amount,
      });
    } else if (name.toLocaleLowerCase() === "fish") {
      setFish({
        name: fish.name,
        amount: fish.amount + amount,
      });
    } else if (name.toLocaleLowerCase() === "bricks") {
      setBricks({
        name: bricks.name,
        amount: bricks.amount + amount,
      });
    } else if (name.toLocaleLowerCase() === "water") {
      setWater({
        name: water.name,
        amount: water.amount + amount,
      });
    }
  }

  const addImprovement = (index: number, improvement: Type): void => {
    setImprovements([
      ...improvements.slice(0, index),
      { _id: index, type: improvement.type, level: 1 },
      ...improvements.slice(index + 1),
    ]);
    
    setResource(improvement.benefit.resource, improvement.benefit.amount)
    improvement.cost.forEach((c) => {
      setResource(c.resource, (c.amount * -1))
    });
  };

  const resourceAmount = (name: string): number => {
    if (name.toLocaleLowerCase() === "people") {
      return people.amount;
    } else if (name.toLocaleLowerCase() === "papyrus") {
      return papyrus.amount;
    } else if (name.toLocaleLowerCase() === "fish") {
      return fish.amount;
    } else if (name.toLocaleLowerCase() === "bricks") {
      return bricks.amount;
    } else if (name.toLocaleLowerCase() === "water") {
      return water.amount;
    }
    return 0;
  }

  const checkImprovement = (improvement: Type, which: string, level?: number): boolean => {
    if (which==="add" && improvement.cost.find((c) => {
        return c.amount > resourceAmount(c.resource);
      })
    ) {
      return true;
    } else if (which === "down" && improvement.benefit.amount > resourceAmount(improvement.benefit.resource)) {
      return true;
    } else if(which === "remove" && level && (improvement.benefit.amount*level) > resourceAmount(improvement.benefit.resource)) {
      return true;
    }
    return false;
  };

  const editImprovement = (
    index: number,
    improvement: Type,
    action: string
  ): void => {
    if(action === "upgrade") {
      setImprovements([
        ...improvements.slice(0, index),
        { _id: index, type: improvement.type, level: improvements[index].level+1 },
        ...improvements.slice(index + 1),
      ]);
      setResource(improvement.benefit.resource, improvement.benefit.amount)
      improvement.cost.forEach((c) => {
        setResource(c.resource, (c.amount * -1))
      });
    }else if(action === "downgrade" && improvements[index].level > 1) {
      setImprovements([
        ...improvements.slice(0, index),
        { _id: index, type: improvement.type, level: improvements[index].level-1 },
        ...improvements.slice(index + 1),
      ]);
      setResource(improvement.benefit.resource, (improvement.benefit.amount * -1))
      improvement.cost.forEach((c) => {
        setResource(c.resource, (c.amount))
      });
    } else {
      
      setResource(improvement.benefit.resource, ((improvement.benefit.amount * -1)*improvements[index].level))
      improvement.cost.forEach((c) => {
        setResource(c.resource, (c.amount * improvements[index].level))
      });
      setImprovements([
        ...improvements.slice(0, index),
        { _id: index, type: "empty", level: 0 },
        ...improvements.slice(index + 1),
      ]);
    }
  };

  return (
    <>
      <Map
        improvements={improvements}
        addImprovement={addImprovement}
        editImprovement={editImprovement}
        checkImprovement={checkImprovement}
      />
      <ResourcesView
        people={people}
        papyrus={papyrus}
        fish={fish}
        bricks={bricks}
        water={water}
      />
    </>
  );
}

export default App;
