import React, {useEffect, useState} from 'react';
import {NavLink, Route, useLocation} from "react-router-dom";
import Doctors from "./StuffList/Doctor/Doctors";
import Assistants from "./StuffList/Assistant/Assistants";
import CreateUser from "./StuffList/UserOperations/CreateUser/CreateUser";
import Receptionists from './StuffList/Receptionist/Receptionists';
import style from './Stuff.module.scss';

const Stuff = () => {

    const location = useLocation();
    const path = location.pathname

    const [edit, setEdit] = useState(0);
    const [deleteId, setDeleteId] = useState(0);
    const [userRoleId, setUserRoleId] = useState(0);
    const [userRole, setUserRole] = useState(0);

    useEffect(() => {
        console.log('User role: ', userRole)
    }, [userRole])

    return (
        <div className={style.stuffWrapper}>
            <div className={style.jobWrapper}>
                <NavLink className={path === '/stuff/doctors' ? style.currentJob : style.job} to={'/stuff/doctors'}>Doctors</NavLink>
                <NavLink className={path === '/stuff/assistants' ? style.currentJob : style.job} to={'/stuff/assistants'}>Assistants</NavLink>
                <NavLink className={path === '/stuff/receptionists' ? style.currentJob : style.job} to={'/stuff/receptionists'}>Receptionists</NavLink>
            </div>
            <div>
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