import React , { useEffect, useMemo }  from "react";
import LoginCss from '../css/Login.module.css';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import argentx from '../asset/argentx.png';
import braavos from '../asset/braavos.png';

import { useConnect, Connector,useAccount,useDisconnect,useSignTypedData } from "@starknet-react/core";

import { Provider, constants, cairo } from "starknet";

const Login = (props) => {


    const { connectAsync, connectors ,connect} = useConnect();
    const { address,account } = useAccount();

    const login = async(connector) => {

        const connection = await connectAsync({connector});



    }


    useEffect(() => {

        if(props.open){

        }

    }, [props.open]);

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modalTitle"
                aria-describedby="modal-modal-description"
            >
                <div className={LoginCss.modalBox}>
                    <div className={LoginCss.boxContent}>
                        <div>Connet a Wallet</div>

                        {
                            connectors.map((connector) => (
                                <div className={`${LoginCss.button} cursor`}   onClick={
                                    e => {
                                    e.preventDefault();
                                    login(connector).then(()=>{

                                    } );

                                }}>
                                    <img src={connector.name == 'Argent' ? argentx:braavos} style={{width:'24px'}}  alt=" {connector.name}" />
                                    <div>
                                        {connector.name}
                                    </div>
                                    <div style={{width:'24px',height:'100%'}}>

                                    </div>
                                </div>
                            ))
                        }

                    </div>

                </div>

            </Modal>

        </>
    );
};

export default Login;
