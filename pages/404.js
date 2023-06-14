import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import Layout from '../components/layout';
import Link from 'next/link';

export default function Custom404() {
	const [secondsRemaining, setSecondsRemaining] = useState(5);
	const router = useRouter();
	useEffect(()=>{
		const timer = setTimeout(()=>{
			setSecondsRemaining((time)=>time-1);
			if (secondsRemaining===1) router.push('/');
		},1000);
		return ()=>{clearInterval(timer)}
	});
	return <Layout err404>
	<Head>
		<title>Error 404: Page Not Found</title>
	</Head>
	<h1>404 - Page Not Found</h1>
	<p><Link href="/">Back to home</Link> in {secondsRemaining} {secondsRemaining>1?'seconds':'second'}.</p>
	</Layout>
}
