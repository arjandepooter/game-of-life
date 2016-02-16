'use strict';

import {
	List,
	Map,
	Range,
	Record,
	Set,
} from 'immutable';

// Defines a cell in the grid
export const Cell = Record({
	x: 0,
	y: 0
});

// Set a cell to be alive
export const set = (state, cell) => state.add(cell);

// Set a cell to be death (remove it)
export const unset = (state, cell) => state.remove(cell);

// Switch cell between death and alive
export const toggle = (state, cell) => state.has(cell) ? unset(state, cell):set(state, cell);

// Calculate next state
export const next = state =>
	state.filter(cell => {
		// Living cells who need to stay alive
		const neighbours = getNeighbours(state, cell).filter(v => v).size;
		return neighbours >= 2 && neighbours <= 3;
	}).concat(
		// Death neighbours of living cells who should become alive
		state
			.reduce((prev, val) => getNeighbours(state, val)
				.filterNot(v => v)
				.keySeq()
				.reduce(
					(prev2, val2) => prev2.update(val2, 0, n => n + 1),
					prev
				), Map())
			.filter(v => v == 3)
			.keySeq()
			.reduce((prev, val) => prev.add(val), Set())
	);

// get neighbours of a cell with it's alive status
export const getNeighbours = (state, cell) =>
	Range(-1, 2)
		.reduce(
			(prev, x) => Range(-1, 2)
				.reduce(
					(prev2, y) => prev2.add(Cell({x: cell.x + x, y: cell.y + y})),
					prev
				), Set())
		.remove(cell)
		.reduce((prev, cell) => prev.set(cell, state.has(cell)), Map());
