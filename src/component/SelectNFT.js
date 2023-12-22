import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
// import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SelectNFTCss from '../css/SelectNFT.module.css';
import ETH from "../asset/ETH.png";

const CustomDialog = styled(Dialog)(
    ({ theme }) => `
    & .MuiPaper-root{
        width: 640px;
        padding: 24px;
        border-radius: 16px;
        border: 1px solid #2D2D32;
        background: #121214;
        box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.20);
        color: #F6F6F6;
    }
`,

);


const CustomDialogTitle = styled('div')(
    ({ theme }) => `
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`,
);




export default function SelectNFT(props) {
    return (
        <React.Fragment>
            <CustomDialog
                onClose={props.handleClose}
                aria-labelledby="customized-dialogTitle"
                open={props.open}
            >
                <CustomDialogTitle id="customized-dialogTitle">
                    <div>
                        Select Project
                    </div>
                    {/*<IconButton*/}
                    {/*    aria-label="close"*/}
                    {/*    onClick={props.handleClose}*/}
                    {/*    sx={{*/}
                    {/*        color: '#878D96',*/}
                    {/*    }}*/}
                    {/*>*/}
                        <CloseIcon
                            aria-label="close"
                            onClick={props.handleClose}
                            sx={{
                            color: '#878D96',
                        }}
                        />
                    {/*</IconButton>*/}
                </CustomDialogTitle>

                <div className={SelectNFTCss.selectNFTInputDiv}>
                    <input className={SelectNFTCss.selectNFTInput}  type={'text'}  placeholder={'Search Collectible'}>

                    </input>

                    <div className={SelectNFTCss.searchIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.22222 1.55556C3.64489 1.55556 1.55556 3.64489 1.55556 6.22222C1.55556 8.79955 3.64489 10.8889 6.22222 10.8889C8.79955 10.8889 10.8889 8.79955 10.8889 6.22222C10.8889 3.64489 8.79955 1.55556 6.22222 1.55556ZM0 6.22222C0 2.78578 2.78578 0 6.22222 0C9.65866 0 12.4444 2.78578 12.4444 6.22222C12.4444 7.66011 11.9567 8.98408 11.1377 10.0377L13.7722 12.6722C14.0759 12.976 14.0759 13.4685 13.7722 13.7722C13.4685 14.0759 12.976 14.0759 12.6722 13.7722L10.0377 11.1377C8.98408 11.9567 7.66011 12.4444 6.22222 12.4444C2.78578 12.4444 0 9.65866 0 6.22222Z" fill="#878D96"/>
                        </svg>
                    </div>

                </div>

                <div className={SelectNFTCss.searchResult}>

                    <div className={SelectNFTCss.searchResultItem}>

                        <img src={ETH} style={{width:'40px'}}  alt="eth"/>

                        <div>ETH</div>

                    </div>

                </div>


            </CustomDialog>
        </React.Fragment>
    );
}
