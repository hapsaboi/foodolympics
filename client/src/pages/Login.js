import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-illustration.svg";
//import logo from "images/logo.svg";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import Axios from 'axios';
import { authenticate } from '../data/api';
import { useAuth } from '../contexts/AuthContext';
import logo_business from '../images/logo_business.png';
import logo from '../images/zinger1.png';

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

function Login() {

  let data = {
    logoLinkUrl: "#",
    illustrationImageSrc: illustration,
    headingText: "Sign In",
    submitButtonText: "Sign In",
    SubmitButtonIcon: LoginIcon,
    forgotPasswordUrl: "#",
    signupUrl: "/signup",
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();
  const { getLoggedIn } = useAuth();


  async function loginFunc(e) {
    setMessage("");
    e.preventDefault();
    let nemail = (email.toLowerCase()).replace(/ /g, '');
    const loginData = { email: nemail, password };

    try {
      const { data } = await Axios.post(authenticate.userAuth, loginData);
      if (data.auth === true) {
        window.localStorage.setItem('token', data.token);
        await getLoggedIn();
        history.push('/');
      } else {
        setMessage(data.msg);
      }
    } catch (err) {
      setMessage(err.response.data.msg + '!');
    }

  }

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={data.logoLinkUrl}>
              <LogoImage src={data.logo} />
            </LogoLink>
            <MainContent>
              <Heading style={{ marginTop: "-100px", textAlign: 'center' }}>{data.headingText} </Heading>
              <h4 style={{ color: 'red', textAlign: 'center' }}>{message}</h4>
              <FormContainer>
                <Form>
                  <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                  <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                  <SubmitButton type="submit" onClick={(e) => { loginFunc(e) }}>
                    <LoginIcon className="icon" />
                    <span className="text">{data.submitButtonText}</span>
                  </SubmitButton>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={logo_business} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  )
}

export default Login;