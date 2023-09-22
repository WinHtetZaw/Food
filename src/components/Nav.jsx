import {
  Navbar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useGetCategoryListsQuery } from "../redux/services/mealApi";

const Nav = () => {
//   const { data, isLoading } = useGetCategoryListsQuery();
//   console.log(data)
  return (
    <>
      <Navbar>
        <div className="">
          <h3 className="main-logo">FOODIE</h3>
        </div>

        {/* menu  */}
        <navbar className="menu-container">
          <div>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" className="menu-link rounded">
                  name
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="rounded">
                <DropdownItem key="new">New file</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="menu-link">canadian</div>
        </navbar>
      </Navbar>
    </>
  );
};

export default Nav;
