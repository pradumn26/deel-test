import "./App.css";
import { Autocomplete } from "./components/Autocomplete";

function App() {
  return (
    <div className="App">
      <h3 className="text-2xl font-bold mb-2">Autocomplete Input</h3>
      <Autocomplete onSelect={(option) => console.log(option)} />
    </div>
  );
}

export default App;
