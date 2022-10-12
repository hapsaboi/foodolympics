import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { common } from '../data/images';
import artist1 from '../images/artist/artist1.png';
import artist2 from '../images/artist/artist2.png';
import artist3 from '../images/artist/artist3.png';

import Slider from "react-slick";

import Header, { LogoLink } from "../components/headers/light.js";


const StyledHeader = styled(Header)`
  ${tw`justify-between`}
  ${LogoLink} {
    ${tw`mr-8 pb-0`}
  }
`;

// const NavLink = tw(NavLinkBase)`
//   sm:text-sm sm:mx-6
// `;

const Container = tw.div`relative -mx-8 -mt-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row bg-gray-100`;
const LeftColumn = tw.div`ml-8 mr-8 xl:pl-10 py-8`;
const RightColumn = styled.div`
  ${tw`bg-green-500 bg-cover bg-center xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`}
`;

const Content = tw.div`mt-24 lg:mt-24 lg:mb-24 flex flex-col sm:items-center lg:items-stretch`;
const Heading = tw.h1`text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black leading-none`;
const Paragraph = tw.p`max-w-md my-8 lg:my-5 lg:my-8 sm:text-lg lg:text-base xl:text-lg leading-loose`;

const Actions = styled.div`
  ${tw`mb-8 lg:mb-0`}
  .action {
    ${tw`text-center inline-block w-full sm:w-48 py-4 font-semibold tracking-wide rounded hocus:outline-none focus:shadow-outline transition duration-300`}
  }
  .primaryAction {
    ${tw`bg-primary-500 text-gray-100 hover:bg-primary-700`}
  }
  .secondaryAction {
    ${tw`mt-4 sm:mt-0 sm:ml-4 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800`}
  }
`;

export default ({
  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  },
  heading = (
    <>
      Purchase your ticket,
      <wbr />
      <br />
      <span tw="text-primary-500">anywhere you are.</span>
    </>
  ),
  description = "Oder your ticket today with our system and enjoy its wonderful service.",
  primaryActionUrl = "#tickets1",
  primaryActionText = "Tickets",
  secondaryActionUrl = "#whyus",
  secondaryActionText = "Why Us"
}) => {

  return (
    <>
      <Container>
        <TwoColumn>
          <LeftColumn>
            <StyledHeader collapseBreakpointClass="sm" />
            <Content>
              <Heading style={{ marginTop: "-30px" }}>{heading}</Heading>
              <Paragraph>{description}</Paragraph>
              <Actions>
                <a href={primaryActionUrl} className="action primaryAction">
                  {primaryActionText}
                </a>
                <a href={secondaryActionUrl} className="action secondaryAction">
                  {secondaryActionText}
                </a>
              </Actions>
            </Content>
          </LeftColumn>

          <RightColumn>
            <Slider {...settings} arrows={false} autoplay={true}>
              <div>
                <img src={artist3} alt="artist 1"></img>
              </div>
              {common.map((image, index) => {
                return (
                  <div>
                    <img src={image} alt={`artist ${index + 2}`}></img>
                  </div>
                )
              })}
            </Slider>
          </RightColumn>
        </TwoColumn>
      </Container>

    </>
  );
};
