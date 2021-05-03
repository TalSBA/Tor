import { HashRouter, Route, Switch } from "react-router-dom";
import "./Styles/App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import CreateCalendar from "./Pages/CreateCalendar";
import Calendar from "./Pages/Calendar";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/create-calendar">
            <CreateCalendar />
          </Route>
          <Route exact path="/calendar">
            <Calendar />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
