import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

export default class Header extends Component {
  onLogin() {
    this.props.onLogin();
  }

  onLogout() {
    this.props.onLogout();
  }

  render() {
    let page;
    if (this.props.accessToken) {
      page = (
        <Nav.Link
          style={{ color: "#e6ebed" }}
          onClick={this.onLogout.bind(this)}
          href='#'
        >
          Logout
        </Nav.Link>
      );
    } else {
      page = (
        <Nav.Link
          style={{ color: "#e6ebed" }}
          onClick={this.onLogin.bind(this)}
          href='#'
        >
          Login
        </Nav.Link>
      );
    }

    return (
      <div>
        <Navbar bsStyle='default' style={{ background: "rgba(0, 0, 0, 0.8)" }}>
          <Navbar.Brand style={{ color: "#fefefe" }}>
            Github Searcher
          </Navbar.Brand>
          <Nav>{page}</Nav>
        </Navbar>
      </div>
    );
  }
}
