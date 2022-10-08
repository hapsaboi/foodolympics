import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <nav>
            <br />
            <p className="text-center">
              © {new Date().getFullYear()}{" "}
              <span>Zinger Technologies Ltd</span>
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
