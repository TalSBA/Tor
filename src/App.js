import { HashRouter, Route, Switch } from "react-router-dom";
import "./Styles/App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import CreateCalendar from "./Pages/CreateCalendar/CreateCalendar";
import Calendar from "./Pages/Calendar/Calendar";
import Menu from "./Components/Menu/Menu";
import Footer from "./Components/Footer/Footer";
import usersJSON from "./data/Users.json";
import calendarsJSON from "./data/Calendars.json";

import { useEffect, useState } from "react";
import ConfirmCalendar from "./Pages/ConfirmCalendar/ConfirmCalendar";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import ScheduleAppointment from "./Pages/ScheduleAppointment/ScheduleAppointment";
import { AddToQueueSharp } from "@material-ui/icons";
import User from "./Model/User";

function App() {
  const [users, setUsers] = useState(usersJSON.map(plainUser => new User(plainUser)));
  const [activeUser, setActiveUser] = useState(null);
  const [calendars, setCalendars] = useState(calendarsJSON.map(plainCalendar => new User(plainCalendar)));


  useEffect(() => {
    setUsers(users);
  });
  function AddUser(user, calendar) {
    setUsers([...users, user]);
    setCalendars([...calendars, calendar]);
  }
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Menu
              activeUser={activeUser}
              onLogout={() => setActiveUser(null)}
            />
            <Home />
          </Route>
          <Route exact path="/login">
            <Menu
              activeUser={activeUser}
              onLogout={() => setActiveUser(null)}
            />
            <Login
              users={users}
              activeUser={activeUser}
              onLogin={(user) => setActiveUser(user)}
            />
          </Route>
          <Route exact path="/signup">
            <Signup
              activeUser={activeUser}
              onLogin={(user) => setActiveUser(user)}
              onSignup={(user, calendar) => AddUser(user, calendar)}
            />
          </Route>
          <Route exact path="/calendar">
            <Menu
              activeUser={activeUser}
              onLogout={() => setActiveUser(null)}
            />
            <Calendar activeUser={activeUser} />
          </Route>
          <Route exact path="/confirm-calendar">
            <Menu
              activeUser={activeUser}
              onLogout={() => setActiveUser(null)}
            />
            <ConfirmCalendar activeUser={activeUser} />
          </Route>
          <Route exact path="/schedule-appointment/:id">
            <ScheduleAppointment />
          </Route>
        </Switch>
      </HashRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
