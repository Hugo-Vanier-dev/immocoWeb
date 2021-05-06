import React from "react";
import "./App.css";
import SideMenu from "./components/navigation/sideMenu/SideMenu";
import { InitializeUserContext } from "./shared/context/userContext";
import CreateClient from "./components/Clients/CreateClient";
import ReadClient from "./components/Clients/ReadClient";
import UpdateClient from "./components/Clients/UpdateClient";
import ListClient from "./components/Clients/ListClient";

import CreateRdv from "./components/Planning/CreateRdv";
import ReadRdv from "./components/Planning/ReadRdv";
import UpdateRdv from "./components/Planning/UpdateRdv";

import CreateProperty from "./components/Properties/CreateProperty";
import ReadProperty from "./components/Properties/ReadProperty";
import UpdateProperty from "./components/Properties/UpdateProperty";

import CreateUser from "./components/Users/CreateUser";
import ReadUser from "./components/Users/ReadUser";
import UpdateUser from "./components/Users/UpdateUser";

import LoginPage from "./components/login/Login";

import DashboardPage from "./components/dashboard/Dashboard";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from './shared/middleware/PrivateRoute';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

function App() {
    return (
      <div className="App grid grid-cols-10">
        <Router>
            <InitializeUserContext>
            <PrivateRoute> 
            <div className="divSideMenu col-start-1 col-span-1">
              <SideMenu />
            </div>
            </PrivateRoute>
            <div className="divContentArea lg:col-start-2 lg:col-span-10 md:col-start-3 md:col-span-10 sm:col-start-1 sm:col-span-10">
              <Switch>

                <Route path="/login" exact component={LoginPage} />
                <PrivateRoute path="/dashboard">
                  <DashboardPage />
                </PrivateRoute>

                <PrivateRoute path="/createClient">
                  <CreateClient />
                </PrivateRoute>
                <PrivateRoute path="/updateClient/:id">
                  <UpdateClient />
                </PrivateRoute>
                <PrivateRoute path="/readClient/:id">
                  <ReadClient />
                </PrivateRoute>
                <PrivateRoute path="/listClient">
                  <ListClient />
                </PrivateRoute>

                <PrivateRoute path="/createRdv">
                  <CreateRdv />
                </PrivateRoute>
                <PrivateRoute path="/updateRdv/:id">
                  <UpdateRdv />
                </PrivateRoute>
                <PrivateRoute path="/readRdv/:id">
                  <ReadRdv />
                </PrivateRoute>

                <PrivateRoute path="/createProperty">
                  <CreateProperty />
                </PrivateRoute>
                <PrivateRoute path="/updateProperty/:id">
                  <UpdateProperty />
                </PrivateRoute>
                <PrivateRoute path="/readProperty/:id">
                  <ReadProperty />
                </PrivateRoute>
  
                <PrivateRoute path="/createUser">
                  <CreateUser />
                </PrivateRoute>
                <PrivateRoute path="/updateUser/:id">
                  <UpdateUser />
                </PrivateRoute>
                <PrivateRoute path="/readUser/:id">
                  <ReadUser />
                </PrivateRoute>

              </Switch>
            </div>
            </InitializeUserContext>
        </Router>
      </div>
    );
}

export default App;
