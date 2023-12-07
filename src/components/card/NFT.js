// Chakra imports
import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  useColorModeValue,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React from "react";

export default function NFT(props) {
  const { id, title, name, author, bidders, download, date, status, reason, leaveDays, admin } = props;

  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  const textColorDate = useColorModeValue("gray.800", "white");
  const history = useHistory();

  const handleClick = (e, id) => {
    e.preventDefault();
    history.push({
      pathname: `/admin/view-request`,
      search: `?id=${id}`,
      state: { id: id}
    })
}

return (
  <Card p="20px">
    <Flex direction={{ base: "column" }} justify="center" >
      <Box mb={{ base: "20px", "2xl": "20px" }} position="relative">
        {/* <Flex
            // src={image}
            bg={`
            linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)
            `}
            shadow={"rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;"}
            w={{ base: "100%", "3xl": "100%" }}
            h={{ base: "100%", "3xl": "200px" }}
            borderRadius="20px"
          ></Flex> */}
        {/* <Button
            position='absolute'
            bg='white'
            _hover={{ bg: "whiteAlpha.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            p='0px !important'
            top='14px'
            right='14px'
            borderRadius='50%'
            minW='36px'
            h='36px'
            onClick={() => {
              setLike(!like);
            }}>
            <Icon
              transition='0.2s linear'
              w='20px'
              h='20px'
              as={like ? IoHeart : IoHeartOutline}
              color='brand.500'
            />
          </Button> */}
      </Box>
      <Flex flexDirection="column" justify="space-between" h="100%">
        <Flex
          justify="space-between"
          direction={{
            base: "row",
            md: "column",
            lg: "row",
            xl: "column",
            "2xl": "row",
          }}
          mb="auto"
        >
          <Flex direction="column">
            <Text
              color={textColor}
              fontSize={{
                base: "xl",
                md: "lg",
                lg: "lg",
                xl: "lg",
                "2xl": "md",
                "3xl": "lg",
              }}
              mb="5px"
              fontWeight="bold"
              me="14px"
            >
              {title}
            </Text>
            <Text
              color='secondaryGray.600'
              fontSize={{
                base: "sm",
              }}
              fontWeight='400'
              me='14px'>
              {reason}
            </Text>
          </Flex>
          {/* <AvatarGroup
              max={3}
              color={textColorBid}
              size='sm'
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
              fontSize='12px'>
              {bidders.map((avt, key) => (
                <Avatar key={key} src={avt} />
              ))}
            </AvatarGroup> */}
        </Flex>

        <Flex
          align="start"
          justify="space-between"
          direction={{
            base: "row",
            md: "column",
            lg: "row",
            xl: "column",
            "2xl": "row",
          }}
          mt="25px"
        >
          <Text fontWeight="700" fontSize="sm" color={textColorBid}>
            from: {`${leaveDays[0]}`}
          </Text>
          <Text fontWeight="700" fontSize="sm" color={textColorBid}>
            to: {`${leaveDays[leaveDays.length - 1]}`}
          </Text>
        </Flex>

        <Flex
          align="start"
          justify="space-between"
          direction={{
            base: "row",
            md: "column",
            lg: "row",
            xl: "column",
            "2xl": "row",
          }}
          mt="25px"
        >
          {!admin ??
            (<Text fontWeight="700" fontSize="sm" color={textColorBid}>
              Updated Day: <Text color={textColorDate}>{date}</Text>
            </Text>)
          }
          <Link
            href={download}
            mt={{
              base: "0px",
              md: "10px",
              lg: "0px",
              xl: "10px",
              "2xl": "0px",
            }}
          >
            <Button
              variant="darkBrand"
              color="#fefefe"
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
              px="24px"
              py="5px"
              textTransform={"capitalize"}
              background={
                (status === "approved" ? "green.500" : false)
                || (status === "pending" ? "orange.500" : "red.600")
              }
              onClick={(e) => handleClick(e, id)}
            >
              {status}
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  </Card>
);
}
// eslint-disable-next-line react/display-name
NFT.Skeleton = () => {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  const textColorDate = useColorModeValue("gray.800", "white");
  return (
    <Card p="20px">
      <Flex direction={{ base: "column" }} justify="center">
        <Box mb={{ base: "20px", "2xl": "20px" }} position="relative">
          <Skeleton
            w={{ base: "100%", "3xl": "100%" }}
            h={{ base: "2xl", "3xl": "200px" }}
            borderRadius={"20px"}
          />
        </Box>
        <Flex flexDirection="column" justify="space-between" h="100%">
          <Flex
            justify="space-between"
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb="auto"
          >
            <Flex direction="column" w={{ base: "100%", "3xl": "100%" }}>
              <SkeletonText mt='4' noOfLines={1} spacing='4' skeletonHeight='2' />
              <SkeletonText mt='4' noOfLines={1} spacing='4' skeletonHeight='2' w={{ base: "60%", "3xl": "60%" }} />
            </Flex>
          </Flex>
          <Flex
            align="start"
            justify="space-between"
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mt="25px"
          >
            <Text fontWeight="700" fontSize="sm" color={textColorBid}>
              Updated Day: <SkeletonText mt='4' noOfLines={1} spacing='4' skeletonHeight='2' />
            </Text>
            <Link
              href={""}
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
            >
              <Skeleton
                w={{ base: "80px", "3xl": "100px" }}
                h={{ base: "25px", "3xl": "40px" }}
                borderRadius={"25px"}
              />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
