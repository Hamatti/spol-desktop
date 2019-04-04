import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "App.scss";

/** Page and components of top level */
import { HomePage } from "pages/HomePage";
import { Navigation } from "components/Navigation";
import { Footer } from "components/Footer";

/** Module pages */
import RegistrationPage from "modules/Registration/pages/RegistrationPage";
import CupPage from "modules/Cup/pages/CupPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1>SPOL-DESKTOP</h1>
          </header>
          <nav>
            <Navigation />
          </nav>
          <main>
            <Switch>
              <Route path="/registration" component={RegistrationPage} />
              <Route path="/cup" component={CupPage} />
              <Route exact path="/" component={HomePage} />
            </Switch>
          </main>
          <div className="push" />
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
