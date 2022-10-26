import "./App.css";
import { ClassState } from "./ClassState";
import { UseState } from "./UseState";

function App() {
  return (
    <div className="App">
      <UseState nombre={"useState"} />
      <ClassState nombre={"ClassState"} />
    </div>
  );
}

export default App;
