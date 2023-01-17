import React from "react";
import { SnackbarProvider } from "notistack";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Auth } from "./components/Auth";
import { ProductsContent } from "./components/ProductContent";
import { SimpleContext } from "./context/simpleContext";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { token } = useAuth();
  return (
    <SimpleContext.Provider value={"POLOS"}>
      <div className="App">
        <SnackbarProvider maxSnack={5}>
          <CssBaseline />
          <Container>{token ? <ProductsContent /> : <Auth />}</Container>
        </SnackbarProvider>
      </div>
    </SimpleContext.Provider>
  );
}

export default App;
