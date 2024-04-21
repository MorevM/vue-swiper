import { isEmpty, isObject } from '@morev/utils';
import { paramsList } from './params-list.js';

const getChangedParams = (swiperParams, oldParams, children, oldChildren) => {
	const keys = [];
	if (!oldParams || isEmpty(children)) return keys;

	const addKey = (key) => (!keys.includes(key)) && keys.push(key);

	const oldChildrenKeys = oldChildren.map(child => child.key);
	const childrenKeys = children.map(child => child.key);

	if (oldChildrenKeys.join('') !== childrenKeys.join('')) keys.push('children');
	if (oldChildren.length !== children.length) keys.push('children');

	const watchParams = paramsList.filter((key) => key[0] === '_').map((key) => key.replace(/_/, ''));

	watchParams.forEach(key => {
		if (!(key in swiperParams) || !(key in oldParams)) return;
		if (isObject(swiperParams[key]) && isObject(oldParams[key])) {
			const newKeys = Object.keys(swiperParams[key]);
			const oldKeys = Object.keys(oldParams[key]);
			if (newKeys.length === oldKeys.length) {
				newKeys.forEach((newKey) => {
					if (swiperParams[key][newKey] !== oldParams[key][newKey]) {
						addKey(key);
					}
				});
				oldKeys.forEach((oldKey) => {
					if (swiperParams[key][oldKey] !== oldParams[key][oldKey]) addKey(key);
				});
			} else {
				addKey(key);
			}
		} else if (swiperParams[key] !== oldParams[key]) {
			addKey(key);
		}
	});
	return keys;
};

export { getChangedParams };
