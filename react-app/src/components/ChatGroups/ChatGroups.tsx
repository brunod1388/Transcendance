import GroupsList from "./GroupsList/GroupsList";
import style from "./ChatGroups.module.css";
import {
  AddGroup,
  PublicGroups,
  PrivateMessages,
  GameGroup,
} from "./Group/Group";

function ChatGroups() {
  return (
    <div className={style.container}>
      <PrivateMessages />
      <div className={style.separator}></div>
      <GroupsList />
      <AddGroup />
      <PublicGroups />
      <div className={style.separator}></div>
      <GameGroup />
    </div>
  );
}

export default ChatGroups;
