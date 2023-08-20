import { QueryClientProvider,QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Routes from "./Routes/Routes";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import MyFunctionalComponent from "./Components/Aos";
const queryClient = new QueryClient()
export  function App() {
  return (
    <div >
      <QueryClientProvider client={queryClient}>
        <Routes />
        <MyFunctionalComponent/>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </div>
  );
}