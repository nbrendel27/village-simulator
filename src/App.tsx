import { useState } from "react";

import "./App.css";
import ResourcesView from "./components/ResourcesView";
import Map from "./components/Map";
import Resource from "./models/Resource";
import Improvement from "./models/Improvement";
import AddImprovementDialog from "./components/AddImprovementDialog";
import EditImprovementDialog from "./components/EditImprovementDialog";

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
    Array.apply(null, Array(25)).map(() => {
      return { type: "empty", level: 0 };
    })
  );

  return (
    <>
      <Map improvements={improvements} />
      <ResourcesView
        people={people}
        papyrus={papyrus}
        fish={fish}
        bricks={bricks}
        water={water}
      />
      <AddImprovementDialog />
      <EditImprovementDialog />
    </>
  );
}

export default App;
