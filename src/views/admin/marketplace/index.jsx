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
import {
  MdPendingActions as PendingIcon,
  MdCheckCircle as ApproveIcon,
  MdCancel as RejectIcon,
} from "react-icons/md";
// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  // MdAddTask,
  // MdAttachMoney,
  MdBarChart,
  // MdFileCopy,
} from "react-icons/md";
// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
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
  console.log(userData, "userData");
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

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
  console.log(RequestListData, "tran van tai");
  const tableDataComplex = useMemo(() => {
    const dataList = RequestListData?.data?.result || [];
    const pendingList = dataList.filter((item) => item.status === "pending");
    const approvedList = dataList.filter((item) => item.status === "approved");
    const rejectedList = dataList.filter((item) => item.status === "rejected");

    const mergedList = [...pendingList, ...approvedList, ...rejectedList]
    //   .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    //   .map((item) => ({
    //     title: [
    //       item.title,
    //       item.user.lastname,
    //       item.user.firstname,
    //       item.user.email,
    //     ],
    //     date: item.updatedAt,
    //     status: item.status,
    //     remain: item.user.remaindingLeaveDays,
    //   }));
    if (localStorage.getItem("user").role === "Employee")
    { 
      mergedList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .map((item) => ({
        title: [
          item.title,
          "",
          "",
          "",
        ],
        date: item.updatedAt,
        status: item.status,
        reason: item.reason,
        admin: false

        // remain: item.user.remaindingLeaveDays,
      }));
    }
    else
    {
      mergedList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .map((item) => ({
        title: [
          item.title,
          "",
          "",
          "",
        ],
        date: item.updatedAt,
        status: item.status,
        reason: item.reason,
        leaveDays: item.leaveDays,
        remain: "",
        admin: true
      }));
    }
    

    return mergedList;
  }, [RequestListData]);

  // console.log(tableDataComplex);
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
            {/* <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                Trending NFTs
              </Text>
              <Flex
                align="center"
                me="20px"
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}
              >
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "34px", md: "44px" }}
                  to="#art"
                >
                  Art
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "34px", md: "44px" }}
                  to="#music"
                >
                  Music
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "34px", md: "44px" }}
                  to="#collectibles"
                >
                  Collectibles
                </Link>
                <Link color={textColorBrand} fontWeight="500" to="#sports">
                  Sports
                </Link>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              <NFT
                name="Abstract Colors"
                author="By Esthera Jackson"
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
                image={Nft1}
                currentbid="0.91 ETH"
                download="#"
              />
              <NFT
                name="ETH AI Brain"
                author="By Nick Wilson"
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
                image={Nft2}
                currentbid="0.91 ETH"
                download="#"
              />
              <NFT
                name="Mesh Gradients "
                author="By Will Smith"
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
                image={Nft3}
                currentbid="0.91 ETH"
                download="#"
              />
            </SimpleGrid> */}
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
                      reason={item.reason}
                      leaveDays={item.leaveDays}
                      download="#"
                      admin={item.admin}
                      status={item.status}
                    />
                  ))
              )}
              {/* <NFT
                name="Colorful Heaven"
                author="By Mark Benjamin"
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
                date="24.Jan.2021"
                download="#"
              />
              <NFT
                name="3D Cubes Art"
                author="By Manny Gates"
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
                image={Nft6}
                date="24.Jan.2021"
                download="#"
              /> */}
            </SimpleGrid>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          <Card px="0px" mb="20px">
            {!isFetchingListData ? (
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
                value={`${JSON.parse(localStorage.user)?.remain} days`}
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
            {/* <TableTopCreators
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            /> */}
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
      {/* Delete Product */}
    </Box>
  );
}
