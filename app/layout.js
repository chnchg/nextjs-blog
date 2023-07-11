"use strict";

import './global.css'
import { get_available_projects } from './projects/page';
import styles from './stem.module.css'
import {Orbitron, Rubik} from 'next/font/google'
import Link from 'next/link'
import path from 'path'

export const orbitron = Orbitron({
  variable: '--font-orbitron',
	subsets: ['latin'],
	display: 'swap',
})

export const rubik = Rubik({
	variable: '--font-rubik',
	subsets: ['latin'],
	display: 'swap',
})

export const metadata = {
  title: 'STEM Club Online Information',
  description: 'Maintained by YY',
}

const projects = get_available_projects();
 
export default function RootLayout({ children }) {
 return (<html lang="en">
  <body className={rubik.className}>
    <div className={styles.banner}>
      <h1 className={orbitron.className}>STEM Club</h1>
    </div>
    <div className={styles.nav}>
    <ul className={styles.menu}>
				<li><Link href="/">Home</Link></li>
				<li><Link href="/projects">Projects</Link>
					<ul className={styles.submenu}>
						{projects.map(({id, name}) => <li key={id}>
							<Link href={path.join('/projects',id)}>{name}</Link>
						</li>)}
					</ul>
				</li>
				<li>Media</li>
				<li>News</li>
				<li>Login/Signup</li>
			</ul>
    </div>
    <main className={styles.main}>{children}</main>
		<div className={styles.footer}>
		<hr/>
		<address>Designed and maintained by YY</address>
		</div>
  </body>
</html>)}
