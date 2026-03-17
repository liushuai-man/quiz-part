import { sortByScore } from './modules/sortUtils.ts';
import { expect, testFu } from './test.ts';

const input = [
  { username: 'Alice', character: { image: '', name: '', summary: '', score: 80 } },
  { username: 'Bob', character: { image: '', name: '', summary: '', score: 90 } },
  { username: 'Charlie', character: { image: '', name: '', summary: '', score: 70 } },
];
const expected1 = [
  { username: 'Charlie', character: { image: '', name: '', summary: '', score: 70 } },
  { username: 'Alice', character: { image: '', name: '', summary: '', score: 80 } },
  { username: 'Bob', character: { image: '', name: '', summary: '', score: 90 } },
];
const expected2 = [
  { username: 'Bob', character: { image: '', name: '', summary: '', score: 90 } },
  { username: 'Alice', character: { image: '', name: '', summary: '', score: 80 } },
  { username: 'Charlie', character: { image: '', name: '', summary: '', score: 70 } },
];

testFu('测试sortByScore函数从高到低排序', () => {
  expect(sortByScore(input, false)).toEqual(expected2);
});
testFu('测试sortByScore函数从低到高排序', () => {
  expect(sortByScore(input, true)).toEqual(expected1);
});
