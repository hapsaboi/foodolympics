import React, { useState, useEffect } from "react";
import axios from "axios";
import { record } from "../data/api";
import Notifications from "components/Notification/Notification";

// react-bootstrap components
import {
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,Button
} from "react-bootstrap";

function FormD({ form, setShow }) {
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });
  const [records, setRecords] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [recordData, setRecordData] = useState({});

  useEffect(() => {
    async function fetchRecords() {
      
      await axios.get(record.showRecords, { params: { record_type: form.form_type, form_id:form._id } }).then((response) => {
        if (response.data.status === true) {
          console.log(response.data)
          setRecords(response.data.data);
        }
        else {
          setNotificationDetails({ msg: "Error Loading Records, Please Referesh The Page", type: "danger" });
          setNotificationStatus(true);
        }
      })
    }
    fetchRecords();
  }, []);

  const thead = ["Action", "Date Recorded"];
  return (
    <>
      {notificationStatus ? <Notifications details={notificationDetails} /> : null}
      <Container fluid>
        <Button style={{fill:"blue", display:"flex", alignItems:"center"}} onClick={()=>{setShow(false)}}>Back</Button>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4"></Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>Name: </label>
                      <br />
                      {form.name}
                    </Form.Group>
                  </Col>

                  <Col className="pl-1" md="6">
                    <Form.Group>
                      <label htmlFor="exampleInputEmail1">
                        Record Type
                      </label>
                      <br />
                      {form.record_type}
                    </Form.Group>
                  </Col>
                </Row>


                {form.volunteering ?
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Volunteering</label>
                        <br />
                        {form.volunteering}
                      </Form.Group>
                    </Col>
                  </Row>
                  : ""
                }

                {form.partnership ?
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Partnership</label>
                        <br />
                        {form.partnership}
                      </Form.Group>
                    </Col>
                  </Row>
                  : ""
                }

                {form.benefit || form.sponsoring ?
                    <>
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label>Money</label>
                            <br />
                            {form.benefit.money || form.sponsoring.money}
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label>Items</label>
                            <br />
                            {form.benefit.items || form.sponsoring.items}
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label>Description</label>
                            <br />
                            {form.benefit.description || form.sponsoring.description}
                        </Form.Group>
                        </Col>
                    </Row>
                    </>
                    
                    : ""
                }
                <div className="clearfix"></div>

              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            {!isAdd ?
              <Card className="card-user">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      {thead.map((prop, key) => {

                        return <th className="border-0" key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {records.length > 0 ?
                      <>
                        {records.map((f, key) => {
                          return (
                            <tr key={key}>

                              {f.benefit ?
                                <td> {f.benefit.money ? "Money: " + f.benefit.money : null} <br /> {f.benefit.items ? "Items: " + f.benefit.items : null} <br /> {f.benefit.description ? " Description: " + f.benefit.description : null} <br /> </td>
                                : null
                              }
                              {f.volunteering ? <td>{f.volunteering} </td> : null}
                              {f.partnership ? <td>{f.partnership} </td> : null}
                              <td>{new Date(f.date).toLocaleString()}</td>
                            </tr>
                          );
                        })}
                      </>
                      : ""}
                  </tbody>
                </Table>
              </Card>
              :
              <>
                {form.form_type === 'Needy' || form.form_type === 'Sponsor' ?
                  <>
                    <Form.Group>
                      <label>Money</label>
                      <Form.Control
                        placeholder="100"
                        type="text"
                        onChange={(e) => setRecordData({ ...recordData, money: e.target.value })}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <label>Items</label>
                      <Form.Control
                        placeholder="Soap, Food"
                        type="text"
                        onChange={(e) => setRecordData({ ...recordData, items: e.target.value })}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <label>Description</label>
                      <Form.Control
                        placeholder="This item..."
                        type="text"
                        onChange={(e) => setRecordData({ ...recordData, description: e.target.value })}
                      ></Form.Control>
                    </Form.Group>
                  </>
                  :
                  <>
                    {form.form_type === "Volunteer" ?
                      <Form.Group>
                        <label>volunteering</label>
                        <Form.Control
                          placeholder="Volunteering"
                          type="text"
                          onChange={(e) => setRecordData({ volunteering: e.target.value })}
                        ></Form.Control>
                      </Form.Group>
                      :
                      <Form.Group>
                        <label>Partnership</label>
                        <Form.Control
                          placeholder="Partnership"
                          type="text"
                          onChange={(e) => setRecordData({ partnership: e.target.value })}
                        ></Form.Control>
                      </Form.Group>
                    }
                  </>
                }
              </>
            }

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FormD;
