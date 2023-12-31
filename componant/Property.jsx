import Link from 'next/link';
import Image from 'next/Image';
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import millify from 'millify';
import defaultImage from '../assets/images/house.jpg';
import React from 'react'


const Property = ({ property: { coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID } }) => {
    return (
        <Link href={`/property/${externalID}`} color='black.200' passHref >
            <Flex flexWrap='wrap' w='420px' p='5' paddingTop='0px' justifyContent='flex-start' cursor='pointer' >
                <Box>
                    <Image src={coverPhoto ? coverPhoto.url : defaultImage} alt="house" width={400} height={260} />
                </Box>
                <Box w="full" >
                    <Flex paddingTop="2" alignItems="center " justifyContent="space-between">
                        <Flex alignItems="center">
                            <Box paddingRight="3" color="green.400">{isVerified && <GoVerified />}</Box>
                            <Text fontWeight="bold" fontSize="lg">AED{millify(price)} {rentFrequency && `/${rentFrequency}`}</Text>
                        </Flex>
                        <Box>
                            <Box>
                                <Avatar size='sm' src={agency?.logo?.url}></Avatar>
                            </Box>
                        </Box>
                    </Flex>
                    <Flex alignItems="center" p="1" justifyContent="space-between" width="250px" color="blue.400">
                        {rooms}<FaBed /> | {baths} | {millify(area)} sqf <BsGridFill />
                    </Flex>
                    <Text fontSize="lg">{title.length > 30 ? `${title.substring(0, 30)}...` : title}</Text>
                </Box>
            </Flex>
        </Link>
    )
}

export default Property