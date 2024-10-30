import { useState } from "react";
import "./App.css";
import MultiSelect from "./components/MultiSelects";

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [selected, setSelected] = useState<string[]>(["option 1", "option 4"]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const options = ["option 1", "option 2", "option 3", "option 4", "option 5", "option 6", "option 7", "option 8", "option 9"];

  const users: User[] = [
    { id: 1, name: 'Mario Rossi', email: 'mario@example.com' },
    { id: 2, name: 'Luigi Verdi', email: 'luigi@example.com' },
    { id: 3, name: 'Giovanna Bianchi', email: 'giovanna@example.com' },
  ];


  const resetValues = () => {
    setSelected([]);
  }


  return (
    <>
      <h1>Hello World</h1>
      <MultiSelect options={options} value={selected} onChange={setSelected} getOptionLabel={(option) => option} getOptionValue={(option) => option}/>

      <MultiSelect options={users} value={selectedUsers} onChange={setSelectedUsers} getOptionLabel={(user) => user.name} getOptionValue={(user) => user.id}/>

      <p>Opzioni selezionati {selected.join()}</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ab eos officia quidem maiores pariatur corporis itaque deleniti vitae ad ut omnis officiis asperiores, est molestias? Dolores architecto qui numquam?</p>
      <p>Utenti Selezionati {selectedUsers.map(user => (<span>{user.name}</span>))}</p>

      <button onClick={resetValues}>RESET</button>
    </>
  );
}

export default App;
