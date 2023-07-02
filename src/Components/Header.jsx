import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css";

const Header = () => {
  return (
    <HStack
      bgColor={"blackAlpha.900"}
      w={"full"}
      h={"10vh"}
      color={"whiteAlpha.900"}
      p={"4"}
      fontSize={"medium"}
      shadow={"base"}
    >
      <Button variant={"unstyled"} color={"whiteAlpha.900"}>
        <Link to="/" style={{ textDecoration: "none" }} className="link">
          Home
        </Link>
      </Button>

      <Button variant={"unstyled"} color={"whiteAlpha.900"}>
        <Link
          to="/exchanges"
          style={{ textDecoration: "none" }}
          className="link"
        >
          Exchanges
        </Link>
      </Button>

      <Button variant={"unstyled"} color={"whiteAlpha.900"}>
        <Link to="/coins" style={{ textDecoration: "none" }} className="link">
          Coins
        </Link>
      </Button>
    </HStack>
  );
};

export default Header;
