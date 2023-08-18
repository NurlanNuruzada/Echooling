import SynchronizedSlider from "../Components/CaruselSliderSlick/caruselSlider";
import News from "../Components/News/News";
import Events from "../Components/SiteEvents/Events";

const Home = () => {
  return (
    <div>
      <div className="" style={{ height: "100vh" }}>
        <h1>Home</h1>
        <Events />
      <News />
      </div>
        <SynchronizedSlider />
    </div>
  );
};

export default Home;
