'use strict';

import { INITIAL_STATE, set, unset, toggle, next } from 'core';

export default function reducer(state = INITIAL_STATE, action) {
	switch(action.type) {
		case 'SET':
			return set(state, action.cell);
		case 'UNSET':
			return unset(state, action.cell);
		case 'TOGGLE':
			return toggle(state, action.cell);
		case 'NEXT':
			return next(state);
		case 'RESET':
			return INITIAL_STATE;
		default:
			return state;
	}
}
