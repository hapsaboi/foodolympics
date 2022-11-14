import React from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import { Row, Col } from "reactstrap";
import { confirmed } from '../data/images';


const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;


export default () => {


  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{"What to expect"}</Header>

        </HeaderRow>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <hr />
          {confirmed.map((image, index) => (
            <Col key={index} md={3} style={{ marginBottom: "10px" }}>
              <Card className="group" initial="rest" whileHover="hover" animate="rest">
                <CardImageContainer imageSrc={image} style={{ width: "100%" }}>
                </CardImageContainer>
              </Card>
            </Col>
          ))}
        </Row>

      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />

    </Container >
  );
};

