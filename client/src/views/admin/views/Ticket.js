import React, { useState, useEffect } from "react";
import axios from "axios";
import { ticket } from "../../../data/api";
import Notifications from "../../../components/Notification/Notification.js";
import TicketData from './TicketData'
import { Input } from 'reactstrap';
// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col, Button
} from "react-bootstrap";

function TableList() {
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });
  const [tickets, setTickets] = useState([]);
  const [single, setSingle] = useState({});
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [ticket_ref, setTRef] = useState("");
  const [found, setFound] = useState({});


  useEffect(
    () => {
      async function fetchTickets() {
        await axios.get(ticket.showTickets).then((response) => {
          if (response.data.status === true) {
            setTickets(response.data.data);
          }
          else {
            setNotificationDetails({ msg: "Error Loading Tickets, Please Referesh The Page", type: "danger" });
            setNotificationStatus(true);
          }
        })
      }
      fetchTickets();
    },
    []);

  async function fetchOne() {
    setFound({});
    await axios.get(ticket.showUserTickets + "/" + ticket_ref).then((response) => {
      if (response.data.status === true) {
        setFound(response.data.data);
      }
      else {
        setNotificationDetails({ msg: response.data.msg, type: "danger" });
        setNotificationStatus(true);
      }
    })
  }
  async function updateTicket() {

    await axios.patch(ticket.updateTicketStatus + "/" + found.ticket_ref, { status: "used" }).then((res) => {
      if (res.data.status) {
        setNotificationDetails({ msg: "Ticket updated successfully", type: "success" });
        setFound({});
        setTRef("");
      }
      else {
        setNotificationDetails({ msg: "Error updating ticket", type: "danger" });
      }
      setNotificationStatus(true);
    });
  }

  const thead = ["Email", "Type", "Quantity", "Ticket Number", "Status", "Action"];
  return (
    <>
      {notificationStatus ? <Notifications details={notificationDetails} /> : null}
      <Container fluid>
        <Row>
          {!show ?
            <Col md="12">
              <h5>Search for ticket:</h5>
              <Row>
                <Col md={10}><Input placeholder="Search by ID" value={ticket_ref} onChange={(e) => setTRef(e.target.value)} /></Col>
                <Col md={2}><Button style={{ background: "green", border: "white", color: "white", display: "flex", alignItems: "center", width: "100%" }} onClick={() => { fetchOne() }}>Search Ticket</Button></Col>
                {/* <Container></Container> */}
              </Row>
              <hr />
              {Object.keys(found).length > 0 ?
                <Row>
                  <Col ><h3>Type: {found.type}</h3></Col>
                  <Col ><h3>Admits: {found.quantity}</h3></Col>
                  <Col><Button style={{ background: "green", border: "white", color: "white", display: "flex", alignItems: "center", width: "100%" }} onClick={() => { updateTicket() }}>Admit User(s)</Button></Col>
                </Row>
                : null
              }
              <hr />
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">Tickets</Card.Title>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        {thead.map((prop, key) => {
                          return <th className="bticket-0" key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.length > 0 ?
                        <>
                          {tickets.map((f, key) => {
                            return (
                              <tr key={key}>
                                <td>{f.email} </td>
                                <td>{f.type} </td>
                                <td>{f.quantity} </td>
                                <td>{f.ticket_ref} </td>
                                <td>{f.status} </td>
                                <td><Button style={{ fill: "blue", display: "flex", alignItems: "center" }} onClick={() => { setSingle(f); setAdd(false); setShow(true); }}>View</Button></td>
                              </tr>
                            );
                          })}
                        </>
                        : null}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            :
            <>
              <TicketData ldata={single} setShow={setShow} />
            </>
          }
        </Row>
      </Container>
    </>
  );
}

export default TableList;
