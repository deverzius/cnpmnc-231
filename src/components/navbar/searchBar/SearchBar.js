import React from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  ListItem,
  Box
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ManageApi from "api/management";
export function SearchBar(props) {
  // Pass the computed styles into the `__css` prop
  const { variant, background, children, placeholder, borderRadius, ...rest } =
    props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");
  const boxRef = React.useRef();

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

        setSearchList(mergedList)
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <InputGroup w={{ base: "100%", md: "200px" }} {...rest}>
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
        position={"relative"}
        variant='search'
        fontSize='sm'
        bg={background ? background : inputBg}
        color={inputText}
        fontWeight='500'
        _placeholder={{ color: "gray.400", fontSize: "14px" }}
        borderRadius={borderRadius ? borderRadius : "30px"}
        placeholder={placeholder ? placeholder : "Search..."}
        onChange={handleChangeSearch}
        onfocusout={() => {
          boxRef.current.style.display = "none";
        }}
      />
      <Box
        ref={boxRef}
        position={"absolute"}
        bottom={"-110%"}
        display={"none"}
      >
        {searchList?.map((item, idx) => (
          <ListItem key={idx}>
            {item}
          </ListItem>)
        )}
      </Box>
    </InputGroup>
  );
}
