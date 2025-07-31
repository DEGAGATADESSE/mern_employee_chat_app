import React from 'react';

import { useEffect } from "react";
import { useHistory } from "react-router";
import{Box, Container,Text } from "@chakra-ui/react";
import Signup from '../component/Authentication.js/Signup';
const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/registration");
  }, [history]);



  return (  
    
    <Container maxW="xl" centerContent> 
      <Box
       d="flex"
       justifyContent="center"
       p={3}
       bg="rgb(61, 117, 143)"
       w="400px"
       height="20"
       m="40px 0 15px 0"
       borderRadius="lg"
       borderWidth="1px"
       marginRight={700}
      
      >
        <Text fontSize="4xl" fontFamily="Work sans" color='black'>Registration</Text>
      </Box >
      <Signup/>
     
    </Container>
  )
}

export default HomePage;
