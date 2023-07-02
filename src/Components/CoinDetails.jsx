import {
  Box,
  HStack,
  Badge,
  Progress,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Button,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { server } from "../index.js";
import { useParams } from "react-router-dom";
import Error from "./Error.jsx";
import Loader from "./Loader.jsx";
import Chart from "./Chart.jsx";

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const [chartArray, setChartArray] = useState([]);
  const [days, setDays] = useState("24h");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const fun = (i) => {
    switch (i) {
      case "24h":
        setDays("24h");
        break;

      case "7d":
        setDays("7d");
        break;

      case "14d":
        setDays("14d");
        break;

      case "30d":
        setDays("30d");
        break;

      case "60d":
        setDays("60d");
        break;

      case "200d":
        setDays("200d");
        break;

      case "365d":
        setDays("365d");
        break;

      case "max":
        setDays("max");
        break;
    }
  };

  useEffect(() => {
    const fetchSingleCoin = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/${params.id}` // Here we want the id of the coin. So we can get it from useParams hook.
        );

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData?.prices);
        // console.log(chartData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        <Error />;
      }
    };

    fetchSingleCoin();
  }, [params.id, currency, days]);

  // console.log(chartArray);

  return !loading ? (
    <VStack w={"full"} h={"full"}>
      <Box borderWidth={1} width={"full"} p={"4"}>
        {/* Here we will have our chart */}
        <Chart arr={chartArray} currency={currencySymbol} days={days} />
      </Box>

      <HStack p={"4"} overflowY={"auto"} w={"full"}>
        {btns.map((i) => (
          <Button
            key={i}
            onClick={() => {
              fun(i);
            }}
          >
            {i}
          </Button>
        ))}
      </HStack>

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

      <Text>Last updated on {Date().split("G")[0]}</Text>

      <VStack
        w={"full"}
        h={"full"}
        display={"block"}
        // justifyContent={"flex-start"}
        // border={"2px"}
        p={"4"}
      >
        <Image
          src={coin?.image?.large} // Because in the API, image itself is a object
          w={"16"}
          h={"16"}
          objectFit={"contain"}
        />
        <Stat>
          <StatLabel mt={"2"}>{coin.name}</StatLabel>
          <StatNumber>
            {currencySymbol}
            {coin?.market_data?.current_price[currency]}
          </StatNumber>
          <StatHelpText>
            <StatArrow
              type={
                coin?.market_data?.price_change_percentage_24h > 0
                  ? "increase"
                  : "decrease"
              }
            />
            {coin?.market_data?.price_change_percentage_24h}%
          </StatHelpText>
        </Stat>

        <Button
          bgColor={"blackAlpha.900"}
          color={"whiteAlpha.900"}
          variant={"unstyled"}
          w={"12"}
          h={"12"}
          mb={"4"}
        >
          #{coin?.coingecko_rank}
        </Button>

        <CustomBar
          high={`${currencySymbol}${coin?.market_data?.high_24h[currency]}`}
          low={`${currencySymbol}${coin?.market_data?.low_24h[currency]}`}
        />

        <HStack justifyContent={"space-between"}>
          <Text>Max Supply</Text>
          <Text>{coin?.market_data?.max_supply}</Text>
        </HStack>

        <HStack justifyContent={"space-between"}>
          <Text>Circulating Supply</Text>
          <Text>{coin?.market_data?.circulating_supply}</Text>
        </HStack>

        <HStack justifyContent={"space-between"}>
          <Text>Market Cap Supply</Text>
          <Text>{`${currencySymbol}${coin?.market_data?.market_cap[currency]}`}</Text>
        </HStack>

        <HStack justifyContent={"space-between"}>
          <Text>All time low</Text>
          <Text>{`${currencySymbol}${coin?.market_data?.atl[currency]}`}</Text>
        </HStack>

        <HStack justifyContent={"space-between"}>
          <Text>All time high</Text>
          <Text>{`${currencySymbol}${coin?.market_data?.ath[currency]}`}</Text>
        </HStack>
      </VStack>
    </VStack>
  ) : (
    <Loader />
  );
};

const CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress value={50} colorScheme={"teal"} w={"full"} />

      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme={"red"} />
        <Text fontSize={"sm"}>24H Range</Text>
        <Badge children={high} colorScheme={"green"} />
      </HStack>
    </VStack>
  );
};

export default CoinDetails;
