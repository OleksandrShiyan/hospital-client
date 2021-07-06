import React, {useEffect, useState} from 'react';
import Navbar from "./components/Navbar/Navbar";
import {withRouter, Route} from 'react-router-dom'
import Dashboard from "./components/Dashboard/Dashboard";
import Stuff from "./components/Stuff/Stuff";
import Alerts from "./components/Alerts/Alerts";
import Sequence from "./components/Sequence/Sequence";
import Login from "./components/Authorization/Login";
import Signup from "./components/Authorization/Signup";

export interface User {
    id: number;
    login: string;
    password: string;
    roleId: number;
    specializationId: number;
    role: {
        id: number;
        name: string;
    }
}

export interface Specialist {
    id: number;
    fullname: string;
    email: string;
    phone: string;
}

export const initialUser = {
    id: 1,
    login: 'Initial',
    password: 'Initial',
    roleId: 1,
    specializationId: 1,
    role: {
        id: 1,
        name: "Initial"
    }
}

function App() {

    const [authUser, setAuthUser] = useState<User>(initialUser);

    return (
        <div>
            <Navbar authUser={authUser} setAuthUser={setAuthUser}/>
            <div>
                <Route path={'/dashboard'} render={() => <Dashboard/>}/>
                <Route path={'/stuff'} render={() => <Stuff/>}/>
                <Route path={'/alert'} render={() => <Alerts/>}/>
                <Route path={'/sequence'} render={() => <Sequence/>}/>
                <Route path={'/login'} render={() => <Login authUser={authUser} setAuthUser={setAuthUser}/>}/>
                <Route path={'/signup'} render={() => <Signup setAuthUser={setAuthUser}/>}/>
            </div>
        </div>
    );
}

export default withRouter(App);
