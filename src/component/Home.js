// import { Link, useNavigate, Outlet, NavLink } from "react-router-dom";
import HomeCss from '../css/Home.module.css';
import QuantityInput from "./QuantityInput";
import ETH from '../asset/ETH.png';
import SelectNFT from "./SelectNFT";

import React, {useMemo, useState, useCallback, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import {constants, Provider} from "starknet";
import { useConnect, Connector,useAccount,useDisconnect,useSignTypedData } from "@starknet-react/core";
import { Wrap } from "instaswap-core";
import { FeeAmount, SwapDirection } from "instaswap-core";

const Home = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const quantityInputRef = useRef();


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
            amountIn: quantityInputRef.current.getValue(),
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
            <div className={HomeCss.homeBg}>
                <div className={HomeCss.homeTitle}>
                    NFT Liquidity Protocol
                </div>

                <div className={`${HomeCss.homeDesc} mt24`}>
                    Trade, swap & sell NFTs. The NFT20 protocol offers NFT liquidity pools to help developers build the next generation of NFT apps.
                </div>

                <div className={`${HomeCss.homeCard} mt64`}>
                    <div className={HomeCss.homeCardTitle}>
                        Buy & Sell Your NFTs with 1-click
                    </div>

                    <div className={HomeCss.cardInput}>
                        <div className={HomeCss.cardInputTitle}>
                            <div onClick={handleOpen} className={`${HomeCss.cardInputTitleSelect} cursor`}>
                                Select a NFT
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                <path d="M8.25717 0.301358C8.45554 0.100697 8.69465 0.000366211 8.97449 0.000366211C9.25434 0.000366211 9.49345 0.100697 9.69182 0.301358C9.89727 0.50202 10 0.742097 10 1.02159C10 1.30108 9.89727 1.54116 9.69182 1.74182L5.71732 5.74072C5.63231 5.84105 5.52604 5.91092 5.39851 5.95034C5.27099 5.98975 5.13638 6.00588 4.99469 5.99871C4.85299 5.99155 4.71307 5.96109 4.57492 5.90734C4.43677 5.85359 4.3181 5.77655 4.21892 5.67622L0.308183 1.74182C0.102728 1.54116 0 1.30108 0 1.02159C0 0.742097 0.102728 0.50202 0.308183 0.301358C0.407368 0.201028 0.518951 0.12578 0.642933 0.0756143C0.766915 0.0254489 0.894438 0.000366211 1.0255 0.000366211C1.15657 0.000366211 1.28587 0.0254489 1.41339 0.0756143C1.54091 0.12578 1.65427 0.201028 1.75345 0.301358L5.00531 3.54778L8.25717 0.301358Z" fill="#71717A"/>
                            </svg>

                        </div>

                        <QuantityInput max={99} ref={quantityInputRef} ></QuantityInput>


                        <div className={HomeCss.cardInputBalance}>

                            <span>
                                Balance :
                            </span>

                            <span className={HomeCss.balanceColor}>
                                &nbsp;0
                            </span>
                        </div>



                        <div className={HomeCss.chooseCurrency}>
                            Choose a currency
                        </div>

                        <div  className={HomeCss.chooseCurrencyInput}>

                            <div className={HomeCss.chooseCurrencyInputLeft}>
                                <img src={ETH} style={{width:'24px'}}  alt="eth"/>
                                <div>
                                    ETH
                                </div>
                            </div>

                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                    <path d="M8.25717 0.301358C8.45554 0.100697 8.69465 0.000366211 8.97449 0.000366211C9.25434 0.000366211 9.49345 0.100697 9.69182 0.301358C9.89727 0.50202 10 0.742097 10 1.02159C10 1.30108 9.89727 1.54116 9.69182 1.74182L5.71732 5.74072C5.63231 5.84105 5.52604 5.91092 5.39851 5.95034C5.27099 5.98975 5.13638 6.00588 4.99469 5.99871C4.85299 5.99155 4.71307 5.96109 4.57492 5.90734C4.43677 5.85359 4.3181 5.77655 4.21892 5.67622L0.308183 1.74182C0.102728 1.54116 0 1.30108 0 1.02159C0 0.742097 0.102728 0.50202 0.308183 0.301358C0.407368 0.201028 0.518951 0.12578 0.642933 0.0756143C0.766915 0.0254489 0.894438 0.000366211 1.0255 0.000366211C1.15657 0.000366211 1.28587 0.0254489 1.41339 0.0756143C1.54091 0.12578 1.65427 0.201028 1.75345 0.301358L5.00531 3.54778L8.25717 0.301358Z" fill="#71717A"/>
                                </svg>
                            </div>

                        </div>


                    </div>


                    <div className={HomeCss.cardSwapButton} onClick={handleSwapFromERC1155ToERC20BySimpleSwap}>
                        SWAP
                    </div>


                </div>

                <div className={HomeCss.homePost}>
                    <div className={HomeCss.homePostBlock}>
                        <div className={HomeCss.homePostTitle}>25569+</div>
                        <div className={HomeCss.homePostDesc}>Total NFTs locked</div>
                    </div>
                    <div className={HomeCss.homePostBlock}>
                        <div className={HomeCss.homePostTitle}>316+</div>
                        <div className={HomeCss.homePostDesc}>Total pools</div>
                    </div>
                    <div className={HomeCss.homePostBlock}>
                        <div className={HomeCss.homePostTitle}>5K+</div>
                        <div className={HomeCss.homePostDesc}>NFTs exchanged this week</div>
                    </div>

                </div>

                <SelectNFT open={open} handleClose={handleClose}></SelectNFT>



            </div>
        </>
    );
};

export default Home;