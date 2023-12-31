import * as React from 'react';
// import { Link, useNavigate, Outlet, NavLink } from "react-router-dom";
import PollCss from '../css/Pool.module.css';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
}));

const Pool = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [list, setList] = React.useState([
        { name : 'ETH - USDC', liq : '243243.1231'  },
        { name : 'ETH - USDC', liq : '321321.3232'  },
        { name : 'ETH - USDC', liq : '31231.21'  },
        { name : 'ETH - USDC', liq : '243243.3243'  },
        { name : 'ETH - USDC', liq : '65466.645'  }
    ])

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