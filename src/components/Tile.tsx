import { useState } from "react";
import Improvement from "../models/Improvement";
import "./Tile.css";
import AddImprovementDialog from "./AddImprovementDialog";
import EditImprovementDialog from "./EditImprovementDialog";
import { Type } from "../models/ImprovementsArray";

interface Props {
  improvement: Improvement;
  takeTurn(): void;
  checkTurn(): boolean;
  endTurn(): void;
  addImprovement(index: number, improvement: Type): void;
  editImprovement(index: number, improvement: Type, action: string): void;
  checkImprovement(improvement: Type, which: string, level?: number): boolean;
}

const Tile = ({
  improvement,
  takeTurn,
  checkTurn,
  endTurn,
  addImprovement,
  editImprovement,
  checkImprovement,
}: Props) => {
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);

  const hideDialog = () => {
    if (add) {
      setAdd(false);
    } else if (edit) {
      setEdit(false);
    }
  };

  return (
    <div
      className="Tile"
      onClick={() => {
        if (checkTurn()) {
          return;
        }
        if (improvement.type === "empty") {
          takeTurn();
          setAdd(true);
        } else {
          takeTurn();
          setEdit(true);
        }
      }}
    >
      <img
        src={"./src/assets/" + improvement.type.toLocaleLowerCase() + ".png"}
        alt=""
      />
      <div className="level" style={{display: improvement.level > 1 ? "block":"none"}}>{improvement.level}</div>
      <div className="Add" style={{ display: add ? "block" : "none" }}>
        <AddImprovementDialog
          index={improvement._id}
          endTurn={endTurn}
          hideDialog={hideDialog}
          addImprovement={addImprovement}
          checkImprovement={checkImprovement}
        />
      </div>
      <div className="Edit" style={{ display: edit ? "block" : "none" }}>
        <EditImprovementDialog
          improvement={improvement}
          endTurn={endTurn}
          hideDialog={hideDialog}
          editImprovement={editImprovement}
          checkImprovement={checkImprovement}
        />
      </div>
    </div>
  );
};

export default Tile;
