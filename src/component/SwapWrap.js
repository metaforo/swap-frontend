import React, {useMemo, useState, useCallback, useEffect} from "react";
import InstarSwap from '../asset/InstarSwap.png';
import NavbarCss from '../css/Navbar.module.css';
import Login from './Login';
import { useNavigate } from "react-router-dom";

import {constants, Provider} from "starknet";
import { useConnect, Connector,useAccount,useDisconnect,useSignTypedData } from "@starknet-react/core";
import { Wrap } from "instaswap-core";
import { FeeAmount, SwapDirection } from "instaswap-core";

const SwapWrap = () => {

    const { address, account } = useAccount();

    const [erc1155AmountForSwap, setERC1155AmountForSwap] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);



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
    const nft_address = useMemo(
        () => "0x1090e3cfd9990c396f246cd1d5c7fb091905cba9f99739653db1f2960a3311f",
        [],
    );

    const provider = new Provider({ rpc: { nodeUrl: 'https://cloud.argent-api.com/v1/starknet/goerli/rpc/v0.5' }});

    const config = {
        erc1155Address: erc1155_address,
        werc20Address: werc20_address,
        erc20Address: eth_address,
        ekuboPositionAddress: ekubo_position_address,
        ekuboCoreAddress: ekubo_core_address,
        quoterAddress: quoter,
        provider: provider,
        account: account,
    };

    const wrap = new Wrap(config);

    const handleSwapFromERC1155ToERC20BySimpleSwap = useCallback(async () => {
        if (!account) return;

        const params = {
            amountIn: erc1155AmountForSwap,
            minERC20AmountOut: 1313331313,
            simpleSwapperAddress: simple_swapper,
            userAddress: account.address,
            fee: FeeAmount.LOWEST,
            slippage: 0.99,
        };

        const { transaction_hash } = await wrap.swapSimple(
            SwapDirection.ERC1155_TO_ERC20,
            params,
        );
        console.log(transaction_hash);
    }, [account, erc1155AmountForSwap, currentPrice]);


    useEffect(() => {
        getCurrentPrice();
        const interval = setInterval(() => {
            getCurrentPrice();
        }, 3000);
        return () => clearInterval(interval);
    }, []);


    const getCurrentPrice = useCallback(async () => {
        if (!address) return;
        const p = await wrap.quoteSingle(
            FeeAmount.LOWEST,
            eth_address,
            BigInt(10 ** 7),
        );
        const realPrice = p / 10 ** 7;
        setCurrentPrice(realPrice);
    }, [address, erc1155_address, account]);


    return (
        <>
            <div>
                <h3> Swap From ERC1155 to ERC20 By SimpleSwapper </h3>
            </div>
            <div>
                <label htmlFor="erc1155 amount">ERC1155 amount:</label>
                <input
                    type="number"
                    id="erc1155 amount"
                    value={erc1155AmountForSwap}
                    onChange={(e) => setERC1155AmountForSwap(parseFloat(e.target.value))}
                />
            </div>
            <div>
                <button onClick={handleSwapFromERC1155ToERC20BySimpleSwap}>swap</button>
            </div>

        </>
    );
};

export default SwapWrap;
