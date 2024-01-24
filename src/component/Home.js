import React from "react";
// import { Link, useNavigate, Outlet, NavLink } from "react-router-dom";
import HomeCss from '../css/Home.module.css';
import QuantityInput from "./QuantityInput";
import ETH from '../asset/ETH.png';
import SelectNFT from "./SelectNFT";
import SwapWrap from "./SwapWrap";

const Home = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

                        <QuantityInput max={99}></QuantityInput>


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


                    <div className={HomeCss.cardSwapButton}>
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

                <SwapWrap/>

            </div>
        </>
    );
};

export default Home;