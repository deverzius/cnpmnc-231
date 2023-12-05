import React from "react";

// Chakra imports
import { Button, Flex, Link, Text } from "@chakra-ui/react";

// Assets
import banner from "assets/img/nfts/NftBanner1.png";
import RequestModal from "./Modal";

export default function Banner({ refetch }) {
  // Chakra Color Mode
  return (
    <Flex
      direction='column'
      // bgImage={banner}
      bg={`
      linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`}
      shadow={"rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;"}
      bgSize='cover'
      py={{ base: "30px", md: "56px" }}
      px={{ base: "30px", md: "64px" }}
      borderRadius='30px'>
      <Text
        fontSize={{ base: "24px", md: "34px" }}
        color='white'
        mb='14px'
        maxW={{
          base: "100%",
          md: "64%",
          lg: "46%",
          xl: "70%",
          "2xl": "50%",
          "3xl": "42%",
        }}
        fontWeight='700'
        lineHeight={{ base: "32px", md: "42px" }}>
        Request for Leave of Absence
      </Text>
      <Text
        fontSize='md'
        color='#E3DAFF'
        maxW={{
          base: "100%",
          md: "64%",
          lg: "40%",
          xl: "56%",
          "2xl": "46%",
          "3xl": "60%",
        }}
        fontWeight='500'
        mb='40px'
        lineHeight='28px'>
        Press the button below to submit a leave request. You are allowed to take only 5 days off per month. Your request will be sent to the manager for approval. Please await confirmation.
      </Text>
      <Flex align='center'>
        <RequestModal refetch={refetch} />
        <Link>
          <Text color='white' fontSize='sm' fontWeight='500'>
            See policy
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
}
