/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useMemo } from "react";

// Chakra imports
import {
  Icon,
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
//

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { MdBarChart } from "react-icons/md";
// Assets
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import { useQuery } from "@tanstack/react-query";
import EmployeeApi from "api/employee";
import { formatDate } from "utils/date";
import UserApi from "api/user";

export default function Marketplace() {
  let user = localStorage.getItem("user");
  let id = JSON.parse(user).id;

  const {
    data: userData,
    refetch: refetchUser,
    isFetching: isFetchingUser,
  } = useQuery({
    queryKey: ["info"],
    queryFn: () => UserApi.getInfo(id),
    enabled: true,
  });

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const brandColor = useColorModeValue("brand.500", "white");
  //
  const {
    data: RequestListData,
    refetch: refetchAllData,
    isFetching: isFetchingListData,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => EmployeeApi.ListRequest(),
    enabled: true,
  });
  const tableDataComplex = useMemo(() => {
    const pendingList = RequestListData?.data?.data?.pendding || [];
    const approvedList = RequestListData?.data?.data?.approved || [];
    const rejectedList = RequestListData?.data?.data?.rejected || [];

    const mergedList = [...pendingList, ...approvedList, ...rejectedList]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .map((item) => ({
        title: [
          item.title,
          item.user.lastname,
          item.user.firstname,
          item.user.email,
        ],
        date: item.updatedAt,
        status: item.status,
        remain: item.user.remaindingLeaveDays,
      }));

    return mergedList;
  }, [RequestListData]);

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Banner refetch={refetchAllData} />
          <Flex direction="column">
            <Text
              mt="45px"
              mb="36px"
              color={textColor}
              fontSize="2xl"
              ms="24px"
              fontWeight="700"
            >
              Recently Added
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap="20px"
              mb={{ base: "20px", xl: "0px" }}
            >
              {isFetchingListData ? (
                <NFT.Skeleton
                  name="Swipe Circles"
                  author="By Peter Will"
                  bidders={[
                    Avatar1,
                    Avatar2,
                    Avatar3,
                    Avatar4,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                  ]}
                  image={Nft4}
                  date="24.Jan.2021"
                  download="#"
                />
              ) : (
                tableDataComplex
                  // .slice(0, 5)
                  .map((item) => (
                    <NFT
                      key={item.title}
                      name={item.title[0]}
                      author={`By ${item.title[1] + " " + item.title[2]}`}
                      bidders={[
                        Avatar1,
                        Avatar2,
                        Avatar3,
                        Avatar4,
                        Avatar1,
                        Avatar1,
                        Avatar1,
                        Avatar1,
                      ]}
                      image={Nft5}
                      date={formatDate(item.date)}
                      download="#"
                      status={item.status}
                    />
                  ))
              )}
            </SimpleGrid>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          <Card px="0px" mb="20px">
            {!isFetchingUser ? (
              <MiniStatistics
                onClick={refetchUser}
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={
                      <Icon
                        w="32px"
                        h="32px"
                        as={MdBarChart}
                        color={brandColor}
                      />
                    }
                  />
                }
                name="Remain days"
                value={`${userData?.data?.user?.remaindingLeaveDays} days`}
              />
            ) : (
              <MiniStatistics.Skeleton
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={
                      <Icon
                        w="32px"
                        h="32px"
                        as={MdBarChart}
                        color={brandColor}
                      />
                    }
                  />
                }
                name="Remain days"
              />
            )}
          </Card>
          <Card p="0px">
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify="space-between"
              w="100%"
              px="22px"
              py="18px"
            >
              <Text color={textColor} fontSize="xl" fontWeight="600">
                History
              </Text>
              <Button variant="action">See all</Button>
            </Flex>
            {isFetchingListData ? (
              <HistoryItem.Skeleton
                name="Colorful Heaven"
                author="By Mark Benjamin"
                date="30s ago"
                image={Nft5}
                status="Approved"
              />
            ) : (
              tableDataComplex.map((item) => {
                if (item.status === "approved") {
                  // eslint-disable-next-line react/jsx-key
                  return (
                    <HistoryItem
                      key={item.title[1]}
                      name={item.title[0]}
                      author={`By ${item.title[0]}`}
                      date="30s ago"
                      image={Nft5}
                      status="Approved"
                    />
                  );
                }
              })
            )}
          </Card>
        </Flex>
      </Grid>
    </Box>
  );
}
