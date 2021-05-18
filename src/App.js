import { HashRouter, Route, Switch } from "react-router-dom";
import "./Styles/App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Calendar from "./Pages/Calendar/Calendar";
import Menu from "./Components/Menu/Menu";
import Footer from "./Components/Footer/Footer";
import usersJSON from "./data/Users.json";
import calendarsJSON from "./data/Calendars.json";
import { useEffect, useState } from "react";
import ConfirmCalendar from "./Pages/ConfirmCalendar/ConfirmCalendar";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import ScheduleAppointment from "./Pages/ScheduleAppointment/ScheduleAppointment";
import UserModel from "./Model/User";
import CalendarModel from "./Model/Calendar";
import Settings from "./Pages/Settings/Settings";
import { appointments } from "./data/appointments";

function App() {
  const [users, setUsers] = useState(
    usersJSON.map((plainUser) => new UserModel(plainUser))
  );
  const [activeUser, setActiveUser] = useState(null);
  const [calendars, setCalendars] = useState(
    calendarsJSON.map((plainCalendar) => new CalendarModel(plainCalendar))
  );
  const [userCalendar, setUserCalendar] = useState(null);
  const [appointmentsData, setAppointmentsData] = useState(appointments);

  function AddUser(user, calendar) {
    setUsers([...users, user]);
    setCalendars([...calendars, calendar]);
  }
  function handleLogin(user, calendar) {
    setActiveUser(user);
    setUserCalendar(calendar);
  }

  function userDetailsChangedHandle(updatedUser) {
    // console.log(users);
    let newActiveUser;
    const updatedUsers = [
      ...users.map((user) => {
        if (user.id == updatedUser.id) {
          console.log(user);
          user = new UserModel(updatedUser);
          newActiveUser = user;
        }
        return user;
      }),
    ];
    setUsers(updatedUsers);
    setActiveUser(newActiveUser);
  }

  function calendarGeneralDetailsChangedHandle(
    id,
    bName,
    address,
    bType,
    phone,
    image
  ) {
    let userCalendar;
    const updatedCalendars = [
      ...calendars.map((calendar) => {
        if (calendar.id == id) {
          calendar.name = bName;
          calendar.address = address;
          calendar.type = bType;
          calendar.phone = phone;
          calendar.image = image;
          calendar = new CalendarModel({ ...calendar });
          userCalendar = calendar;
        }
        return calendar;
      }),
    ];
    setCalendars(updatedCalendars);
    setUserCalendar(userCalendar);
  }

  function servicesChangedHandle(calendarId, services) {
    let userCalendar;
    const updatedCalendars = [
      ...calendars.map((calendar) => {
        if (calendar.id == calendarId) {
          calendar.services = services;
          calendar = new CalendarModel({ ...calendar });
          userCalendar = calendar;
        }
        return calendar;
      }),
    ];
    setCalendars(updatedCalendars);
    setUserCalendar(userCalendar);
  }
  function activityHoursChangedHandle(calendarId, updatedActivityHours) {
    let userCalendar;
    const updatedCalendars = [
      ...calendars.map((calendar) => {
        if (calendar.id == calendarId) {
          calendar.activityHours = updatedActivityHours;
          calendar = new CalendarModel({ ...calendar });
          userCalendar = calendar;
        }
        return calendar;
      }),
    ];
    setCalendars(updatedCalendars);
    setUserCalendar(userCalendar);
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
              calendars={calendars}
              activeUser={activeUser}
              onLogin={(user, calendar) => handleLogin(user, calendar)}
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
            <Calendar
              activeUser={activeUser}
              calendar={userCalendar}
              appointments={appointmentsData}
              onUpdateAppointments={(appointments) =>
                setAppointmentsData(appointments)
              }
            />
          </Route>
          <Route exact path="/confirm-calendar">
            <Menu
              activeUser={activeUser}
              onLogout={() => setActiveUser(null)}
            />
            <ConfirmCalendar activeUser={activeUser} />
          </Route>
          <Route exact path="/schedule-appointment/:id">
            <ScheduleAppointment calendars={calendars} users={users} />
          </Route>
          <Route exact path="/settings">
            <Menu
              activeUser={activeUser}
              onLogout={() => setActiveUser(null)}
            />
            <Settings
              activeUser={activeUser}
              calendar={userCalendar}
              onChangeUser={(user) => userDetailsChangedHandle(user)}
              onChangeGeneralDetails={(
                id,
                bName,
                address,
                bType,
                phone,
                image
              ) =>
                calendarGeneralDetailsChangedHandle(
                  id,
                  bName,
                  address,
                  bType,
                  phone,
                  image
                )
              }
              onChangeServices={(calendarId, services) =>
                servicesChangedHandle(calendarId, services)
              }
              onChangeActivityHours={(calendarId, activityHours) =>
                activityHoursChangedHandle(calendarId, activityHours)
              }
            />
          </Route>
        </Switch>
      </HashRouter>
      <Footer />
    </div>
  );
}

export default App;
