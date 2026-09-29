import "../css/Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading tasks...</p>
    </div>
  );
}

export default Loader;