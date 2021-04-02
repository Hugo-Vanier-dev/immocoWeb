import React from "react";
import "./App.css";
import SideMenu from "./components/navigation/sideMenu/SideMenu";

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
          <div className="divSideMenu col-start-1 col-span-1"><SideMenu /></div>
          <div className="divContentArea lg:col-start-2 lg:col-span-10 md:col-start-3 md:col-span-10 sm:col-start-1 sm:col-span-10">
            <Switch>
                                                    <Route path="/" exact component={LoginPage} />
                                                    <Route path="/home" component={Home} />

                                                    <Route path="/createClient" component={CreateClient} />
                                                    <Route path="/updateClient" component={UpdateClient} />
                                                    <Route path="/readClient" component={ReadClient} />
                                                    <Route path="/deleteClient" component={DeleteClient} />

                                                    <Route path="/createRdv" component={CreateRdv} />
                                                    <Route path="/updateRdv" component={UpdateRdv} />
                                                    <Route path="/readRdv" component={ReadRdv} />
                                                    <Route path="/deleteRdv" component={DeleteRdv} />

                                                    <Route path="/createProperty" component={CreateProperty} />
                                                    <Route path="/updateProperty" component={UpdateProperty} />
                                                    <Route path="/readProperty" component={ReadProperty} />
                                                    <Route path="/deleteProperty" component={DeleteProperty} />

                                                    <Route path="/createUser" component={CreateUser} />
                                                    <Route path="/updateUser" component={UpdateUser} />
                                                    <Route path="/readUser" component={ReadUser} />
                                                    <Route path="/deleteUser" component={DeleteUser} />

                                                    <Route path="/dashboardPage" component={DashboardPage} />
                                                  </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;
