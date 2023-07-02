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
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import "../Styles/Exchanges.css";
import Error from "./Error.jsx";
import Loader from "./Loader.jsx";
import { Link } from "react-router-dom";

const Coin = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btn = new Array(100).fill(1);

  useEffect(() => {
    try {
      const fetchCoins = async () => {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );

        setLoading(false);
        // console.log(data);
        setCoins(data);
      };

      fetchCoins();
    } catch (error) {
      setLoading(false);
      <Error message="Error while fetching the coins" />;
    }
  }, [page, currency]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <RadioGroup
        value={currency}
        onChange={setCurrency}
        p={"8"}
        w={"full"}
        display={"flex"}
        justifyContent={"center"}
      >
        <HStack spacing={"4"}>
          <Radio value="inr">₹</Radio>
          <Radio value="eur">€</Radio>
          <Radio value="usd">$</Radio>
        </HStack>
      </RadioGroup>
      <HStack
        // border={"2px"}
        wrap={"wrap"}
        w={"full"}
        justifyContent={"center"}
        mt={"4"}
        // h={"full"}
      >
        {coins.map((index) => (
          <CoinCard
            id={index.id}
            key={index.id}
            name={index.name}
            imgSrc={index.image}
            symbol={index.symbol}
            price={index.current_price}
            currencySymbol={currencySymbol}
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
          w={"50%"}
          // justifyContent={"center"}
          overflowX={"auto"}
          // border={"1px"}
          mt={"4"}
          mb={"4"}
        >
          {/* Buttons */}
          {btn.map((i, index) => (
            <Button
              color={"whiteAlpha.700"}
              bgColor={"blackAlpha.900"}
              id={index}
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

const CoinCard = ({
  id,
  imgSrc,
  name,
  symbol,
  price,
  currencySymbol = "₹",
}) => {
  return (
    <>
      <Link to={`/coins/${id}`}>
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
            {symbol}
          </Heading>
          <Text noOfLines={1}>{name}</Text>
          <Text noOfLines={1}>
            {currencySymbol}
            {price}
          </Text>
        </VStack>
      </Link>
    </>
  );
};

export default Coin;
