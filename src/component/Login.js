import React, { useCallback } from "react";
import LoginCss from '../css/Login.module.css';
import Modal from '@mui/material/Modal';
import argentx from '../asset/argentx.png';
import braavos from '../asset/braavos.png';
import { useConnect } from "@starknet-react/core";

const Login = ({ open, handleClose }) => {
    const { connect, connectors } = useConnect();

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={LoginCss.modalBox}>
                <div className={LoginCss.boxContent}>
                    <div>Connect a Wallet</div>
                    {connectors.map((connector) => (
                        <div
                            key={connector.id}
                            className={`${LoginCss.button} cursor`}
                            onClick={() => connect({ connector })}
                            disabled={!connector.available()}
                        >
                            <img
                                src={connector.id === 'argentX' ? argentx : braavos}
                                className={LoginCss.walletIcon}
                                alt={connector.name}
                            />
                            <div>{connector.name}</div>
                            <div className={LoginCss.spacer}></div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default Login;