import style from "./Group.module.css";
import playSVG from "../../../assets/images/play.svg";
// import Button from '../../buttons/Buttons';
import Icon from "./Icon";
import { NavLink } from "react-router-dom";
import sendSVG from "../../../assets/images/send.svg";
import addSVG from "../../../assets/images/add.svg";
import publicSVG from "../../../assets/images/public.svg";

// import {useState} from 'react';

interface Params {
  name: string;
  imgURL: string;
  goTo: string;
}

function Group(props: Params) {
  return (
    <div className={style.Group}>
      <NavLink
        to={props.goTo}
        className={({ isActive }) => (isActive ? style.active : style.inactive)}
      >
        <div className={style.wrapper}>
          <div className={style.test}>
            <div className={style.activeLink}></div>
          </div>
          <div className={style.tooltiptext}>{props.name}</div>
          <Icon imgURL={props.imgURL} />
        </div>
      </NavLink>
    </div>
  );
}

function PrivateMessages() {
  return (
    <div className={style.messages}>
      <Group name="Private messages" goTo="/messages" imgURL={sendSVG} />
    </div>
  );
}

function AddGroup() {
  return (
    <div className={style.svg}>
      <Group name="Add a Group" goTo="/about" imgURL={addSVG} />{" "}
      {/* to change */}
    </div>
  );
}

function PublicGroups() {
  return (
    <div className={style.svg}>
      <Group name="Dicover public groups" goTo="/public" imgURL={publicSVG} />
    </div>
  );
}

function GameGroup() {
  return (
    <div className={style.svg}>
      <Group name="Play !" goTo="/play" imgURL={playSVG} />
    </div>
  );
}

Group.defaultProps = {
  name: "test",
  imageURL:
    "https://www.citypng.com/public/uploads/preview/hd-css3-round-logo-icon-transparent-png-11662224253zt2ubozvzc.png",
};

export { Group, AddGroup, PublicGroups, PrivateMessages, GameGroup };
export default Group;
