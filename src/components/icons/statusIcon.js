import { Icon } from "@chakra-ui/react";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";

const StatusIcon = (props) => {
    const { status } = props;
    
    return <Icon
    w='24px'
    h='24px'
    me='5px'
    color={
        status === "Approved"
        ? "green.500"
        : status === "Disable"
        ? "red.500"
        : status === "Error"
        ? "orange.500"
        : null
    }
    as={
        status === "Approved"
        ? MdCheckCircle
        : status === "Disable"
        ? MdCancel
        : status === "Error"
        ? MdOutlineError
        : null
    }
  />;
}
 
export default StatusIcon;