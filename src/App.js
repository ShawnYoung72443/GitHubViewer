import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Github from "./Github";
import Header from "./Components/Header";
import Auth0Lock from "auth0-lock";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: "",
      profile: {}
    };
  }

  static defaultProps = {
    clientID: "fIV3Y3Bh285XqBf9cbDqmgOqoTWDvjkY",
    domain: "dev-a2test.auth0.com"
  };

  componentWillMount() {
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain);

    this.lock.on("authenticated", authResult => {
      // console.log(authResult);

      this.lock.getProfile(authResult.accessToken, (error, profile) => {
        if (error) {
          console.log(error);
          return;
        }
        // console.log(profile);

        this.setProfile(authResult.accessToken, profile);
      });
    });
    this.getProfile();
  }

  setProfile(accessToken, profile) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("profile", JSON.stringify(profile));

    this.setState({
      accessToken: localStorage.getItem("accessToken"),
      profile: JSON.parse(localStorage.getItem("profile"))
    });
  }

  getProfile() {
    if (localStorage.getItem("accessToken") != null) {
      this.setState(
        {
          accessToken: localStorage.getItem("accessToken"),
          profile: JSON.parse(localStorage.getItem("profile"))
        },
        () => {
          console.log(this.state);
        }
      );
    }
  }

  showLock() {
    this.lock.show();
  }

  logout() {
    this.setState(
      {
        accessToken: "",
        profile: ""
      },
      () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("profile");
      }
    );
  }

  render() {
    let page;

    if (this.state.accessToken) {
      page = <Github />;
    } else {
      page = <h1 className='error'>Click on Login to search Github Viewer</h1>;
    }

    return (
      <div className='App'>
        <Header
          lock={this.lock}
          accessToken={this.state.accessToken}
          onLogout={this.logout.bind(this)}
          onLogin={this.showLock.bind(this)}
        />
        {page}
      </div>
    );
  }
}

export default App;
