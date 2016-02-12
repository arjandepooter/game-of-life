'use strict';

import { Cell, State } from '../../src/core';
import Immutable from 'immutable';
import should from 'should';

describe('State', function() {
	describe('__constructor', function() {
		it('should create a State with 0 cells alive', done => {
			const state = new State();
			should.exist(state.size);
			state.size.should.be.equal(0);
			done();
		});
	});

	describe('setAlive', function() {
		it('should set a cell to alive', done => {
			const state = new State();
			state.isAlive(3, 5).should.be.false();
			state.setAlive(3, 5).isAlive(3, 5).should.be.true();
			done();
		});
	});

	describe('setDeath', function() {
		it('should set a cell to death', done => {
			const state = new State();
			state.setAlive(3, 5).setDeath(3, 5).isAlive(3, 5).should.be.false();
			done();
		});
	});

	describe('toggle', function() {
		it('should toggle a cell between death and alive', done => {
			const state = new State();
			state.isAlive(3, 5).should.be.false();
			state.toggle(3, 5).isAlive(3, 5).should.be.true();
			state.toggle(3, 5).isAlive(3, 5).should.be.false();
			state.toggle(3, 5).isAlive(3, 5).should.be.true();
			done();
		});
	});

	describe('iterNeighbours', function() {
		it('should return every neighbour with it\'s status', done => {
			const state = new State();
			state.setAlive(1, 1).setAlive(0, -1);
			const neighbours = state.getNeighbours(0, 0);
			neighbours.size.should.be.equal(8);
			neighbours.filter(v => v).size.should.be.equal(2);
			done();
		});
	});

	describe('transform', function() {
		it('should transform a 2x2 square to a 2x2 square', done => {
			const state = new State();
			state.setAlive(0, 0).setAlive(0, 1).setAlive(1, 0).setAlive(1, 1);
			const newState = state.transform();			
			Immutable.is(state.grid, newState.grid).should.be.true();
			done();
		});

		it('should rotate a line with length 3', done => {
			const state = new State();
			state.setAlive(-1, 0).setAlive(0, 0).setAlive(1, 0);
			const newState = state.transform();
			newState.size.should.be.equal(3);
			newState.isAlive(0, -1).should.be.true();
			newState.isAlive(0, 0).should.be.true();
			newState.isAlive(0, 1).should.be.true();
			done();
		});

		it('should remove the center of a 3x3 square', done => {
			const state = new State();
			for(let x = -1; x <= 1; x++) {
				for(let y = -1; y <= 1; y++) {
					state.setAlive(x, y);
				}
			}
			const newState = state.transform();
			newState.size.should.be.equal(8);
			newState.isAlive(0, 0).should.be.false();
			done();
		});
	})
});
