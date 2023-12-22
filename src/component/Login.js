import React , { useEffect }  from "react";
import LoginCss from '../css/Login.module.css';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import argentx from '../asset/argentx.png';
import braavos from '../asset/braavos.png';
import { connect, disconnect } from 'starknetkit'

const Login = (props) => {

    const connectArgentXWallet = async() => {
        const connection = await connect({webWalletUrl: "https://web.argent.xyz"});

        if(connection && connection.isConnected) {
            // setConnection(connection)
            // setProvider(connection.account)
            // setAddress(connection.selectedAddress)
        }
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
                        <div className={`${LoginCss.button} cursor`} onClick={connectArgentXWallet}>
                            <img src={argentx} style={{width:'24px'}}  alt="argentx" />
                           <div>
                               Argent-X
                           </div>
                            <div style={{width:'24px',height:'100%'}}>

                            </div>
                        </div>

                        <div className={`${LoginCss.button} cursor`}>
                            <img src={braavos} style={{width:'24px'}}  alt="braavos" />
                           <div>
                               Braavos
                           </div>
                            <div style={{width:'24px',height:'100%'}}>

                            </div>
                        </div>

                    </div>

                </div>

            </Modal>

        </>
    );
};

export default Login;
