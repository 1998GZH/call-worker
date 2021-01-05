/**
 * 实例化对象时传入worker需要执行的逻辑(fn函数),
 * 实例化对象下start方法传参数与否由实例化时的fn函数决定,
 * start方法执行后返回一个promise对象,包含fn的执行结果或异常捕获
 *
 * @class
 */
class CallWorker {
  constructor(fn) {
    this._resolve = null;
    this._reject = null;
    this._worker = new Worker(`data:application/javascript,${encodeURIComponent(`
            "use strict";
            const _fn = ${fn};
            onmessage = e => postMessage(_fn(e.data));
          `)
      }`);
    this._worker.onmessage = e => this._resolve(e);
    this._worker.onerror = e => this._reject(e);
  }

  start(...args) {
    return new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
      this._worker.postMessage(...args);
    })
  }
}

export default CallWorker;