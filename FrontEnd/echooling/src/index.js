import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./Redux/Store"; 
import { QueryClientProvider, QueryClient } from "react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <>
    <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <BrowserRouter>
        <Provider store={store}> 
          <App />
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
    </QueryClientProvider>
  </>
);
