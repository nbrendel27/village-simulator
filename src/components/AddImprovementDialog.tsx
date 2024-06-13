import { useState } from "react";
import "./AddImprovementDialog.css";
import { ImprovementsArray } from "../models/ImprovementsArray";

const AddImprovementDialog = () => {
  const [type, setType] = useState("");

  const selectedType = ImprovementsArray.find((item) => {
    return item.type === type;
  });

  const element = ImprovementsArray.map((item) => {
    return <p>${item.cost}</p>;
  });

  return (
    <form className="AddImprovementDialog">
      <label htmlFor="types-of-improvements">Type</label>
      <select
        name="types-of-improvements"
        id="types-of-improvements"
        onChange={(e) => {
          setType(e.target.value);
        }}
      >
        <option value="aqueduct">Aqueduct</option>
        <option value="pyramid">Pyramid</option>
        <option value="sphinks">Sphinks</option>
        <option value="market">Market</option>
        <option value="masonry">Masonry</option>
      </select>
      <label htmlFor="benefit">
        <p>selectedType.benefit</p>
      </label>
      <label htmlFor="cost">
        <p>selectedType.cost.</p>
        <p></p>
        <p></p>
        <p></p>
      </label>
      <button>Cancel</button>
      <button>Add</button>
    </form>
  );
};

export default AddImprovementDialog;
