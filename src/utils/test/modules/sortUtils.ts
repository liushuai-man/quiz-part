/**
 * 排序工具函数
 * @param arr 待排序的数组
 * @param {string} 排序的属性
 * @returns 排序后的数组
 */
interface UserInfo {
  username: string;
  character: {
    image: string;
    name: string;
    summary: string;
    score: number;
  };
}
export function sortByScore<T extends UserInfo>(oldArr: T[], ascending: boolean = false): T[] {
  if (!Array.isArray(oldArr)) {
    throw new Error('Input must be an array');
  }
  const newArr = [...oldArr];
  newArr.sort((a, b) => {
    const valueA: number = a.character.score;
    const valueB: number = b.character.score;
    // 处理属性不存在的情况
    if (valueA === undefined && valueB === undefined) {
      return 0;
    } else if (valueA === undefined) {
      return ascending ? 1 : -1;
    } else if (valueB === undefined) {
      return ascending ? -1 : 1;
    } else {
      return ascending ? valueA - valueB : valueB - valueA;
    }
  });

  return newArr;
}
