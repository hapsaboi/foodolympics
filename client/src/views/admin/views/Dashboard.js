import React, { useEffect, useState } from "react";
import { ticket } from "../../../data/api";
import axios from "axios";
// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Notifications from "components/Notification/Notification";


function Dashboard() {
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });
  const [stats, setStats] = useState({});


  useEffect(
    () => {

      async function fetchStats() {
        await axios.get(ticket.showStats).then((res) => {

          if (res.data.status === true) {
            setStats(res.data.data);
          }
          else {
            setNotificationDetails({ msg: "Error Loading Dashoard, Please Referesh The Page", type: "danger" });
            setNotificationStatus(true);
          }
        });

      }
      fetchStats();
    },
    []);


  return (
    <>
      {notificationStatus === true ? <Notifications details={notificationDetails} /> : null}

      <Container fluid>
        {Object.keys(stats).length > 0 ?
          <>
            <Row>
              <Col lg="6" sm="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-circle-09 text-warning"></i>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Succesful Tickets</p>
                          <Card.Title as="h4">Succesful Tickets: {stats?.success}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-redo mr-1"></i>
                      Update Now
                    </div>
                  </Card.Footer>
                </Card>
              </Col>

              <Col lg="6" sm="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-circle-09 text-warning"></i>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Units Sold</p>
                          <Card.Title as="h4">Units Sold: {stats?.units[0]?.sum}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-redo mr-1"></i>
                      Update Now
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col lg="6" sm="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-circle-09 text-warning"></i>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Reversed Payments</p>
                          <Card.Title as="h4">Reversed Tickets: {stats?.reversed}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-redo mr-1"></i>
                      Update Now
                    </div>
                  </Card.Footer>
                </Card>
              </Col>

              <Col lg="6" sm="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-circle-09 text-warning"></i>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Used Tickets</p>
                          <Card.Title as="h4">Used Tickets: {stats?.used}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-redo mr-1"></i>
                      Update Now
                    </div>
                  </Card.Footer>
                </Card>
              </Col>

            </Row>
          </>
          :
          null
        }

      </Container >
    </>
  );
}

export default Dashboard;
