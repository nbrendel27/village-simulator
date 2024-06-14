import { FormEvent, useState } from "react";
import "./EditImprovementDialog.css";
import { ImprovementsArray, Type } from "../models/ImprovementsArray";
import Improvement from "../models/Improvement";

interface Props {
  improvement: Improvement;
  endTurn(): void;
  hideDialog(): void;
  editImprovement(index: number, improvement: Type, action: string): void;
  checkImprovement(improvement: Type, which: string, level?: number): boolean;
}

const EditImprovementDialog = ({
  improvement,
  endTurn,
  hideDialog,
  editImprovement,
  checkImprovement,
}: Props) => {
  const submitListener = (e: FormEvent) => {
    e.preventDefault();
    endTurn();
    hideDialog();
  };

  const element: Type | undefined = ImprovementsArray.find((item) => {
    return item.type === improvement.type;
  });
  const canUpgrade = improvement.level > 0 ? checkImprovement(element as Type, "add", improvement.level) : true;
  const canDowngrade = improvement.level > 0 ? checkImprovement(element as Type, "down") : true;
  const canRemove = improvement.level > 0 ? checkImprovement(element as Type, "remove", improvement.level) : true;

  return (
    <form className="EditImprovementDialog">
      <label htmlFor="type">
        Type: <p>{element?.type}</p>
      </label>
      <label htmlFor="level">
        Level: <p>{improvement?.level}</p>
      </label>
      <label htmlFor="benefit">
        Benefit:{" "}
        <p>
          {element?.benefit.amount} {element?.benefit.resource}
        </p>
      </label>
      <label htmlFor="cost">
        Cost:{" "}
        {element?.cost.map((item) => (
          <p>
            {item.amount} {item.resource}
          </p>
        ))}
      </label>
      <button
        type="button"
        id="cancel"
        onClick={() => {
          endTurn();
          hideDialog();
        }}
      >
        Cancel
      </button>
      <button disabled={canUpgrade} type="button" onClick={() => {
        editImprovement(improvement._id, element as Type, "upgrade")
        endTurn();
        hideDialog();
        }}>Upgrade</button>
      <button disabled={canDowngrade} type="button" onClick={() => {
        editImprovement(improvement._id, element as Type, "downgrade")
        endTurn();
        hideDialog();
        }}>Downgrade</button>
      <button disabled={canRemove} type="button" onClick={() => {
        editImprovement(improvement._id, element as Type, "remove")
        endTurn();
        hideDialog();
        }}>Remove</button>
    </form>
  );
};

export default EditImprovementDialog;
