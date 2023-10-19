import React from 'react';
import Link from 'next/link';
import { Box, Flex, Text, Button, Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import defaultImage from '../../assets/images/house.jpg';
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import ImageSrollbar from '@/componant/ImageSrollbar';

const PropertyDetails = ({
    PropertyDetails: {
        price,
        rentFrequency,
        rooms,
        title,
        baths,
        area,
        agency,
        isVerified,
        description,
        type,
        purpose,
        furnishingStatus,
        amenities,
        photos,
        phoneNumber,
    },
}) => {
    // Define the WhatsApp message with the property title
    const encodedMessage = encodeURIComponent(`I'm interested in the property named ${title}`);

    return (
        <Box maxWidth="1000px" margin="auto" p="4">
            {photos && <ImageSrollbar data={photos} />}
            <Box w="full" p="6">
                <Flex paddingTop="2" alignItems="center " justifyContent="space-between">
                    <Flex alignItems="center">
                        <Box paddingRight="3" color="green.400">
                            {isVerified && <GoVerified />}
                        </Box>
                        <Text fontWeight="bold" fontSize="lg">
                            AED{millify(price)} {rentFrequency && `/${rentFrequency}`}
                        </Text>
                    </Flex>
                    <Box>
                        <Box>
                            <Avatar size="sm" src={agency?.logo?.url}></Avatar>
                        </Box>
                    </Box>
                </Flex>
                <Flex alignItems="center" p="1" justifyContent="space-between" width="250px" color="blue.400">
                    {rooms} <FaBed /> | {baths} | {millify(area)} sqf <BsGridFill />
                </Flex>
                <Box marginTop="2">
                    <Text fontSize="lg" marginBottom="2" fontWeight="bold">
                        {title}
                    </Text>
                    <Text lineHeight="2" color="gray.600">
                        {description}
                    </Text>
                </Box>
                <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
                    <Flex justifyContent="space-between" w="400px " borderButton="1px" borderColor="gray.100" p="3">
                        <Text>Type</Text>
                        <Text fontWeight="bold">{type}</Text>
                    </Flex>
                    <Flex justifyContent="space-between" w="400px " borderButton="1px" borderColor="gray.100" p="3">
                        <Text>Purpose</Text>
                        <Text fontWeight="bold">{purpose}</Text>
                    </Flex>
                    {furnishingStatus && (
                        <Flex justifyContent="space-between" w="400px " borderButton="1px" borderColor="gray.100" p="3">
                            <Text>Furnishing Status</Text>
                            <Text fontWeight="bold">{furnishingStatus}</Text>
                        </Flex>
                    )}
                </Flex>
                <Box>
                    {amenities.length && <Text fontSize="2xl" fontWeight="black" marginTop="5">Facilities:</Text>}
                    <Flex flexWrap="wrap">
                        {amenities?.map((item) => (
                            item?.amenities?.map((amenity) => (
                                <Text key={amenity.text} fontWeight="bold" color="blue.400" fontSize="l" p="2" bg="gray.200" m="1" borderRadius="5">
                                    {amenity.text}
                                </Text>
                            ))
                        ))}
                    </Flex>
                </Box>
                <Box>
                    <Text fontSize="2xl" fontWeight="black" marginTop="5">Contact Us:</Text>
                    <Button
                        as={Link}
                        href={`https://api.whatsapp.com/send?phone=${phoneNumber.whatsapp}&text=${encodedMessage}`}
                        colorScheme="teal" // Adjust color scheme as needed
                        size="lg" // Adjust size as needed
                        target="_blank" // Open the link in a new tab
                        rel="noopener noreferrer" // Recommended for security reasons
                        
                    >
                        Contact via WhatsApp
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
    return {
        props: {
            PropertyDetails: data,
        },
    };
}
