import React from 'react'

import { Container,Box,Text,Tabs,Flex} from '@chakra-ui/react';
import Login from '../components/Authentication/Login.js';
import Signup from '../components/Authentication/Signup.js';


const HomePage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box
        d='flex'
        padding={3}
        bg={'white'}
        borderRadius='lg'
        // boxShadow='lg'
        border='1px solid'
        m="40px 0 15px 0"
        borderWidth='1px'
        w='100%'
        justifyContent='center' 
        textAlign={'center'}

      >
        <Text fontSize="4xl" color="black" fontFamily="'Work Sans', sans-serif">TWIN</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius='lg' borderWidth={"1px"} justifyContent={"center"} color="black">
        <Tabs.Root variant="enclosed" maxW="md" fitted defaultValue={"login"} justifyContent={"center"}>
          <Tabs.List mb="1em">
            <Tabs.Trigger width="50%" value="login">Log In</Tabs.Trigger>
            <Tabs.Trigger width="50%" value="signup">Sign Up</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="login">
            <Login/>
          </Tabs.Content>

          <Tabs.Content value="signup">
            <Signup/>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  )
}

export default HomePage
