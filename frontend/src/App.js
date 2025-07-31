import "./App.css";
import Homepage from "./Pages/HomePage";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/ChatPage";
import Loginpage from "./Pages/LoginPage";
import Navbar from "./Pages/Navbar";
import Adminlogin from "./Pages/Adminlogin";
import Admindashboard from "./Pages/Admindashboard";
import AdminView from "./Pages/AdminView";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Route path="/registration" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} exact/>
      <Route path="/log" component={Loginpage} exact/>
      <Route path="/" component={Navbar} exact/>
      <Route path="/admin" component={Adminlogin} exact/>
      <Route path="/admindash" component={Admindashboard}exact />
      <Route path="/view" component={AdminView} exact/>
      <Route path="/dash" component={Dashboard} exact/>
    </div>
  );
}
export default App;
