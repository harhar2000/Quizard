import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/images/quizzard_octupus_logo.png";

import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const NavLink = ({ children }) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Nav() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const user_id = localStorage.getItem("userId");

  const handleProfileView = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const getUser = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/${id}`,
      {
        method: "GET",
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser(user_id);
        setUsername(userData.fullName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user_id]);

  return (
    <>
      <Box
        // style={{
        //   // width: "100%",
        //   // overflow: "hidden",
        //   // display: "inline-block",
        //   // float: "left",
        //   position: "relative",
        //   top: "0",
        //   width: "100%",
        //   // z-index: "1000" /* Ensures the navbar stays on top of other content *
        // }}
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <img
              src={Logo}
              style={{ width: "40px", cursor: "pointer" }}
              onClick={() => navigate("/home")}
              alt="logo"
            />
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button data-testid="dark-mode" onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    data-testid="avatar"
                    size={"sm"}
                    src={"https://bit.ly/sage-adebayo"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      data-testid="avatar"
                      size={"2xl"}
                      src={"https://bit.ly/sage-adebayo"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{username}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>My Games</MenuItem>
                  <MenuItem onClick={handleProfileView}>My Profile</MenuItem>
                  <MenuItem data-testid="Logout-button" onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
