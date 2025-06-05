import "./App.css";

function App() {
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>25-5 Clock</h1>{" "}
      <div className="row">
        <div id="break-label" className="col-sm-4">
          Break Length
        </div>
        <div id="session-label" className="col-sm-4">
          Session Length
        </div>
      </div>
    </div>
  );
}

export default App;
