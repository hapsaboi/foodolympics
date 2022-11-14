import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "demos/FullWidthWithImage.js";
import Preview from "demos/Previews.js";
import Tickets from "demos/Tickets.js";
import FAQ from "demos/SingleCol";
import People from "demos/People";
import Footer from "demos/MiniCenteredFooter.js";
import { business } from "data/api.js";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";
import tw from "twin.macro";
// import Partners from "./Partners";


export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-green-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const imageCss = tw`rounded-4xl`;
  return (
    <AnimationRevealPage>
      <Hero />
      <Tickets />
      <People />
      <Preview
        subheading={<Subheading>A Reputed Brand</Subheading>}
        heading={<>Why <HighlightedText>Choose Us ?</HighlightedText></>}
        statistics={[
          {
            key: "Date : Time",
            value: business.date + " : " + business.time,
          },
          {
            key: business.venue,
            value: "Address"
          }
        ]}

        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
      />

      {/* <Partners
        subheading=""
        heading={<>Our Partners <HighlightedText>Love Us.</HighlightedText></>}
      /> */}
      {/* <SliderCard /> */}
      <FAQ />
      <Footer />
    </AnimationRevealPage>
  )
};
