import { useState } from "react";

import "./App.css";
import ResourcesView from "./components/ResourcesView";
import Map from "./components/Map";
import Resource from "./models/Resource";
import Improvement from "./models/Improvement";
import AddImprovementDialog from "./components/AddImprovementDialog";
import EditImprovementDialog from "./components/EditImprovementDialog";
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
      return {_id: i, type: "empty", level: 0 };
    })
  );

  const addImprovement = (index: number, improvement: Type): void => {
    setImprovements([...improvements.slice(0, index), {_id: index, type: improvement.type, level: 1},...improvements.slice(index+1)])
    if(improvement.benefit.resource.toLocaleLowerCase() === "people") {
      setPeople({name:people.name, amount: people.amount + improvement.benefit.amount});
    }else if(improvement.benefit.resource.toLocaleLowerCase() === "papyrus") {
      setPapyrus({name:papyrus.name, amount: papyrus.amount + improvement.benefit.amount});
    }else if(improvement.benefit.resource.toLocaleLowerCase() === "fish") {
      setFish({name:fish.name, amount: fish.amount + improvement.benefit.amount});
    }else if(improvement.benefit.resource.toLocaleLowerCase() === "bricks") {
      setBricks({name:bricks.name, amount: bricks.amount + improvement.benefit.amount});
    }else if(improvement.benefit.resource.toLocaleLowerCase() === "water") {
      setWater({name:water.name, amount: water.amount + improvement.benefit.amount});
    }
    improvement.cost.forEach((c) => {
      if(c.resource.toLocaleLowerCase() === "people") {
        setPeople({name:people.name, amount: people.amount - c.amount});
      }else if(c.resource.toLocaleLowerCase() === "papyrus") {
        setPapyrus({name:papyrus.name, amount: papyrus.amount - c.amount});
      }else if(c.resource.toLocaleLowerCase() === "fish") {
        setFish({name:fish.name, amount: fish.amount - c.amount});
      }else if(c.resource.toLocaleLowerCase() === "bricks") {
        setBricks({name:bricks.name, amount: bricks.amount - c.amount});
      }else if(c.resource.toLocaleLowerCase() === "water") {
        setWater({name:water.name, amount: water.amount - c.amount});
      }
    })
  }

  const checkImprovement = (improvement: Type): boolean => {
    if(improvement.cost.find((c) => {
      if(c.resource.toLocaleLowerCase() === "people") {
        return c.amount > people.amount;
      }else if(c.resource.toLocaleLowerCase() === "papyrus") {
        return c.amount > papyrus.amount;
      }else if(c.resource.toLocaleLowerCase() === "fish") {
        return c.amount > fish.amount;
      }else if(c.resource.toLocaleLowerCase() === "bricks") {
        return c.amount > bricks.amount;
      }else if(c.resource.toLocaleLowerCase() === "water") {
        return c.amount > water.amount;
      }
    })) {
      // console.log(improvement)
      return true;
    }
    return false;
  }

  const editImprovement = (index: number, improvement: Type, action: string): void => {

  }

  return (
    <>
      <Map improvements={improvements} addImprovement={addImprovement} editImprovement={editImprovement} checkImprovement={checkImprovement}/>
      <ResourcesView
        people={people}
        papyrus={papyrus}
        fish={fish}
        bricks={bricks}
        water={water}
      />
      {/* <AddImprovementDialog />
      <EditImprovementDialog /> */}
    </>
  );
}

export default App;
