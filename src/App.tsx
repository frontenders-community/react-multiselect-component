import { useState } from "react";
import "./App.css";
import MultiSelect from "./components/MultiSelects";


function App() {
  const [selected, setSelected] = useState<string[]>(["option 1", "option 4"]);

  const options = ["option 1", "option 2", "option 3", "option 4", "option 5", "option 6", "option 7", "option 8", "option 9"];

  const resetValues = () => {
    setSelected([]);
  }


  return (
    <>
      <h1>Hello World</h1>
      <MultiSelect options={options} value={selected} onChange={setSelected}/>

      <p>Opzioni selezionati {selected.join()}</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ab eos officia quidem maiores pariatur corporis itaque deleniti vitae ad ut omnis officiis asperiores, est molestias? Dolores architecto qui numquam?</p>

      <button onClick={resetValues}>RESET</button>
    </>
  );
}

export default App;
