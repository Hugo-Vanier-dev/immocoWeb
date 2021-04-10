import React from "react";
import "./App.css";
import SideMenu from "./components/navigation/sideMenu/SideMenu";
import { InitializeUserContext } from "./context/userContext";
import CreateClient from "./components/clients/CreateClient";
import ReadClient from "./components/clients/ReadClient";
import UpdateClient from "./components/clients/UpdateClient";
import DeleteClient from "./components/clients/DeleteClient";

import CreateRdv from "./components/planning/CreateRdv";
import ReadRdv from "./components/planning/ReadRdv";
import UpdateRdv from "./components/planning/UpdateRdv";
import DeleteRdv from "./components/planning/DeleteRdv";

import CreateProperty from "./components/properties/CreateProperty";
import ReadProperty from "./components/properties/ReadProperty";
import UpdateProperty from "./components/properties/UpdateProperty";
import DeleteProperty from "./components/properties/DeleteProperty";

import CreateUser from "./components/users/CreateUser";
import ReadUser from "./components/users/ReadUser";
import UpdateUser from "./components/users/UpdateUser";
import DeleteUser from "./components/users/DeleteUser";

import LoginPage from "./components/login/Login";

import DashboardPage from "./components/dashboard/Dashboard";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from './middleware/PrivateRoute';

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
                <PrivateRoute path="/deleteClient">
                  <DeleteClient />
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
                <PrivateRoute path="/deleteRdv">
                  <DeleteRdv />
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
                <PrivateRoute path="/deleteProperty">
                <DeleteProperty />
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
                <PrivateRoute path="/deleteUser">
                  <DeleteUser />
                </PrivateRoute>
              </Switch>
            </div>
            </InitializeUserContext>
        </Router>
      </div>
    );
}

export default App;
