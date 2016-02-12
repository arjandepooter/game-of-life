'use strict';

import { Cell, State } from '../../src/core';
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
});
