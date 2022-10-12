import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "demos/FullWidthWithImage.js";
import Preview from "demos/Previews.js";
import Tickets from "demos/Tickets.js";
import FAQ from "demos/SingleCol";
import People from "demos/People";
import Footer from "demos/MiniCenteredFooter.js";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";
import tw from "twin.macro";
import Partners from "./Partners";


export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const imageCss = tw`rounded-4xl`;
  return (
    <AnimationRevealPage>
      <Hero />
      {/*<CountdownCircleTimer
        isPlaying
        duration={100}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
      >
        {({ remainingTime }) => { new Date(remainingTime) }}
      </CountdownCircleTimer> */}
      <Tickets />
      <People />
      <Preview
        subheading={<Subheading>A Reputed Brand</Subheading>}
        heading={<>Why <HighlightedText>Choose Us ?</HighlightedText></>}
        statistics={[
          {
            key: "Date",
            value: "6th Nov, 2022",
          },
          {
            key: "PlayZone Area, Anisza Foundation and Gallery, The Exhibition Pavilion, Opposite Radio House Area 11 Garki.",
            value: "Address"
          }
        ]}

        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
      />

      <Partners
        subheading=""
        heading={<>Our Partners <HighlightedText>Love Us.</HighlightedText></>}
      />
      {/* <SliderCard /> */}
      <FAQ />
      <Footer />
    </AnimationRevealPage>
  )
};
