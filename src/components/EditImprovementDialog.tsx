import { FormEvent } from "react";
import "./EditImprovementDialog.css";
import { Type } from "../models/ImprovementsArray";

interface Props {
  index: number;
  endTurn(): void;
  hideDialog(): void;
  editImprovement(index: number, improvement: Type, action: string): void;
  checkImprovement(improvement: Type): boolean;
}

const EditImprovementDialog = ({index, endTurn, hideDialog, editImprovement, checkImprovement}: Props) => {
  const submitListener = (e: FormEvent) => {
    e.preventDefault();
    endTurn();
    hideDialog();
  }

  return (
    <div className="EditImprovementDialog">EditImprovementDialog works</div>
  );
};

export default EditImprovementDialog;
