import SliderCom from '../../src/Components/Slider/Slider';
import AboutSecion from "../Components/AboutUsSection/AboutSecion";
import SynchronizedSlider from "../Components/CaruselSliderSlick/caruselSlider";
import CourseArea from "../Components/CourseArea/CourseArea";
import News from "../Components/News/News";
import Events from "../Components/SiteEvents/Events";
const Home = () => {
  return (
    <div>
      <SliderCom />
      <AboutSecion />
      <CourseArea/>
      <Events />
      <News />
      <SynchronizedSlider />
    </div>
  );
};

export default Home;
