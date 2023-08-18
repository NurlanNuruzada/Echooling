import SynchronizedSlider from "../Components/CaruselSliderSlick/caruselSlider";
import News from "../Components/News/News";
import Events from "../Components/SiteEvents/Events";

const Home = () => {
  return (
    <div>
      <Events />
      <News />
      <SynchronizedSlider />
    </div>
  );
};

export default Home;
