import React, { useEffect, useMemo, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Wrap } from "instaswap-core";
import { Provider, constants, cairo, shortString, num, RpcProvider } from "starknet";
import { useAccount } from "@starknet-react/core";


// Define the TypeScript types for the GraphQL response
type ListLiquidityResponse = {
  list_liquidity: {
    token_id: number;
  }[];
};

// Define the TypeScript types for the attributes in the JSON data
interface TokenAttribute {
  trait_type: string;
  value: string;
  // Include other known properties here if necessary
}

// Define the query with the appropriate GraphQL syntax
const GET_LIST_LIQUIDITY = gql`
  query getListLiquidity($account: String!) {
    list_liquidity(account: $account) {
      token_id
    }
  }
`;

interface TokenDetails {
  name: string;
  description: string;
  image: string;
  attributes: TokenAttribute[];
  // Include other known properties here
}


const LiquidityList: React.FC = () => {
  const { address, account } = useAccount();
  const shouldSkipQuery = !address;

  // Use the useQuery hook with the response type
  const { loading, error, data } = useQuery<ListLiquidityResponse>(GET_LIST_LIQUIDITY, {
    variables: { account: address },
    skip: !address, // This will skip the query if address is undefined or empty
  });

  // State to store additional token data
  const [tokenDetails, setTokenDetails] = useState<{ [key: number]: TokenDetails }>({});

  // State to store the fetched JSON data
  const [tokenInfo, setTokenInfo] = useState<{ [key: number]: any }>({});

  const erc1155_address = useMemo(
    () => "0x03467674358c444d5868e40b4de2c8b08f0146cbdb4f77242bd7619efcf3c0a6",
    [],
  );

  const werc20_address = useMemo(
    () => "0x06b09e4c92a08076222b392c77e7eab4af5d127188082713aeecbe9013003bf4",
    [],
  );
  const eth_address = useMemo(
    () => "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    [],
  );

  const ekubo_position_address = useMemo(
    () => "0x73fa8432bf59f8ed535f29acfd89a7020758bda7be509e00dfed8a9fde12ddc",
    [],
  );
  const ekubo_core_address = useMemo(
    () => "0x031e8a7ab6a6a556548ac85cbb8b5f56e8905696e9f13e9a858142b8ee0cc221",
    [],
  );

  const simple_swapper = useMemo(
    () => "0x064f7ed2dc5070133ae8ccdf85f01e82507facbe5cdde456e1418e3901dc51a0",
    [],
  );
  const quoter = useMemo(
    () => "0x042aa743335663ed9c7b52b331ab7f81cc8d65280d311506653f9b5cc22be7cb",
    [],
  );
  const ekubo_nft_address = useMemo(
    () => "0x1090e3cfd9990c396f246cd1d5c7fb091905cba9f99739653db1f2960a3311f",
    [],
  );
  const provider = new RpcProvider({ nodeUrl: 'https://starknet-testnet.public.blastapi.io/' });

  const config = {
    erc1155Address: erc1155_address,
    werc20Address: werc20_address,
    erc20Address: eth_address,
    ekuboPositionAddress: ekubo_position_address,
    ekuboCoreAddress: ekubo_core_address,
    quoterAddress: quoter,
    provider: provider,
    account: account,
    ekuboNFTAddress: ekubo_nft_address,
  };

  const wrap = new Wrap(config);

  useEffect(() => {
    if (data) {
      (async () => {
        try {
          for (const liquidity of data.list_liquidity) {
            const res = await Wrap.getNFTTokenUri(liquidity.token_id);
            const longString = res.map((shortStr: bigint) => {
              return shortString.decodeShortString(num.toHex(shortStr));
            }).join("");

            // Fetch the JSON from the URL
            const response = await fetch(longString);
            const jsonData = await response.json();

            // Update the tokenInfo state with the fetched data
            setTokenInfo((prevTokenInfo) => ({
              ...prevTokenInfo,
              [liquidity.token_id]: jsonData
            }));

            // You can also update your tokenDetails state here if you need to
            // setTokenDetails(...)
          }
        } catch (error) {
          console.error('Error fetching token details:', error);
        }
      })();
    }
  }, [data]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <ul>
      {data && data.list_liquidity.map((liquidity, index) => (
        <li key={index}>
          Token ID: {liquidity.token_id}
          {tokenInfo[liquidity.token_id] && (
            <div>
              <p>Name: {tokenInfo[liquidity.token_id].name}</p>
              <p>Description: {tokenInfo[liquidity.token_id].description}</p>
              <img src={tokenInfo[liquidity.token_id].image} alt="Token" />
              {/* Map over the attributes array */}
              {tokenInfo[liquidity.token_id].attributes.map((attribute: TokenAttribute, attrIndex: number) => (
  <p key={attrIndex}>{attribute.trait_type}: {attribute.value}</p>
))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default LiquidityList;