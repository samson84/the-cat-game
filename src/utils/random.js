import take from 'lodash/take';
import cloneDeep from 'lodash/cloneDeep'

export const randomInteger = (max) => Math.floor(Math.random()*max+1)

export const getRandomElements = (list = [], elementNumber) => take(shuffle(list), elementNumber)

export const shuffle = (list = []) => cloneDeep(list).sort( () => randomInteger(100) > 50 ? 1 : -1);

export const range = (max) => [...new Array(max)].map((_, index) => index);


