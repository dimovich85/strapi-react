import { useState } from "react";
import { SnackbarProvider } from "notistack";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Auth } from "./components/Auth";
import { ProductsContent } from "./components/ProductContent";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const onAuth = (jwt, user = {}) => {
    setToken(jwt);
    setUser(user);
  };
  return (
    <div className="App">
      <SnackbarProvider maxSnack={5}>
        <CssBaseline />
        <Container>
          {token ? (
            <ProductsContent token={token} user={user} />
          ) : (
            <Auth onAuth={onAuth} />
          )}
        </Container>
      </SnackbarProvider>
    </div>
  );
}

export default App;
