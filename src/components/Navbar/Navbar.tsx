import React from 'react';
import {NavLink} from 'react-router-dom'
import {initialUser, User} from "../../App";

interface navbarProps {
    authUser: User
    setAuthUser: (user: User) => void
}

enum roles {
    admin = 'Admin',
    doctor = 'Doctor',
    assistant = 'Assistant',
    receptionist = 'Receptionist',
    initial = 'Initial'
}

const Navbar = ({authUser, setAuthUser}: navbarProps) => {

    return (
        <div>
            Navbar
            {
                authUser.role.name == roles.admin || authUser.role.name == roles.doctor
                || authUser.role.name == roles.assistant || authUser.role.name == roles.receptionist
                    ? <div><NavLink to={'/dashboard'}>Dashboard</NavLink></div>
                    : null
            }
            {
                authUser.role.name == roles.admin || authUser.role.name == roles.assistant || authUser.role.name == roles.receptionist
                    ? <div><NavLink to={'/stuff'}>Stuff</NavLink></div>
                    : null
            }
            {
                authUser.role.name == roles.admin
                    ? <div>
                        <div><NavLink to={'/alert'}>Alerts</NavLink></div>
                        <div><NavLink to={'/sequence'}>Sequence</NavLink></div>
                    </div>
                    : null
            }
            {
                authUser.role.name == roles.initial
                    ? <div>
                        <div><NavLink to={'/login'}>Login</NavLink></div>
                        <div><NavLink to={'/signup'}>Sign Up</NavLink></div>
                    </div>
                    : <div>{authUser.login}
                    <button onClick={() => setAuthUser(initialUser)}>Logout</button>
                    </div>

            }
        </div>
    );
};

export default Navbar;