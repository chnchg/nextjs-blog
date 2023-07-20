'use strict';

function findName(element, name) { // Find a descendant node with given name
	if (element.getAttribute("name")===name) return element;
	for (let child of element.children) {
		let ret = findName(child, name);
		if (ret !== null) return ret;
	}
	return null;
}

function Game2048(lateralSize, game) {
	this.lateralSize = lateralSize;
	let siteNumber = lateralSize*lateralSize;
	let gameTiles = [];
	let gameScore = 0;
	let blockPlay = true; // Whether to block play (updating tiles or game over)
	let gameGoal = false; // Whether 2048 is reached
	const score = findName(game, 'score');
	const board = findName(game, 'board');
	const message = findName(game, 'message');

	function randomDrop() {
		let availableSites = Array.from({length: siteNumber},(_,i)=>i).filter(i => gameTiles[i] === null);
		if (availableSites.length == 0) return;
		let idx = availableSites[Math.floor(Math.random()*availableSites.length)]; // Random site
		let tile = document.createElement('div');
		gameTiles[idx] = tile;
		tile.classList.add('tile');
		let value = Math.random() > .1 ? 2 : 4;
		tile.setAttribute('x-pos', idx%lateralSize);
		tile.setAttribute('y-pos', Math.floor(idx/lateralSize));
		tile.setAttribute('value', value);
		tile.innerHTML = `${value}`;
		board.appendChild(tile);
	};

	function collapseLine(start, increment) { // Checking against the direction of collapse 
		let lastSite = start;
		let anyAction = false;
		for (let step = 1; step<lateralSize; step++) {
			let site = start+step*increment;
			if (gameTiles[site]===null) continue;
			if (gameTiles[lastSite]===null) { // Move to the farthest empty site
				gameTiles[site].setAttribute('x-pos', lastSite%lateralSize);
				gameTiles[site].setAttribute('y-pos', Math.floor(lastSite/lateralSize));
				gameTiles[lastSite] = gameTiles[site];
				gameTiles[site] = null;
				anyAction = true;
			}
			else if (gameTiles[site].getAttribute('value')==gameTiles[lastSite].getAttribute('value')) { // Merge
				let rm = gameTiles[lastSite]; // Tile to be removed
				let ch = gameTiles[site]; // Tile to be updated (value)
				let v = Number(gameTiles[site].getAttribute('value'))*2; // new value
				setTimeout(()=>{ // Update number and remove old one later
					rm.remove();
					ch.setAttribute('value', v);
					gameScore += v; // Add to game score
					score.innerHTML = `${gameScore}`;
					if (!gameGoal && v>=2048) { // Goal reached...
						gameGoal = true;
						setTimeout(() => {
							message.innerHTML = "You Win!";
							message.removeAttribute('hide');
						},0);
					}
				},250);
				gameTiles[site].setAttribute('x-pos', lastSite%lateralSize);
				gameTiles[site].setAttribute('y-pos', Math.floor(lastSite/lateralSize));
				gameTiles[lastSite] = gameTiles[site];
				gameTiles[site] = null;
				lastSite += increment;
				anyAction = true;
			}
			else {
				lastSite += increment;
				if (lastSite===site) continue;
				// Move
				gameTiles[site].setAttribute('x-pos', lastSite%lateralSize);
				gameTiles[site].setAttribute('y-pos', Math.floor(lastSite/lateralSize));
				gameTiles[lastSite] = gameTiles[site];
				gameTiles[site] = null;
				anyAction = true;
			};
		};
		return anyAction;
	};

	function checkGame() { // Check if game is over
		for (let i = 0; i<siteNumber; i++) {
			if (gameTiles[i]===null) return false; // Check for empty cell
			// Check for neighboring tiles with the same value
			let v = gameTiles[i].getAttribute('value');
			if (i%lateralSize && gameTiles[i-1].getAttribute('value')===v) return false;
			if (i>=lateralSize && gameTiles[i-lateralSize].getAttribute('value')===v) return false;
		}
		return true;
	};

	function play(move) {
		if (blockPlay) return; // If not playing, do nothing...
		// Make sure message overlay is hidden.
		if (!message.getAttribute('hide')) message.setAttribute('hide', 1);
		// Collapse lines differently for different directions
		let anyAction = false;
		switch (move) {
			case 'Up':
				for (let line = 0; line<lateralSize; line++) {
					anyAction = collapseLine(line, lateralSize) || anyAction;
				};
				break;
			case 'Down':
				for (let line = 0; line<lateralSize; line++) {
					anyAction = collapseLine(siteNumber-1-line,-lateralSize) || anyAction;
				};
				break;
			case 'Left':
				for (let line = 0; line<lateralSize; line++) {
					anyAction = collapseLine(line*lateralSize,1) || anyAction;
				};
				break;
			case 'Right':
				for (let line = 0; line<lateralSize; line++) {
					anyAction = collapseLine(siteNumber-1-line*lateralSize ,-1) || anyAction;
				};
				break;
		}
		if (!anyAction) return; // No action, not a legal move.
		// Delay random drop and the checking of game over, game play is block during the delay
		blockPlay = true;
		setTimeout(() => {
			for (let idx = 0; idx<siteNumber; idx++) {
				if (gameTiles[idx]===null) continue;
				gameTiles[idx].innerHTML = gameTiles[idx].getAttribute('value');
			};
			randomDrop();
			if (checkGame()) setTimeout(() => {
				message.innerHTML = "Game Over!";
				message.removeAttribute('hide');
			}, 0);
			else blockPlay = false; // Unblock play if game is not over
		}, 300);
	};

	this.processKey = (key) => {
		switch(key.keyCode) {
			case 38:
				play('Up');
				break;
			case 40:
				play('Down');
				break;
			case 37:
				play('Left');
				break;
			case 39:
				play('Right');
				break;
			default:
				console.log('Unknown key:', key);
		}
	};
	// Initialize game
	gameTiles.forEach(t => {if (t!==null) t.remove();}); // Clear existing tiles
	gameTiles = Array(siteNumber).fill(null);
	gameScore = 0;
	score.innerHTML = `${gameScore}`;
	// Start game
	message.setAttribute('hide', 1);
	randomDrop();
	randomDrop();
	blockPlay = false;
};
