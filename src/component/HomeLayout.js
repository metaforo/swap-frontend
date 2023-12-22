import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const HomeLayout = () => {
    // const navigate = useNavigate();
    // const [user, setUser] = useState("");
    return (
        <>
            <Navbar/>
            <div>
                <Outlet />
            </div>

        </>
    );
};

export default HomeLayout;



// <form
//     onSubmit={e => {
//         e.preventDefault();
//         navigate(`/user/${user}`);
//     }}
// >