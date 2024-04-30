/*
 * @Author: BoringTu work@boringtu.com
 */

import { v4 as uuidv4 } from 'uuid';

/**
 * 防抖
 *
 * @param fn {Function} - the original function to be debounced
 * @param [wait] {number} - waiting time (ms)
 */
export function debounce(fn, wait = 20) {
	let timer;
	const re = (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), wait);
	};
	re.abort = () => clearTimeout(timer);
	return re;
}

/**
 * 节流
 *
 * @param fn {Function} - the original function to be throttled
 * @param [wait] {number} - waiting time (ms)
 * @param [isImmediately] {boolean} - run the function immediately
 */
export function throttle(fn, wait = 20, isImmediately = false) {
	let timer;
	let count = 0;
	let immediately = isImmediately;
	const re = function (...args) {
		if (timer) return;
		if (!count && immediately) {
			immediately = false;
			fn.apply(this, args);
			count++;
		}
		timer = setTimeout(() => {
			fn.apply(this, args);
			timer = null;
			count = 0;
		}, wait);
	};
	re.abort = () => {
		clearTimeout(timer);
		timer = null;
		count = 0;
	};
	return re;
}

export function sleep(ms = 0) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(null), ms);
	});
}

export function parseJSON(str, ...extraInfo) {
	let data;
	try {
		data = JSON.parse(str);
		if (!data) throw new Error();
	} catch (e) {
		console.warn('JSON parse error: [', str, ']', ...extraInfo);
	}
	return data;
}

/**
 * clone 数据模型（只支持纯 JSON 数据模型 object | array）
 * @param {object | array} model 数据模型
 * @returns clone 后的数据模型
 */
export const cloneModel = (model) => {
	return JSON.parse(JSON.stringify(model));
}

/**
 * 蹦床
 * 用于优化尾递归函数
 *
 * @param fn {Function} - 尾递归函数
 */
export const trampoline =
	(fn) =>
	(...args) => {
		fn = fn.bind(this, ...args);
		while (fn instanceof Function) fn = fn();
		return fn;
	};

/**
 * 生成 UUID
 * @returns UUID
 */
export const generateUUID = () => uuidv4();

/**
 * 根据字典中的 value 反向获取对应的 key
 * 注：如 value 非唯一，结果不可控
 */
export const getKeyByValue = (dict, value) => {
	for (const [k, v] of Object.entries(dict)) {
		if (v !== value) continue;
		return k;
	}
	return null;
};

/**
 * 两集合差集
 */
export const difference = (arrA, arrB) => {
	return arrA.filter((item) => !arrB.includes(item));
};

/**
 * 数字精确度
 * @param num {Number} 需要处理精确度的数字
 * @param digit {Number} 需要精确到小数点后的位数  默认：2
 * @param [method] {String} 【可选】精确方式 Math 的方法名  默认：'round'
 */
export const precision = (num, digit = 2, method = 'round') => {
	const multiple = Math.pow(10, digit);
	return (Math[method](num * multiple) / multiple).toFixed(digit);
};

/**
 * 生成随机颜色值
 * @param min {String} 【可选】生成随机颜色值每一位的最小值，3 个 0 ~ 255 的数字，','分隔  默认：'0,0,0'
 * @param max {String} 【可选】生成随机颜色值每一位的最大值，3 个 0 ~ 255 的数字，','分隔  默认：'255,255,255'
 * @param type {String} 【可选】返回颜色值的类型  可选值：'16' / 'rgb'  默认：'rgb'
 * @param complete {Boolean} 【可选】返回值是否是完整的  默认：false
 * @return 返回生成的随机颜色值
 */
export const randomColor = ({
	min = '0,0,0',
	max = '255,255,255',
	type = 'rgb',
	complete = false,
}) => {
	const minArr = min.split(',').map((n) => +n);
	const maxArr = max.split(',').map((n) => +n);
	const arr = [...new Array(3).keys()].map((i) => {
		const currMin = minArr[i];
		const currMax = maxArr[i];
		return Math.round(currMin + Math.random() * (currMax - currMin));
	});
	const fill16 = (c) => `${c.length < 2 ? '0' : ''}${c}`;
	switch (type) {
		case '16':
			return (complete ? '#' : '') + arr.map((n) => fill16(n.toString(16))).join('');
		case 'rgb':
			return (complete ? 'rgb(' : '') + arr.join(',') + (complete ? ')' : '');
	}
};
