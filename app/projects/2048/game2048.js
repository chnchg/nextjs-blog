'use client';

import styles from './game2048.module.css'
import Script from 'next/script';
import {useRef} from 'react';

export default function MyGame({}) {
	const lateralSize = 4;
	const siteNumber = 16;
	const gameRef = useRef(null);

	return <>
		<h1>2048</h1>
		<div ref={gameRef}>
			<p>Score: <span className={styles.game_score} name="score"></span></p>
			<div className={styles.game_board_container} tabIndex="0" name="area" >
				<div className={styles.game_board} name="board">
					{[...Array(siteNumber)].map((_,i) => <div
						className="cell"
						key={i}
						x-pos={i%lateralSize}
						y-pos={Math.floor(i/lateralSize)}
					></div>)}
				</div>
				<div className={styles.game_message} name="message"></div>
			</div>
			<div><input type="button" value="New Game" onClick={()=>{
				const obj = gameRef.current;
				if (typeof(obj.game)=='undefined' || obj.game===null) {
					delete globalThis.game;
					obj.game = new Game2048(lateralSize, gameRef.current);
					globalThis.game = obj.game;
				}
				obj.game.newGame();
			}}/></div>
		</div>
		<Script
			src="/game2048_script.js"
			onLoad={() => {
				const obj = gameRef.current;
				console.log(gameRef.current);
				obj.game = new Game2048(lateralSize, gameRef.current);			
				globalThis.game = obj.game; // Keep the reference for clean up...
			}}
		></Script>
	</>;
};
