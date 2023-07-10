import Head from 'next/head';
import styles from './stem-banner.module.css';
import Link from 'next/link';
import {Orbitron} from 'next/font/google';

export const orbitron = Orbitron({
	subsets: ['latin'],
	display: 'swap',
})

export default function Banner({children, home, err404}) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="og:title" content="STEM Club" />
			</Head>
			<div className={styles.banner}>
			<header className={styles.header}>
				<h1 className={orbitron.className}>STEM Club</h1>
			</header>
			<ul className={styles.menu}>
				<li>Home</li>
				<li>Projects
					<ul className={styles.submenu}>
						<li>Website</li>
						<li>Programming</li>
						<li>Hardware</li>
					</ul>
				</li>
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
