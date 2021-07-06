import React, {useEffect, useState} from 'react';
import {NavLink, Route} from "react-router-dom";
import Doctors from "./StuffList/Doctor/Doctors";
import Assistants from "./StuffList/Assistant/Assistants";
import CreateUser from "./StuffList/UserOperations/CreateUser/CreateUser";
import Receptionists from './StuffList/Receptionist/Receptionists';

const Stuff = () => {

    const [edit, setEdit] = useState(0);
    const [deleteId, setDeleteId] = useState(0);
    const [userRoleId, setUserRoleId] = useState(0);
    const [userRole, setUserRole] = useState(0);

    useEffect(() => {
        console.log('User role: ', userRole)
    }, [userRole])

    return (
        <div>
            Stuff
            <div>
                <div><NavLink to={'/stuff/doctors'}>Doctors</NavLink></div>
                <div><NavLink to={'/stuff/assistants'}>Assistants</NavLink></div>
                <div><NavLink to={'/stuff/receptionists'}>Receptionists</NavLink></div>

                <Route path={'/stuff/doctors'} render={() =>
                    <Doctors setUserRoleId={setUserRoleId} deleteId={deleteId} setUserRole={setUserRole}
                             setDeleteId={setDeleteId} edit={edit} setEdit={setEdit} userRole={userRole}/>}/>
                <Route path={'/stuff/assistants'} render={() =>
                    <Assistants setUserRoleId={setUserRoleId} deleteId={deleteId} setUserRole={setUserRole}
                                setDeleteId={setDeleteId} edit={edit} setEdit={setEdit} userRole={userRole}/>}/>
                <Route path={'/stuff/receptionists'} render={() =>
                    <Receptionists setUserRoleId={setUserRoleId} deleteId={deleteId} setUserRole={setUserRole}
                                   setDeleteId={setDeleteId} edit={edit} setEdit={setEdit} userRole={userRole}/>}/>
            </div>
            {
                userRoleId
                    ? <CreateUser userRole={userRole} userRoleId={userRoleId} setUserRoleId={setUserRoleId}/>
                    : null
            }
        </div>
    );
};

export default Stuff;