import React from "react";
import { HStack, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <HStack justifyContent={"center"} h={"80vh"} alignItems={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blackAlpha.900"
        size="xl"
      />
    </HStack>
  );
};

export default Loader;
