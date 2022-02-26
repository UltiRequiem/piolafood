import styles from "./footer.module.scss";

export const Footer = () => {
	return (
		<div className={styles.footer}>
			<br />

			<footer>
				Piolafood &copy; {new Date().getUTCFullYear()} - Made with 💖 &amp; ☕
				by <a href="https://github.com/folkip">Folkip</a>
			</footer>
		</div>
	);
};
