import Head from 'next/head';
import Image from 'next/image';
import styles from './stem-banner.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export default function Banner({children, home, err404}) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="og:title" content="STEM Club" />
			</Head>
			<header className={styles.header}>
				<h1>STEM Club</h1>
			</header>
			<div className={styles.banner}>
			<ul className={styles.menu}>
				<li>Home</li>
				<li>Projects</li>
				<li>Media</li>
				<li>News</li>
				<li>Login/Signup</li>
			</ul>
			</div>
			<main>{children}</main>
			{!(home||err404) && (
				<div className={styles.backToHome}>
					<Link href="/">← Back to home</Link>
				</div>
			)}
		</>
	);
}
