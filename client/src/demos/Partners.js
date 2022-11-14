import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container } from "components/misc/Layouts.js";
import { SectionHeading as Heading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";

// import image1 from '../images/partners/1.png';
// import image2 from '../images/partners/2.png';
// import image3 from '../images/partners/3.png';
// // import image4 from '../images/partners/4.png';
// // import image5 from '../images/partners/5.png';
// // import image6 from '../images/partners/6.png';
import logo from '../images/logo.png';
import logo_business from '../images/logo_business.png';

const Subheading = tw(SubheadingBase)`text-center`;
const Testimonials = tw.div`flex flex-col lg:flex-row items-center lg:items-stretch`;
const TestimonialContainer = tw.div`mt-16 lg:w-1/3`;
const Testimonial = tw.div`px-4 text-center max-w-xs mx-auto flex flex-col items-center`;
const Image = tw.img`w-20 h-20 rounded-full`;
const Quote = tw.blockquote`mt-5 text-gray-600 font-medium leading-loose`;
const CustomerName = tw.p`mt-5 text-gray-900 font-semibold uppercase text-sm tracking-wide`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute left-0 top-0 h-56 w-56 opacity-15 transform -translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute right-0 bottom-0 h-64 w-64 opacity-15 transform translate-x-2/3 text-yellow-500`}
`;

export default ({
    subheading = "Testimonials",
    heading = "Customer's Review",
    testimonials = [
        {
            imageSrc: logo,
        },
        // {
        //     imageSrc: image1,
        // },
        // {
        //     imageSrc: image2,
        // },
        // {
        //     imageSrc: image3,
        // },
        // {
        //     imageSrc: image4,
        // },
        // {
        //     imageSrc: image5,
        // },
        // {
        //     imageSrc: image6,
        // }

    ]
}) => {
    return (
        <Container>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            <Testimonials style={{ textAlign: "center" }}>
                {testimonials.map((testimonial, index) => (
                    <TestimonialContainer>
                        <Testimonial>
                            <Image src={testimonial.imageSrc} style={{ width: "auto", minHeight: "100px" }} />
                        </Testimonial>

                    </TestimonialContainer>
                ))}
            </Testimonials>
            <DecoratorBlob1 />
            <DecoratorBlob2 />
        </Container>
    );
};
