import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import { Text, Icon, Flex } from "@chakra-ui/react";
// Chakra imports
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// Custom components
import Card from "components/card/Card.js";

export default function MiniCalendar(props) {
  const { selectRange, value, onChange, ...rest } = props;
  // const [value, onChange] = useState(new Date());
  return (
    <Card
      justify="center"
      align="center"
      direction="column"
      w="100%"
      maxW="fix-content"
      p="20px 15px"
      h="max-content"
      {...rest}
      mt="5"
    >
      <Flex
        justify="center"
        align="center"
        direction="column"
        w="100%"
        maxW="fix-content"
        p="20px 15px"
        h="max-content"
      >
        <Calendar
          onChange={onChange}
          value={value}
          selectRange={selectRange}
          view={"month"}
          tileContent={<Text color="brand.500"></Text>}
          prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
          nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
        />
      </Flex>
    </Card>
  );
}
