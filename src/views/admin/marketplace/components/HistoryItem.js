import React from "react";
// Chakra imports
import { Flex, Icon, Image, Skeleton, SkeletonCircle, SkeletonText, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import { FaEthereum } from "react-icons/fa";
import StatusIcon from "components/icons/statusIcon";

export default function HistoryItem(props) {
  const { image, name, author, date, status } = props;
  // Chakra Color Mode
  const textColor = useColorModeValue("brands.900", "white");
  const bgItem = useColorModeValue(
    { bg: "white", boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)" },
    { bg: "navy.700", boxShadow: "unset" }
  );
  const textColorDate = useColorModeValue("secondaryGray.600", "white");
  return (
    <Card
      _hover={bgItem}
      bg='transparent'
      boxShadow='unset'
      px='24px'
      py='21px'
      transition='0.2s linear'>
      <Flex direction={{ base: "column" }} justify='center'>
        <Flex position='relative' align='center'>
          <Image src={image} w='66px' h='66px' borderRadius='20px' me='16px' />
          <Flex
            direction='column'
            w={{ base: "70%", md: "100%" }}
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}>
            <Text
              color={textColor}
              fontSize={{
                base: "md",
              }}
              mb='5px'
              fontWeight='bold'
              me='14px'>
              {name}
            </Text>
            <Text
              color='secondaryGray.600'
              fontSize={{
                base: "sm",
              }}
              fontWeight='400'
              me='14px'>
              {author}
            </Text>
          </Flex>
          <Flex
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}
            align='center'>
            <StatusIcon status={status} />
            <Text fontWeight='700' fontSize='md' color={textColor}>
              {status}
            </Text>
          </Flex>
          <Text ms='auto' fontWeight='700' fontSize='sm' color={textColorDate}>
            {date}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
// eslint-disable-next-line react/display-name
HistoryItem.Skeleton = () => {
  const textColor = useColorModeValue("brands.900", "white");
  const bgItem = useColorModeValue(
    { bg: "white", boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)" },
    { bg: "navy.700", boxShadow: "unset" }
  );
  const textColorDate = useColorModeValue("secondaryGray.600", "white");
  return (
    <Card
      _hover={bgItem}
      bg='transparent'
      boxShadow='unset'
      px='24px'
      py='21px'
      transition='0.2s linear'>
      <Flex direction={{ base: "column" }} justify='center'>
        <Flex position='relative' align='center' gap={5}>
          <Skeleton
            w={{ base: "50px", "3xl": "66px" }}
            h={{ base: "50px", "3xl": "66px" }}
            borderRadius={"20px"}
          />
          <Flex
            direction='column'
            w={{ base: "70%", md: "50%" }}
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}>
            <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
          </Flex>
          <Flex
            w={{ base: "70%", md: "50px" }}
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}
            align='center'>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}