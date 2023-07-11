"use strict";

import './global.css'
import { get_available_projects } from './projects/page';
import styles from './stem.module.css'
import {Orbitron} from 'next/font/google'
import Link from 'next/link'
import path from 'path'

export const orbitron = Orbitron({
  variable: '--font-orbitron',
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
  <body className={orbitron.variable}>
    <div className={styles.banner}>
      <h1>STEM Club</h1>
    </div>
    <div className={styles.nav}>
    <ul className={styles.menu}>
				<li><Link href="/">Home</Link></li>
				<li><Link href="/projects">Projects</Link>
					<ul className={styles.submenu}>
						{projects.map(project => <li>
							<Link href={path.join('/projects',project.id)}>{project.name}</Link>
						</li>)}
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
