import React from "react";
import InstarSwap from '../asset/InstarSwap.png';
import NavbarCss from '../css/Navbar.module.css';
import Login from './Login';
import { useNavigate } from "react-router-dom";
import { useAccount } from '@starknet-react/core'; // Import the useAccount hook

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const { address } = useAccount(); // Retrieve the connected wallet address

    return (
        <>
            <div className={NavbarCss.Navbar} >
                <div className={'cursor'}>
                    <img
                        onClick={e => {
                            e.preventDefault();
                            navigate(`/`);
                        }}
                        src={InstarSwap} style={{width:'50%'}}  alt="InstaSwap" />
                </div>

                <div className={NavbarCss.navbarRight}>
                    <div className={`${NavbarCss.NavbarText} cursor`}>Assets</div>
                    <div className={`${NavbarCss.NavbarText} cursor`}
                            onClick={e => {
                                e.preventDefault();
                                navigate(`/pool`);
                            }}
                    >Pool</div>
                    <div className={`${NavbarCss.NavbarText} cursor`}>FQA</div>
                    <div className={`${NavbarCss.NavbarText} cursor`}>Docs</div>

                    <div className={NavbarCss.connectWallet}>

                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_214_70)">
                                <g clip-path="url(#clip1_214_70)">
                                    <path d="M13.0912 0H2.9088C1.3088 0 0 1.3088 0 2.9088V13.0904C0 14.6904 1.3088 15.9992 2.9088 15.9992H13.0904C14.6904 15.9992 15.9992 14.6904 15.9992 13.0904V2.9088C15.9992 1.3088 14.6904 0 13.0904 0H13.0912ZM14.5456 10.1816H10.9096C9.7096 10.1816 8.728 9.2 8.728 8C8.728 6.8 9.7096 5.8184 10.9096 5.8184H14.5456V10.1824V10.1816ZM10.9096 4.3632C8.9096 4.3632 7.2736 5.9992 7.2736 7.9992C7.2736 9.9992 8.9096 11.6352 10.9096 11.6352H14.5456V13.0896C14.5456 13.8896 13.8912 14.544 13.0912 14.544H2.9088C2.1088 14.544 1.4544 13.8896 1.4544 13.0896V2.9088C1.4544 2.1088 2.1088 1.4544 2.9088 1.4544H13.0904C13.8904 1.4544 14.5448 2.1088 14.5448 2.9088V4.3632H10.9088H10.9096Z" fill="#16E76D"/>
                                    <path d="M9.81836 8.00001C9.81836 8.60241 10.3064 9.09121 10.9088 9.09121C11.5112 9.09121 12 8.60321 12 8.00081C12 7.39761 11.512 6.90881 10.9096 6.90881C10.3072 6.90881 9.81836 7.39681 9.81836 7.99921V8.00001Z" fill="#16E76D"/>
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_214_70">
                                    <rect width="16" height="16" fill="white"/>
                                </clipPath>
                                <clipPath id="clip1_214_70">
                                    <rect width="16" height="16" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>

                        {address ? (
                            <span className={'cursor'}>{`Connected: ${address}`}</span>
                        ) : (
                            <>
                                <svg /* SVG contents truncated for brevity */></svg>
                                <span className={'cursor'} onClick={handleOpen}>Connect Wallet</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Login open={open} handleClose={handleClose}></Login>

        </>
    );
};

export default Navbar;
