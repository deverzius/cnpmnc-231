import {
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Stack,
  Button,
  SkeletonText,
  VStack,
  HStack,
  ChakraProvider
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MdCheckCircle as ApproveIcon, MdCancel as RejectIcon } from "react-icons/md"
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
//,ockdata
import MOCKDATA from "views/admin/dataTables/variables/tableDataCheck.json";
// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { formatDate } from "utils/date";
import { useQuery } from "@tanstack/react-query";
import ManageApi from "api/management";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function CheckTable(props) {
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [select, setSelect] = useState([])
  const { columnsData, tableData, refetchAllData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const history = useHistory();


  const {
    data: RequestListData,
    refetch: ApproveRequest,
    isFetching: isFetchingListData,
    isSuccess,
    isLoading
  } = useQuery({
    queryKey: ["approve"],
    queryFn: () => ManageApi.ApproveRequest({ leaveReqIds: select }),
    enabled: false,
  });
  const handleClick = async () => {
    // Enable the query when the button is clicked
    await ApproveRequest();
    refetchAllData()
  };
  const {
    // data: RequestListData,
    refetch: RejectRequest,
    isFetching: isFetchingReject,
    // isSuccess,
    // isLoading
  } = useQuery({
    queryKey: ["reject"],
    queryFn: () => ManageApi.RejectRequest({ leaveReqIds: select }),
    enabled: false,
  });
  const handleClickReject = async () => {
    // Enable the query when the button is clicked
    await RejectRequest();
    refetchAllData()
  };

  // if (isSuccess) { refetchAllData() }

  const addUniqueElement = useCallback((element) => {
    setSelect(prevSelect => {
      const index = prevSelect.indexOf(element);

      if (index !== -1)
      {
        // Nếu phần tử đã tồn tại, loại bỏ nó khỏi mảng
        const updatedSelect = [...prevSelect];
        updatedSelect.splice(index, 1);
        return updatedSelect;
      }

      // Thêm phần tử vào mảng
      return [...prevSelect, element];
    });
  })

  const handleClickTableRow = (e, id) => {
    e.preventDefault();
    console.log('id: ', id)
    history.push({
      pathname: `/admin/view-request`,
      state: { id: id }
    })
  }

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Upcoming Request
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr
              {...headerGroup.getHeaderGroupProps()}
              key={index}
            >
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()} key={index}
                cursor='pointer'
                _hover={{ bg: "gray.200" }}
              >

                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "TITLE")
                  {
                    data = (
                      <Flex align='center'>
                        <Checkbox
                          defaultChecked={false}
                          // colorScheme='brandScheme'
                          borderColor={textColor}
                          me='10px'
                          onChange={() => { addUniqueElement(cell.value[4]) }}
                        />
                        <VStack
                          onClick={e => handleClickTableRow(e, row.values.title[4])}
                        >
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value[0]}
                          </Text>
                          <HStack>
                            <Text fontStyle={"italic"}>By</Text>
                            <Text color={textColor} fontSize='sm' fontWeight='700' textTransform={"uppercase"}>
                              {cell.value[1] + " " + cell.value[2]}
                            </Text>

                          </HStack>

                        </VStack>
                      </Flex>
                    );
                  } else if (cell.column.Header === "REMAIN DAYS")
                  {
                    data = (
                      <Flex align='center'>
                        <Text
                          me='10px'
                          color={textColor}
                          fontSize='sm'
                          fontWeight='700'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "REASON")
                  {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700' sx={{ overflow: "hidden", width: "200px" }}>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "DATE")
                  {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {formatDate(cell.value)}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Stack direction="row" spacing={4} ml="3" mt="3">
        <Button leftIcon={<ApproveIcon />} variant="brand" loadingText="Approving" onClick={handleClick} disabled={isFetchingListData}>
          Approve
        </Button>
        <Button rightIcon={<RejectIcon />} variant="outline" colorScheme="red" loadingText="Rejecting" onClick={handleClickReject} disabled={isFetchingReject}>
          Reject
        </Button>
      </Stack>

    </Card>
  );
}

// eslint-disable-next-line react/display-name
CheckTable.Skeleton = (props) => {
  const { columnsData, tableData } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => MOCKDATA, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Upcoming Request
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      <SkeletonText mt='4' noOfLines={3} spacing='4' skeletonHeight='2' w={{ base: "100px", "3xl": "120px" }} />
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Stack direction="row" spacing={4} ml="3" mt="3">
        <Button leftIcon={<ApproveIcon />} variant="brand" loadingText="Approving">
          Approve
        </Button>
        <Button rightIcon={<RejectIcon />} variant="outline" colorScheme="red" loadingText="Rejecting">
          Reject
        </Button>
      </Stack>
    </Card>
  );
}
