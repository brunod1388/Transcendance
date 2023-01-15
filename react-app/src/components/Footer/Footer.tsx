import style from './Footer.module.css';

function Footer () {
	return (
		<div className={style.footer}>
			Copyright © {new Date().getFullYear()}
		</div>
	);
}
export default Footer;