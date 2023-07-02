import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { server } from "../index.js";
import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Heading,
  Button,
} from "@chakra-ui/react";
import "../Styles/Exchanges.css";
import Error from "./Error.jsx";
import Loader from "./Loader.jsx";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const btn = new Array(6).fill(1);

  useEffect(() => {
    try {
      const fetchExchanges = async () => {
        const { data } = await axios.get(
          `${server}/exchanges?per_page=100&page=${page}`
        );

        // console.log(data);
        setExchanges(data);
        setLoading(false);
      };

      fetchExchanges();
    } catch (error) {
      setLoading(false);
      <Error message="Error while fetching the data" />;
    }
  }, [page]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <HStack
        // border={"2px"}
        wrap={"wrap"}
        w={"full"}
        justifyContent={"center"}
        mt={"4"}
        // h={"full"}
      >
        {exchanges.map((index) => (
          <ExchangeCard
            key={index?.id}
            imgSrc={index?.image}
            rank={index?.trust_score_rank}
            name={index?.name}
            url={index?.url}
          />
        ))}
      </HStack>

      <Box
        w={"full"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={"4"}
        // border={"1px"}
      >
        <HStack
          w={"full"}
          overflowY={"auto"}
          justifyContent={"center"}
          mt={"4"}
          mb={"4"}
        >
          {/* Buttons */}
          {btn.map((i, index) => (
            <Button
              color={"whiteAlpha.700"}
              bgColor={"blackAlpha.900"}
              key={index}
              onClick={() => {
                setPage(index + 1);
                setLoading(true);
              }}
            >
              {index + 1}
            </Button>
          ))}
        </HStack>
      </Box>
    </>
  );
};

const ExchangeCard = ({ imgSrc, rank, name, url }) => {
  return (
    <>
      <a href={url} target="blank">
        <VStack
          // border={"2px"}
          width={"250px"}
          height={"250px"}
          justifyContent={"center"}
          borderColor={"whiteAlpha.700"}
          borderRadius={"10px"}
          transition={"all 0.3s"}
          shadow={"lg"}
          css={{
            "&:hover": {
              transform: "scale(1.1)",
              textDecoration: "none",
              color: "black",
            },
          }}
        >
          <Image
            src={imgSrc}
            alt={name}
            h={"10"}
            w={"10"}
            objectFit={"contain"}
          />
          <Heading sizr={"md"} noOfLines={1}>
            {rank}
          </Heading>
          <Text noOfLines={1}>{name}</Text>
        </VStack>
      </a>
    </>
  );
};

export default Exchanges;
