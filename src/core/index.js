'use strict';

import { Set, Record, Map } from 'immutable';

// Defines a cell in the grid
export const Cell = Record({
	x: 0,
	y: 0
});

// Constructor
export const State = function State() {
	this.grid = Set();
};

// Size represents total number of alive cells
Object.defineProperty(State.prototype, 'size', {
	get: function() {
		return this.grid.size;
	}
});

// Check if a specified cell is alive
State.prototype.isAlive = function(x, y) {
	return this.grid.has(Cell({x, y}));
};

// Set status of cell to death or alive
State.prototype.set = function(x, y, alive) {
	const cell = Cell({x, y});
	this.grid = alive ? this.grid.add(cell):this.grid.remove(cell);

	return this;
}

// Shorthand to set a cell to be alive
State.prototype.setAlive = function(x, y) {
	return this.set(x, y, true);
};

// Shorthand to set a cell to be death
State.prototype.setDeath = function(x, y) {
	return this.set(x, y, false);
};

// toggle cell between death and alive
State.prototype.toggle = function(x, y) {
	return this.set(x, y, !this.isAlive(x, y));
};

// returns a Map off all the neighbours with cell as key and alive status as value
State.prototype.getNeighbours = function(x, y) {
	let neighbours = Map();
	for(let offY = 1; offY >= -1; offY--) {
		for(let offX = -1; offX <= 1; offX++) {
			if(offX === 0 && offY === 0) continue;
			const cell = Cell({x: x + offX, y: y + offY});
			const alive = this.grid.has(cell);
			neighbours = neighbours.set(cell, alive);
		}
	}
	return neighbours;
}
