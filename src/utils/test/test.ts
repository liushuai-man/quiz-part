// 测试函数
export function testFu(title: string, callback: Function) {
  try {
    callback();
    console.log(`✅ ${title}：通过`);
  } catch (error: any) {
    console.error(`❌ ${title}：失败`, error);
    throw new Error(`原因：${error.message}`);
  }
}

// 断言函数
export function expect(result: any) {
  return {
    toBe: (expected: any) => {
      if (result !== expected) {
        throw new Error(`预期 ${expected}，但实际 ${result}`);
      }
    },
    toEqual: (expected: any) => {
      if (JSON.stringify(result) !== JSON.stringify(expected)) {
        throw new Error(`预期 ${JSON.stringify(expected)}，但实际 ${JSON.stringify(result)}`);
      }
    },
    toThrow: (expected: any) => {
      let hasError = false;
      try {
        result();
      } catch (error: any) {
        if (error instanceof expected) {
          hasError = true;
        }
      }
      if (!hasError) {
        throw new Error(`预期 ${expected}，但实际未抛出错误`);
      }
    },
  };
}
