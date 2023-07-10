"use strict";

import './global.css'
import styles from './stem.module.css'
import {Orbitron} from 'next/font/google'
import Link from 'next/link'

export const orbitron = Orbitron({
  variable: '--font-orbitron',
	subsets: ['latin'],
	display: 'swap',
})

export const metadata = {
  title: 'STEM Club Online Information',
  description: 'Maintained by YY',
}
 
export default function RootLayout({ children }) {
 return (<html lang="en">
  <body className={orbitron.variable}>
    <div className={styles.banner}>
      <h1>STEM Club</h1>
    </div>
    <div className={styles.nav}>
    <ul className={styles.menu}>
				<li><Link href="/">Home</Link></li>
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
    <main className={styles.main}>{children}</main>
  </body>
</html>)}
