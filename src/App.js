import { useState, useEffect } from "react";

import PetList from "./components/PetList";
import PetInfo from "./components/PetInfo";
import PetsType from "./components/PetsType";
import "./styles/styles.css";

export default function App() {
  useEffect(() => {
    document.title = "Pets list";
  });

  const [chosen, setChosen] = useState(null);
  const [type, setType] = useState("sold");
  const [pet, setPet] = useState();
  const [update, setUpdate] = useState(true);

  return (
    <div className="App">
      <div className="headers">
        <h1>Pets list</h1>
      </div>
      <PetsType setType={setType} type={type} />
      <PetList setChosen={setChosen} type={type} update={update} />
      <PetInfo
        chosen={chosen}
        pet={pet}
        setPet={setPet}
        setUpdate={setUpdate}
        update={update}
      />
    </div>
  );
}
