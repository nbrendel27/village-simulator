import { FormEvent, useState } from "react";
import "./EditImprovementDialog.css";
import { ImprovementsArray, Type } from "../models/ImprovementsArray";
import Improvement from "../models/Improvement";

interface Props {
  improvement: Improvement;
  endTurn(): void;
  hideDialog(): void;
  editImprovement(index: number, improvement: Type, action: string): void;
  checkImprovement(improvement: Type): boolean;
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
      <button>Upgrade</button>
      <button>Downgrade</button>
      <button>Remove</button>
    </form>
  );
};

export default EditImprovementDialog;
