import "./App.css";
import Table from "./components/Table";

import data from "./data/source";
import configs from "./data/configs";

function App() {
  return (
    <div className="App">
      {Object.entries(configs).map(([key, val]) => (
        <div key={key} className="table-container">
          <Table data={data} config={val} />
        </div>
      ))}
    </div>
  );
}

export default App;
