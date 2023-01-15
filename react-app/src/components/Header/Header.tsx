import style from "./Header.module.css";
import UserLogo from '../../assets/images/user.png'
function Header() {
  return (
	<div className={style.header}>
	<div className={style.headerDiv}>

		
      {/* <div className={style.blank}>lol</div> */}
      <div className={style.user}>
        <img className={style.userLogo} src={UserLogo} alt="user icon"/>
      </div>
	  </div>
    </div>
  );
}
export default Header;
