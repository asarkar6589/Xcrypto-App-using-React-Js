import React from "react";
import { HStack, Image, Text, VStack, keyframes } from "@chakra-ui/react";
import img from "../Assets/btc.png";

const Home = () => {
  const animation = keyframes`
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(10px);
  }
}
  `;

  const myAnimation = `${animation} infinite 2s`;

  return (
    <VStack
      w={"full"}
      h={"80vh"}
      bgColor={"blackAlpha.900"}
      // alignItems={"center"}
    >
      {/* Image */}
      <HStack mt={"10"}>
        <Image
          src={img}
          h={"55vh"}
          _hover={{
            animation: myAnimation,
          }}
        />
      </HStack>

      {/* Text */}
      <HStack>
        <Text color={"whiteAlpha.700"} fontSize={"5xl"} textAlign={"center"}>
          XCRYPTO
        </Text>
      </HStack>
    </VStack>
  );
};

export default Home;
