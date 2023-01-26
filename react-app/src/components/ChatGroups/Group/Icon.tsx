import style from "./Group.module.css";

interface Params {
  imgURL: string;
}

function Icon(props: Params) {
  return (
    <div className={style.IconWrapper}>
      <img src={props.imgURL} alt="Icon" className={style.Icon} />
    </div>
  );
}

export default Icon;
