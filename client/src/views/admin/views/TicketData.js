import React, { useState } from "react";
import axios from "axios";
import { ticket } from "../../../data/api";
import Notifications from "components/Notification/Notification";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function TicketD({ ldata, setShow }) {
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });
  let ticketData = ldata;

  async function updateTicket() {

    await axios.patch(ticket.updateTicketStatus + "/" + ticketData.ticket_ref, { status: "used" }).then((res) => {
      if (res.data.status) {
        setNotificationDetails({ msg: "Ticket updated successfully", type: "success" });
        ldata.status = "used";
      }
      else {
        setNotificationDetails({ msg: "Error updating ticket", type: "danger" });
      }
      setNotificationStatus(true);
    });
  }

  return (
    <>
      {notificationStatus ? <Notifications details={notificationDetails} /> : null}
      <Container fluid>
        <Button style={{ fill: "blue", display: "flex", alignItems: "center" }} onClick={() => { setShow(false) }}>Back</Button>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Ticket Detail: {ldata.ticket_ref}</Card.Title>
              </Card.Header>
              <Card.Body>

                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Email</label><br />
                        {ldata.email}
                      </Form.Group>
                    </Col>

                    < Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Name</label><br />
                        {ldata?.name}
                      </Form.Group>
                    </Col>

                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Type</label><br />
                        {ldata.type}
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Quantity</label><br />
                        {ldata.quantity}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Date Booked</label><br />
                        {new Date(ldata.date_booked).toLocaleDateString() + " : " + new Date(ldata.date_booked).toLocaleTimeString()}
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Date Used</label><br />
                        {ldata.date_used ? <>{new Date(ldata.date_used).toLocaleDateString() + " : " + new Date(ldata.date_used).toLocaleTimeString()}</> : " - "}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>

                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Status</label><br />
                        {ldata.status}
                      </Form.Group>
                    </Col>
                  </Row>



                  <Button
                    className="btn-fill pull-right"
                    variant="info"
                    disabled={ldata.status === "success" ? false : true}
                    onClick={() => { updateTicket() }}
                  >
                    Use Ticket
                  </Button>
                  <div className="clearfix"></div>
                </Form>
                <div className="clearfix"></div>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TicketD;
