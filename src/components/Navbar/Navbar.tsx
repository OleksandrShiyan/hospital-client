import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { initialUser, User } from '../../App';
import style from './Navbar.module.scss';
import DashboardDark from '../../assets/DashBoardDark.svg';
import DashboardLight from '../../assets/DashboardLigth.svg';
import StuffDark from '../../assets/StuffDark.svg';
import StuffLight from '../../assets/StuffLigth.svg';
import BellDark from '../../assets/BellDark.svg';
import BellLight from '../../assets/BellLigth.svg';
import SequenceDark from '../../assets/SequenceDark.svg';
import SequenceLight from '../../assets/SequenceLigth.svg';
import { ReactComponent as IconLogOut } from '../../assets/Logout.svg';

interface navbarProps {
  authUser: User;
  setAuthUser: (user: User) => void;
}

enum roles {
  admin = 'Admin',
  doctor = 'Doctor',
  assistant = 'Assistant',
  receptionist = 'Receptionist',
  initial = 'Initial',
}

const Navbar = ({ authUser, setAuthUser }: navbarProps) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className={style.navbarWrapper}>
      <div className={style.pagesWrapper}>
        <span className={style.logo}>Logo</span>
        {authUser.role.name === roles.admin ||
        authUser.role.name === roles.doctor ||
        authUser.role.name === roles.assistant ||
        authUser.role.name === roles.receptionist ? (
          <NavLink
            className={path === '/dashboard' ? style.activePage : style.page}
            to="/dashboard"
          >
            <img
              className={style.pageIcon}
              src={path === '/dashboard' ? DashboardLight : DashboardDark}
              alt=""
            />
            Dashboard
          </NavLink>
        ) : null}
        {authUser.role.name === roles.admin ||
        authUser.role.name === roles.assistant ||
        authUser.role.name === roles.receptionist ? (
          <NavLink
            className={path.includes('/stuff') ? style.activePage : style.page}
            to="/stuff"
          >
            <img
              className={style.pageIcon}
              src={path.includes('/stuff') ? StuffLight : StuffDark}
              alt=""
            />
            Stuff
          </NavLink>
        ) : null}
        {authUser.role.name === roles.admin ? (
          <NavLink className={path === '/alert' ? style.activePage : style.page} to="/alert">
            <img className={style.pageIcon} src={path === '/alert' ? BellLight : BellDark} alt="" />
            Alerts
          </NavLink>
        ) : null}
        {authUser.role.name === roles.admin ? (
          <NavLink
            className={path === '/sequence' ? style.activePage : style.page}
            to="/sequence"
          >
            <img
              className={style.pageIcon}
              src={path === '/sequence' ? SequenceLight : SequenceDark}
              alt=""
            />
            Sequence
          </NavLink>
        ) : null}
      </div>
      {authUser.role.name === roles.initial ? (
        <div className={style.loginWrapper}>
          <NavLink className={style.logoutWrapper} to="/login">
            <IconLogOut className={style.pageIcon} />
            Login
          </NavLink>
        </div>
      ) : (
        <div className={style.loginWrapper}>
          <span className={style.userLogin}>User: {authUser.login}</span>
          <div onClick={() => setAuthUser(initialUser)} className={style.logoutWrapper}>
            <IconLogOut className={style.pageIcon} />
            <span>Sign out</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;