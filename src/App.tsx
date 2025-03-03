import "./App.css";
import { Autocomplete } from "./components/Autocomplete";

function App() {
  return (
    <div className="App">
      <h3>Autocomplete Input</h3>
      <Autocomplete onSelect={(option) => console.log(option)} />
    </div>
  );
}

export default App;
