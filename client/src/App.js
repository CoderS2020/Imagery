import React, { createContext, useReducer } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home-Page/Home';
import NavbarBootstrap from './components/header-footer/NavbarBootstrap';
import Login from './components/Login-Signup/Login';
import AboutPage from './components/About/AboutPage';
import Error from './components/header-footer/Error';
import Contact from './components/Contact/Contact';
import Privacy from './components/Terms/Privacy';
import CookiesPolicy from './components/Terms/CookiesPolicy';
import Logout from './components/Login-Signup/Logout';
import Activate from './components/Login-Signup/Activate';
import PasswordReset from './components/Login-Signup/PasswordReset';
import MyUploads from './components/Login-Signup/MyUploads';
import Explore from './components/Explore/Explore'
import { initialState, reducer } from "../src/reducer/UseReducer";
import { reducer1 } from "../src/reducer/UseReducer";
import IndividualUploader from './components/Board/IndividualUploader';
import Profilepage from "./components/Profile/Profilepage";
import Editprofile from "./components/Profile/Editprofile";
import ImageInformation from "./components/Board/ImageInformation";
import Likes from "./components/Profile/Likes";
import Collection from "./components/Profile/Collection";
import Userprofile from "./components/Profile/Userprofile";
import Today from "./components/Profile/Today";
import Popular from "./components/Explore/Popular";
import Quotes from "./components/Explore/ExplorePages/Quotes";
import Art from "./components/Explore/ExplorePages/Art";
import Photography from "./components/Explore/ExplorePages/Photography";
import FooterTwo from "./components/header-footer/FooterTwo"
import FooterSticky from './components/header-footer/FooterSticky';

export const UserContext = createContext();
export const InputContext = createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [state1, dispatch1] = useReducer(reducer1, "");


  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <InputContext.Provider value={{ state1, dispatch1 }}>

          <Router>
            <NavbarBootstrap />
            
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={AboutPage} />
              <Route path="/aboutpage" exact component={AboutPage} />
              <Route path="/today" exact component={Today} />


              <Route path="/contact" component={Contact} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/cookiespolicy" component={CookiesPolicy} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/activate/:link" component={Activate} />
              <Route path="/resetpassword/:link" component={PasswordReset} />



              <Route path="/explore" component={Explore} />
              <Route path="/myuploads" component={MyUploads} />
              <Route path="/homelogin" component={IndividualUploader} />
              <Route path="/profile" component={Profilepage} />

              <Route path="/settings" component={Editprofile} />
              <Route path="/imageinformation/:id" component={ImageInformation} />
              <Route path="/likes" component={Likes} />
              <Route path="/collection" component={Collection} />
              <Route path="/popular" component={Popular} />

              <Route path="/userprofile/:userId" component={Userprofile} />

              <Route path="/quotes" component={Quotes} />
              <Route path="/art" component={Art} />
              <Route path="/photography" component={Photography} />

              <Route >
                <Error />
              </Route>



            </Switch>
          {/* <FooterSticky/> */}
          </Router>
        </InputContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
