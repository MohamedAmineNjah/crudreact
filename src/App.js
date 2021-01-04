import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../src/affichage/home";
import { Provider } from "react-redux";
import initStore from './param/store';
import add from "./affichage/add";
import edit from "./affichage/edit";

const store = initStore();


function App(props) {
  return (
    <Router>
      <div className="App">
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/new" component={add} />
            <Route exact path="/:id/edit" component={edit} />
            {/* <Route exact path="/users/edit/:id" component={ModUser} />
          <Route exact path="/posts/:id" component={DetailUser} />
          <Route exact path="/comments/:id" component={DetailComment} /> 
          <Route component={NotFound} />*/}
          </Switch>
        </Provider>
      </div>
    </Router>
  );
}

export default App;