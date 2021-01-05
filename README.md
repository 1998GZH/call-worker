# 目前对Worker进行了简单的封装
TODO:
✅ 动态创建web worker
✅ 支持promise链式调用

使用:
```javascript
import CallWorker from 'call-worker';

async function demo() {
  const fn = num => {
    let total = 0;
    for (let i = 0; i < num; i++) {
      total += i;
    }
    return total;
  }
  const worker = new CallWorker(fn);
  try {
    const startTime = Date.now();
    const result = await worker.start(10000000000);
    console.log(`duration: ${Date.now() - startTime} ms`);
    console.log('result: ', result);
  } catch (error) {
    console.log(error);
  }
}
demo();
```

# 后续: 有空再说吧, 占个坑!