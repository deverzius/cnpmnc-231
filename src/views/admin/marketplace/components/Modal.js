import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import MiniCalendar from "components/calendar/MiniCalendar";
import React from "react";
import { formatDate } from "utils/date";

const RequestModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [selectedDate, onChange] = React.useState(new Date());
  const handleChangeEvent = (e) => {
    onChange(e);
    console.log(e);
  };
  return (
    <>
      <Button
        bg="white"
        color="black"
        _hover={{ bg: "whiteAlpha.900" }}
        _active={{ bg: "white" }}
        _focus={{ bg: "white" }}
        fontWeight="500"
        fontSize="14px"
        py="20px"
        px="27"
        me="38px"
        shadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
        onClick={onOpen}
      >
        Create Request
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Request for Leave of Absence</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Brief Description</FormLabel>
              <Input ref={initialRef} placeholder="Title" />
            </FormControl>
            <Center height="50px">
              <Divider orientation="horizontal" />
            </Center>
            <FormControl isRequired bt="3">
              <FormLabel>
                Reason (summarizing the reason why you want to take a leave.)
              </FormLabel>
              <Textarea ref={initialRef} placeholder="Reason" />
            </FormControl>
            <Center height="50px">
              <Divider orientation="horizontal" />
            </Center>
            <FormControl mt={4} isRequired>
              <FormLabel>Select day</FormLabel>
              <FormHelperText>
                Choose the dates you need to take leave.
              </FormHelperText>
              <MiniCalendar
                selectRange
                onChange={(e) => handleChangeEvent(e)}
                value={selectedDate}
              />
            </FormControl>
            {Array.isArray(selectedDate) && (
              <Flex
                justify={"flex-start"}
                align={"center"}
                p="5"
                mt="5"
                borderRadius={10}
                marginInline={"20px"}
                shadow={
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
                }
                bg={"blue.50"}
              >
                <Text
                  fontSize="lg"
                  color="blue.700"
                  maxW={{
                    base: "100%",
                    md: "64%",
                    lg: "40%",
                    xl: "100%",
                    "2xl": "100%",
                    "3xl": "100%",
                  }}
                  fontWeight="700"
                  mb="5px"
                  lineHeight="50px"
                >
                  Do you want to take leave:
                  <Center height="20px">
                    <Divider orientation="horizontal" size="10px" />
                  </Center>
                  <Text fontWeight={600} color="blue.800" fontSize="md">
                    from: {formatDate(selectedDate[0])}
                  </Text>
                  <Text fontWeight={600} color="blue.800" fontSize="md">
                    {" "}
                    to: {formatDate(selectedDate[1])}
                  </Text>{" "}
                </Text>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RequestModal;
