import "../styles/home.css";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home">
      <h1>CharakterbogenSafe</h1>
      <div className="button-container">
        <Link to="/turbo-fate">
          <button>TurboFate</button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
