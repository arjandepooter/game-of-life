'use strict';

import {
	Cell,
	set,
	unset,
	toggle,
	next,
	getNeighbours
} from '../../src/core';
import * as im from 'immutable';
import should from 'should';

describe('GameState functions', function() {
	describe('set', function() {
		it('should set a cell to alive', () => {
			const state = im.Set();
			const cell = Cell({x: 3, y: 5});
			set(state, cell).has(cell).should.be.true();
		});
	});

	describe('unset', function() {
		it('should set a cell to death', () => {
			const state = im.Set();
			const cell = Cell({x: 32, y: 1});
			unset(state, cell).has(cell).should.be.false();
		});
	});

	describe('toggle', function() {
		it('should toggle a cell between death and alive', () => {
			let state = im.Set();
			const cell = Cell({x: 32, y: 1});
			state.has(cell).should.be.false();
			state = toggle(state, cell);
			state.has(cell).should.be.true();
			state = toggle(state, cell);
			state.has(cell).should.be.false();
		});
	});

	describe('getNeighbours', function() {
		it('should return every neighbour with it\'s status', () => {
			const state = im.Set([Cell({x: 0, y: 0}), Cell({x: 1, y: 0})]);
			const neighbours = getNeighbours(state, Cell({x: 1, y: 0}));
			neighbours.size.should.be.equal(8);
			neighbours.filter(v => v).size.should.be.equal(1);
		});
	});

	describe('next', function() {
		it('should transform a 2x2 square to a 2x2 square', () => {
			const state = im.Set([
				Cell({x: 0, y: 0}),
				Cell({x: 1, y: 0}),
				Cell({x: 0, y: 1}),
				Cell({x: 1, y: 1})
			]);
			const newState = next(state);
			im.is(state, newState).should.be.true();
			im.is(state, next(newState)).should.be.true();
		});

		it('should rotate a line with length 3', () => {
			const state = im.Set([
				Cell({x: -1, y: 0}),
				Cell({x: 0, y: 0}),
				Cell({x: 1, y: 0})
			]);
			const newState = next(state);

			newState.size.should.be.equal(3);
			newState.has(Cell({x: 0, y: -1})).should.be.true();
			newState.has(Cell({x: 0, y: 0})).should.be.true();
			newState.has(Cell({x: 0, y: 1})).should.be.true();
		});
	})
});
