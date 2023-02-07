import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import AllUsers from "./Components/AllUsers";
import AddUser from "./Components/AddUser";
import EditUser from "./Components/EditUser";
import NotFound from "./Components/NotFound";
import AllPages from "./Components/AllPages";
import AllAyahs from "./Components/AllAyahs";
import EditAyah from "./Components/EditAyah";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/all" component={AllUsers} exact />
        <Route path="/add" component={AddUser} exact />
        <Route path="/edit/:id" component={EditUser} exact />
        <Route path= "/allPages" component = {AllPages} exact />
        <Route path="/allAyahs/:pageId" component={AllAyahs} exact />
        <Route path="/editAyah/:number" component={EditAyah} exact />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
