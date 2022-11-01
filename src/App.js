import "./App.css";
import { UseReducer } from "./UseReducer";
import { UseState } from "./UseState";

function App() {
  return (
    <div className="App">
      <UseState nombre={"useState"} />
      <UseReducer nombre={"Use Reducer"} />
    </div>
  );
}

export default App;
