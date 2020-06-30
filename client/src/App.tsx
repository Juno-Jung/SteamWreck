import React, { Component } from 'react';
import 'reset-css';
import Navbar from './components/Navbar/Navbar';


const navigation = {
  company: { name: "SteamWreck", to: "/" },
  links: [
    { name: "About", to: "/about" },
    { name: "FaveWreck", to: "/favourite" },
    { name: "WorstWreck", to: "/worst" },
    { name: "Logout", to: "/logout" },
  ]
};


export default class App extends Component {
  // the 'public' is a typescript feature.
  public render() {
    const { company, links } = navigation;

    return (
      <div className="App">
        <Navbar company={company} links={links} />
      </div>
    );
  }
}
