import React from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  ListItem,
  Box,
  List,
  Text
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ManageApi from "api/management";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
export function SearchBar(props) {
  // Pass the computed styles into the `__css` prop
  const { variant, background, children, placeholder, borderRadius, ...rest } =
    props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");
  const boxRef = React.useRef();
  const history = useHistory();

  const [searchList, setSearchList] = React.useState([]);

  const handleChangeSearch = async (e) => {
    await ManageApi.ListRequest()
      .then(res => {
        boxRef.current.style.display = "block";
        const result = res?.data?.result;

        const titleList = result.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()));
        const reasonList = result.filter(item => item.reason.toLowerCase().includes(e.target.value.toLowerCase()));

        const newList = [...titleList, ...reasonList];
        const mergedList = newList.reduce((res, item) => {
          res[item.id] = item;
          return res;
        }, {});
        console.log(Object.values(mergedList));

        setSearchList(Object.values(mergedList));
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleSearchItemClick = (id) => { 
    // e.preventDefault();
    console.log('id: ', id)

    history.push({
      pathname: `/admin/view-request`,
      search: `?id=${id}`,
      state: { id: id }
    })
    boxRef.current.style.display = "none";
  }

  return (
    <InputGroup
      w={{ base: "100%", md: "200px" }}
      {...rest}
      position={"relative"}
      zIndex={"0"}
    >
      <InputLeftElement
        // eslint-disable-next-line react/no-children-prop
        children={
          <IconButton
            bg='inherit'
            borderRadius='inherit'
            _hover='none'
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            icon={
              <SearchIcon color={searchIconColor} w='15px' h='15px' />
            }></IconButton>
        }
      />
      <Input
        variant='search'
        fontSize='sm'
        bg={background ? background : inputBg}
        color={inputText}
        fontWeight='500'
        _placeholder={{ color: "gray.400", fontSize: "14px" }}
        borderRadius={borderRadius ? borderRadius : "30px"}
        placeholder={placeholder ? placeholder : "Search..."}
        onChange={handleChangeSearch}
        onFocus={() => {
          boxRef.current.style.display = "block";
        }}
      />
      <Box
        ref={boxRef}
        position={"absolute"}
        bottom={"0"}
        transform={"translateY(calc(100% + 24px))"}
        display={"none"}
        background={"white"}
        w={"150%"}
        zIndex={"1000"}
        boxShadow={"rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"}
        borderRadius={"10px"}
      >
        <List
          p={"8px 0"}
          onBlur={() => {
            boxRef.current.style.display = "none";
          }}
        >
          {searchList?.map(item => (
            <ListItem
              key={item.id} p={"10px 20px"}
              _hover={{ background: "gray.200" }}
              cursor={"pointer"}
              onClick={() => handleSearchItemClick(item.id)}
            >
              {item.title}
              <Text fontSize={"12px"} color={"gray.400"}>
                {item.reason}
              </Text>
              {/* <Link to={`/admin/view-request`} state={{id: item.id}}>lsssssss</Link> */}
            </ListItem>)
          )}
        </List>
      </Box>
    </InputGroup>
  );
}
