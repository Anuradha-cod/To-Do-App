import "./App.css";
import ToDoApp from "./component/ToDoApp";

function App() {
  return (
    <div className="App">
      <div className="appdiv">
        <div className="AppToDo">
          <h3 className="ToDoApp">ToDoApp</h3>
        </div>
        <ToDoApp />
      </div>
    </div>
  );
}

export default App;
