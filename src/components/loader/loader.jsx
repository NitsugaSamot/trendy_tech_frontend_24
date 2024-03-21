
import BeatLoader from "react-spinners/BeatLoader";
import "./loader.css"
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner">
      <BeatLoader
        color={"#4396e9"}
        loading={true}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    </div>
  );
};

export default Loader;
