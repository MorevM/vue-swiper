import { isObject, arrayUnique } from '@morev/helpers';

export const cloneVNode = (vnode, h) => {
	const clonedChildren = (vnode.children || []).map(n => cloneVNode(n));
	const cloned = h(vnode.tag, { ...vnode.data }, clonedChildren);
	cloned.text = vnode.text;
	cloned.isComment = vnode.isComment;
	cloned.componentOptions = vnode.componentOptions;
	cloned.elm = vnode.elm;
	cloned.context = vnode.context;
	cloned.ns = vnode.ns;
	cloned.isStatic = vnode.isStatic;
	cloned.key = vnode.key;
	return cloned;
};

export const setProps = (node, props) => {
	node.componentOptions.propsData = node.componentOptions.propsData || {};
	Object.entries(props).forEach(([key, value]) => {
		node.componentOptions.propsData[key] = value;
	});
};

export const extend = (target, src) => {
	const noExtend = ['__proto__', 'constructor', 'prototype'];
	Object.keys(src)
		.filter((key) => !noExtend.includes(key))
		.forEach((key) => {
			if (typeof target[key] === 'undefined') target[key] = src[key];
			else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
				if (src[key].__swiper__) target[key] = src[key];
				else extend(target[key], src[key]);
			} else {
				target[key] = src[key];
			}
		});
};

export const uniqueClasses = (classNames = '') => {
	const classes = classNames.split(' ').map(c => c.trim()).filter(Boolean);
	return arrayUnique(classes).join(' ');
};

export const isVirtual = (swiper) => {
	if (!swiper || swiper.destroyed) return false;
	// eslint-disable-next-line sonarjs/prefer-single-boolean-return
	if (!swiper.virtual || !swiper.params.virtual.enabled) return false;
	return true;
};
