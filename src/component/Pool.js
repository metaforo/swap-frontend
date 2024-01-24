import React , { useEffect }  from "react";
// import { Link, useNavigate, Outlet, NavLink } from "react-router-dom";
import PollCss from '../css/Pool.module.css';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useQuery, gql } from "@apollo/client";
import {useAccount, useConnect, useDisconnect} from "@starknet-react/core";
import gqlClient from "../util/gqlClient";
import http from "../util/http";

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        width: '100%',
        backgroundColor: '#16E76D',
    },
});

interface StyledTabProps {
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: '#878D96',
    '&.Mui-selected': {
        color: '#16E76D',
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#16E76D',
    },
}))

// const FILMS_QUERY = gql`
//   {
//   list_liquidity(account:"0x0112C1E020708b84aaC85983734A6ffB5fCe89891e8414e4E54F94CE75c06a90"){
//      token_id
//   }
// }
// `;

const Pool = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { address,account } = useAccount();

    const [list, setList] = React.useState([
        { name : 'ETH - USDC', liq : '243243.1231'  },
        { name : 'ETH - USDC', liq : '321321.3232'  },
        { name : 'ETH - USDC', liq : '31231.21'  },
        { name : 'ETH - USDC', liq : '243243.3243'  },
        { name : 'ETH - USDC', liq : '65466.645'  }
    ])

    useEffect(() => {


        const GET_LIST_LIQUIDITY_QUERY = gql`
  query getListLiquidity($account: String!) {
    list_liquidity(account: $account) {
      token_id
    }
  }
`

         http.post('https://instaswap-api.metaforo.io/query',{
             "query": "query getListLiquidity {\n  list_liquidity(account:\"0x0112C1E020708b84aaC85983734A6ffB5fCe89891e8414e4E54F94CE75c06a90\"){\n     token_id\n  }\n}",
             "operationName": "getListLiquidity"
         }).then( response => {
            // const responseData = response?.data;
            console.log(response);
        } )




        // gqlClient.query({
        //     query: GET_LIST_LIQUIDITY_QUERY,
        //     variables: {
        //         account: "0x0112C1E020708b84aaC85983734A6ffB5fCe89891e8414e4E54F94CE75c06a90"
        //     }
        // }).then(response => {
        //     // 处理响应数据
        //     console.log(response.data);
        // }).catch(error => {
        //     // 处理错误情况
        //     console.error(error);
        // });



    }, [value]);


    return (
        <>
            <div className={PollCss.poolBg}>
                <div className={PollCss.poolTitle}>
                    Pools Overview
                </div>
                <div className={PollCss.poolCard}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ bgcolor: 'transparent' }}>
                            <StyledTabs
                                value={value}
                                onChange={handleChange}
                                aria-label="styled tabs example"
                            >
                                <StyledTab label="Pools" value="1" />
                                <StyledTab label="My Pools" value="2" />

                                <div className={PollCss.titleRight}>
                                    <div className={'btn1 cursor'}>
                                        + New Position
                                    </div>
                                </div>

                            </StyledTabs>
                        </Box>


                                <div className={PollCss.pollList}>
                                    <div className={`${PollCss.pollListTitle} ${PollCss.pollListItem}`}>

                                        <div className={PollCss.pollListItem1}>
                                            Name
                                        </div>
                                        <div className={PollCss.pollListItem2}>
                                            Liquidity
                                        </div>
                                        <div className={PollCss.pollListItem3}>
                                            ADD
                                        </div>

                                    </div>


                                    {list.map((item, index) => {
                                            return   (

                                                <div key={index} className={`${PollCss.pollListContent}  ${PollCss.pollListItem}`}>

                                                    <div className={PollCss.pollListItem1}>
                                                        {item.name}
                                                    </div>
                                                    <div className={PollCss.pollListItem2}>
                                                        $ {item.liq}
                                                    </div>
                                                    <div className={PollCss.pollListItem3}>
                                                        Add Liquidity
                                                    </div>

                                                </div>

                                            )
                                        }

                                    )}


                                </div>

                        <div>

                        </div>
                    </Box>
                </div>

            </div>

        </>

    );
};

export default Pool;



// <form
//     onSubmit={e => {
//         e.preventDefault();
//         navigate(`/user/${user}`);
//     }}
// >