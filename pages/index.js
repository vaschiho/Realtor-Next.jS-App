import React from 'react';
import Link from 'next/link';
import { Flex, Box, Text, Button, Link as ChakraLink, Image } from '@chakra-ui/react';
import Property from '../componant/Property';

import { fetchApi } from '@/utils/fetchApi';



const Banner = ({ purpose, title1, title2, desc1, desc2, linkName, buttonText, imageUrl }) => (
  <Flex
    height="calc(100vh - 60px)"
    width="100%"
    marginBottom="10"
    backgroundImage={`url(${imageUrl})`}
    backgroundSize="cover"
    backgroundColor="rgba(0, 0, 0, 0.4)"
    backgroundBlendMode="darken"
    alignItems="center"
    justifyContent="center"
    position="relative"
  >
    <Box
      maxW="1180px"
      margin="0 auto"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      color="white"
      padding="5"
      position="relative"
    >
     <Text color="white" fontSize="5xl" fontWeight="bold"> {/* Changed text color, increased text size, and made it bold */}
        {title1} <br /> {title2}
      </Text>
      <Text fontSize="2xl" paddingTop={3} paddingBottom={3} color="white" fontWeight="bold"> {/* Changed text size, color, and made it bold */}
        {desc1} <br /> {desc2}
      </Text>
      <Button fontSize="xl" colorScheme="blue"> {/* Changed button color to blue */}
        <ChakraLink href={linkName} isExternal>{buttonText}</ChakraLink>
      </Button>
    </Box>
  </Flex>
);

// ... Rest of your code remains the same



export default function Home({ propertiesForSale, propertiesForRent }) {
  console.log(propertiesForSale, propertiesForRent);

  return (
    <Box>
      <Banner
        purpose='RENT A HOME'
        title1='Rental Homes for'
        title2='Everyone'
        desc1=' Explore from Apartments, builder floors, villas'
        desc2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https:bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      <Banner
        purpose='BUY A HOME'
        title1=' Find, Buy & Own Your'
        title2='Dream Home'
        desc1=' Explore from Apartments, land, builder floors,'
        desc2=' villas and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https:bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertiesForSale = await fetchApi(`https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002,6020&purpose=for-sale&hitsPerPage=6`);

  const propertiesForRent = await fetchApi(`https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002,6020&&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertiesForSale?.hits || [],
      propertiesForRent: propertiesForRent?.hits || [],
    },
  };
}
