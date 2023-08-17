import { QueryClientProvider,QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Routes from "./Routes/Routes";
const queryClient = new QueryClient()
export  function App() {
  return (
    <div >
      <QueryClientProvider client={queryClient}>
        <Routes />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </div>
  );
}