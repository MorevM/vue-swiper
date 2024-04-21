import Swiper from 'swiper';
import { isObject } from '@morev/utils';
import { extend } from './utils.js';
import { paramsList } from './params-list.js';

export const getParams = (obj = {}) => {
	const params = { on: {} };
	const passedParams = {};
	extend(params, Swiper.defaults);
	extend(params, Swiper.extendedDefaults);
	params._emitClasses = true;
	params.init = false;

	const rest = {};
	const allowedParams = paramsList.map((key) => key.replace(/_/, ''));
	// Prevent empty Object.keys(obj) array on ios.
	const plainObj = { ...obj };
	Object.keys(plainObj).forEach((key) => {
		if (typeof obj[key] === 'undefined') return;
		if (allowedParams.includes(key)) {
			if (isObject(obj[key])) {
				params[key] = {};
				passedParams[key] = {};
				extend(params[key], obj[key]);
				extend(passedParams[key], obj[key]);
			} else {
				params[key] = obj[key];
				passedParams[key] = obj[key];
			}
		} else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === 'function') {
			params.on[`${key[2].toLowerCase()}${key.slice(3)}`] = obj[key];
		} else {
			rest[key] = obj[key];
		}
	});

	['navigation', 'pagination', 'scrollbar'].forEach((key) => {
		if (params[key] === true) params[key] = {};
		if (params[key] === false) delete params[key];
	});

	return { params, passedParams, rest };
};
