import Navbar from "react-bootstrap/Navbar";
import Routes from "./Routes.tsx";
import QMS_Logo from "./assets/QMS_Logo.png"
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { AppContext, AppContextType } from "./lib/contextLib";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { onError } from "./lib/errorLib";
import "./App.css";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }catch (error) {
      if (error !== "No current user") {
        onError(error);
      }
    }
  
    setIsAuthenticating(false);
  }
  
  async function handleLogout() {

    await Auth.signOut();
    sessionStorage.removeItem('userType')
    userHasAuthenticated(false);
    nav("/login");
  }

  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
          <LinkContainer to="/">
            <Navbar.Brand>
                    <img
                      src={QMS_Logo}
                      width="50"
                      height="auto"
                      alt="QMS"
                    />
              </Navbar.Brand>
          </LinkContainer>  
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                ) : (
                  <>
                    <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                  </>
                )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider
          value={{ isAuthenticated, userHasAuthenticated } as AppContextType}
        >
          <Routes />
        </AppContext.Provider>

      </div>
    )  
  );
}

export default App;
