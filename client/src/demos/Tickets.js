import React, { useState, useEffect } from "react";
import axios from 'axios';
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import logo from "../images/logo_business.png";
import zinger_logo from "../images/zinger1.png";
import { Row, Col, Input, FormGroup, FormFeedback, Label } from "reactstrap";
import { QuantityPicker } from 'react-qty-picker';
import { ticket, business } from '../data/api';
import CryptoJS from "crypto-js";
import { toPng } from 'html-to-image';
import GridLoader from "react-spinners/GridLoader";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';

import Notifications from "components/Notification/Notification";

import { io } from 'socket.io-client';
import { BackEnd } from "../data/api.js";

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;


const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;


export default () => {
  let tickets = [
    {
      type: "Test1",
      price: 100,
      status: "available"
    },
    {
      type: "Early Birds",
      price: 3000,
      status: "available"
    },
    {
      type: "Prime",
      price: 100000,
      status: "available"
    },
    {
      type: "Platinum",
      price: 150000,
      status: "available"
    },

  ];
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [ticketData, setTicket] = useState({});
  const [paymentStatus, setPaymentStatus] = useState("initial");
  const [user, setUser] = useState({});
  const [verify, setVerify] = useState({ email: false });
  const toggle = () => setModal(!modal);
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [socketData, setSocketData] = useState({});

  const [requestLoading, setRequestLoading] = useState(false);

  function reset() {
    setPaymentStatus("initial");
    setTicket({});
    setUser({});
    setQuantity(1);
    setVerify({ email: false });
    setLoading(false);
  }
  useEffect(() => {
    if (socket === null) {
      setSocket(io(BackEnd));
    }
    if (socket) {
      socket.on('connection', () => {
        let socketID = socket.id
      })


      socket.on('msg', (data) => {
        setPaymentStatus(data.status);
        setSocketData(data);
      })
    }
  }, [socket])


  async function createTicket() {
    setRequestLoading(true);
    // let data = await encrypt({ ticket: ticket, quantity, user });
    let data = { ticket: selected, quantity, user };

    await axios.post(ticket.createTicket + "/" + socket.id, data).then((response) => {
      if (response.data.status === true) {
        setTicket(response.data.data);
        setNotificationDetails({ msg: "Ticket(s) created, please proceed to payment.", type: "success" });
        setNotificationStatus(true);
      }
      else {
        setNotificationDetails({ msg: "Error adding ticket, please try again.", type: "danger" });
        setNotificationStatus(true);
      }
      setRequestLoading(false);
    }).catch((error) => {
      if (error.response) {
        setNotificationDetails({ msg: error.response.data.msg, type: "danger" });
        setNotificationStatus(true);
      } else {
        setNotificationDetails({ msg: "Network Error!", type: "danger" });
        setNotificationStatus(true);
      }

      setRequestLoading(false);

    })
  }
  function isValidEmail(email) {
    let result = /\S+@\S+\.\S+/.test(email);
    if (result) {
      setVerify({ ...verify, email: true })
    } else {
      setVerify({ ...verify, email: false })
    }
    return result;
  }

  function saveImg() {
    toPng(document.getElementById('ticket-download'))
      .then(function (dataUrl) {
        const link = document.createElement('a')
        link.download = 'ticket.png'
        link.href = dataUrl
        link.click()
      });
  }



  return (
    <Container id="tickets1">
      {notificationStatus === true ? <Notifications details={notificationDetails} /> : null}
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{"Tickets"}</Header>

        </HeaderRow>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <hr />
          {tickets.map((card, index) => (
            <Col key={index} md={3}>
              <Card className="group" href={card.url} initial="rest" whileHover="hover" animate="rest">
                <CardImageContainer imageSrc={logo} style={{ width: "100%" }}>
                  <CardRatingContainer>
                    <CardRating>
                      <StarIcon />
                      {5}
                    </CardRating>
                  </CardRatingContainer>
                  <CardHoverOverlay
                    variants={{

                      hover: {
                        opacity: 1,
                        height: "auto"
                      },
                      rest: {
                        opacity: 0,
                        height: 0
                      }
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardButton onClick={() => { toggle(); setSelected(card) }}>Buy Now</CardButton>
                  </CardHoverOverlay>
                </CardImageContainer>
                <CardText>
                  <CardTitle>{card.type}</CardTitle>
                  <CardContent>{card.content}</CardContent>
                  <CardPrice>₦: {card.price.toLocaleString()}</CardPrice>
                  <CardButton onClick={() => { toggle(); setSelected(card) }}>Buy Now</CardButton>
                </CardText>
              </Card>
            </Col>
          ))}
        </Row>

      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
      <Modal
        isOpen={modal}
        toggle={toggle}
        backdrop={true}
      >
        <ModalHeader toggle={toggle}>Ticket Selection</ModalHeader>
        <ModalBody>
          {paymentStatus === "success" ?
            <>
              <div style={{ textAlign: "center", background: "white", padding: "10px" }} id="ticket-download">
                <img alt="business logo" style={{ width: "50%", marginLeft: "auto", marginRight: "auto", display: "block" }} src={logo} />
                <>{business.title}</>
                <h4 style={{ marginTop: "-3px" }}>Date: {business.date}</h4>
                <h4 style={{ marginTop: "-15px" }}>Time: {business.time}</h4>
                <h4 style={{ marginTop: "-15px" }}>Ticket No: <b>{ticketData?.ticket?.ticket_ref}</b></h4>
                <h5>Address: {business.venue}</h5>
              </div>

              <div style={{ textAlign: "center" }}>
                <Button color="success" style={{ background: "green", color: "white" }} onClick={saveImg}>
                  Save Ticket
                </Button>
              </div>
            </>
            : null
          }
          {paymentStatus === "initial" ?
            <>
              {
                Object.keys(ticketData).length === 0 ?
                  <>
                    <Row>
                      <Col><img alt="Company Logo" src={logo} /></Col>
                      <Col style={{
                        padding: "20px"
                      }}>
                        <div><h5>The Saplio Show.</h5></div>
                        <div><h5>Date:6th Nov, 2022.</h5></div>
                        <div style={{ marginTop: "-20px" }}><b>{selected.type}</b></div>

                        <QuantityPicker style={{ marginTop: "-100px" }} min={1} max={100} value={1} onChange={(value) => setQuantity(value)} smooth />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup className="position-relative">
                          <Label for="examplePassword">
                            Enter Email
                          </Label>
                          <Input invalid={!verify.email} onChange={(e) => { setUser({ ...user, email: e.target.value }); isValidEmail(e.target.value) }} />
                          <FormFeedback tooltip>
                            Email not vaild.
                          </FormFeedback>
                        </FormGroup>
                      </Col>

                    </Row>
                    <h4 style={{ textAlign: "center", padding: "10px" }}>
                      <b>Total: ₦{(selected.price * quantity).toLocaleString()}</b><br />
                      <Button disabled={!verify.email || requestLoading} color="success" style={{ background: "green", color: "white" }} onClick={createTicket}>
                        Proceed to Payment
                      </Button>
                    </h4>
                  </>
                  :
                  <>

                    <div style={{ textAlign: "center" }}>
                      <img alt="zinger logo" style={{ width: "70%", marginLeft: "auto", marginRight: "auto", display: "block" }} src={zinger_logo} />{
                        loading ?
                          <>
                            <GridLoader color={"black"} loading={true} size={40} />
                            Verifying your payment.
                          </>
                          :
                          <>
                            <h4>Payment Bank: {ticketData?.payment_details?.bank_name}</h4>
                            <h4 style={{ marginTop: "-10px" }}>Account Name: {ticketData?.payment_details?.account_name}</h4>
                            <h4 style={{ marginTop: "-10px" }}>Account No: {ticketData?.payment_details?.account_no}</h4>
                            <h4 style={{ marginTop: "-10px" }}>Amount: ₦{(ticketData?.payment_details?.amount).toLocaleString()}</h4>
                            Note: Any payment less than the specified amount, wll lead to an instant reversal minus the charges

                            <Button style={{ background: "green", color: "white" }} onClick={() => { setLoading(true) }}>I have made the payment</Button>
                          </>
                      }
                    </div>



                  </>
              }
            </>
            : null
          }
          {paymentStatus === "reversed" ?
            <>
              {
                Object.keys(socketData).length > 0 ?
                  <div style={{ textAlign: "center" }}>
                    <img alt="zinger logo" style={{ width: "70%", marginLeft: "auto", marginRight: "auto", display: "block" }} src={zinger_logo} />

                    <h4 style={{ textAlign: "center", padding: "10px" }}>
                      <b>Invalid Amount Supplied</b><br />
                      <b>Supplied: ₦{(socketData.amount).toLocaleString()}</b><br />
                      <b>Actual Amount: ₦{((selected.price * quantity) + 100).toLocaleString()}</b><br />
                      Note: the sum of {(socketData.amount - 100)} will be reversed to the account.
                      <Button onClick={() => reset()} color="success" style={{ background: "green", color: "white" }}>
                        Try again
                      </Button>
                    </h4>
                  </div>
                  :
                  null
              }
            </>
            : null
          }
        </ModalBody>
      </Modal>
    </Container >
  );
};

