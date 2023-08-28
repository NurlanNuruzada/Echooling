import { ReactQueryDevtools } from "react-query/devtools";
import Routes from "./Routes/Routes";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import MyFunctionalComponent from "./Components/Aos";
export function App() {
  return (
    <div>
      <Routes />
      <MyFunctionalComponent />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </div>
  );
}
