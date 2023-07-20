'use client';

import styles from './game2k.module.css'
import Script from 'next/script';
import {useRef} from 'react';

export default function Game({lateralSize, boardSize}) {
	const siteNumber = lateralSize*lateralSize;
	const cellSeparation = 4; // px
	const cellSize = (boardSize-cellSeparation*(lateralSize+1))/lateralSize;
	const gameRef = useRef();

	return <>
		<h1>2048</h1>
		<div ref={gameRef}>
			<p>Score: <span className={styles.game_score} name="score"></span></p>
			<div className={styles.game_board_container} tabIndex="0" name="area">
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
		</div>
		<style>{`
		.${styles.game_board} {
			font-size: ${cellSize}px;
			width: ${boardSize}px;
			height: ${boardSize}px;
		}

		.${styles.game_message} {
			font-size: ${cellSize/2}px;
			width: ${boardSize}px;
			height: ${boardSize}px;
		}

		.${styles.game_board} > div {
			width: ${cellSize}px;
			height: ${cellSize}px;
		}	
		` + Array.from({length: lateralSize},(_,i)=>`
		[x-pos='${i}'] {
			left: ${cellSeparation+i*(cellSeparation+cellSize)}px;
		}`).join('\n') + Array.from({length: lateralSize},(_,i)=>`
		[y-pos='${i}'] {
			top: ${cellSeparation+i*(cellSeparation+cellSize)}px;
		}`).join('\n')}</style>
		<Script
			src="/game2k_code.js"
			onLoad={() => {
				const game = new Game2048(lateralSize, gameRef.current);
				gameRef.current.onkeydown = game.processKey;
			}}
		></Script>
	</>;
};
