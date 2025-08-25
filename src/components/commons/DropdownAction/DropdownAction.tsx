import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes{
  onPressButtondetail: () => void;
  onPressButtonDelete: () => void;
}

const DropdownAction = (props: PropTypes) => {
  const {
    onPressButtondetail,
    onPressButtonDelete
  } = props;
  
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-700"/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem 
          key="detail-event-button" 
          onPress={onPressButtondetail}
        >
          Detail
        </DropdownItem>
        <DropdownItem 
          key="delete-event-button" 
          className="text-danger-500"
          onPress={onPressButtonDelete}
        >
          Delete 
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownAction