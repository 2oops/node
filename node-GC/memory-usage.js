/**
 * 单位为字节格式为 MB 输出
 */
const format = function (bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
};

/**
* 封装 print 方法输出内存占用信息 
*/
const print = function() {
  const memoryUsage = process.memoryUsage();

  console.log(JSON.stringify({
      rss: format(memoryUsage.rss), // RAM 中保存的进程占用的内存部分
      heapTotal: format(memoryUsage.heapTotal),
      heapUsed: format(memoryUsage.heapUsed),
      external: format(memoryUsage.external),
  }));
}

function Quantity(num) {
  if (num) {
      return new Array(num * 1024 * 1024);
  }

  return num;
}

function Fruit(name, quantity) {
  this.name = name
  this.quantity = new Quantity(quantity)
}

let apple = new Fruit('apple');
print();
// {"rss":"19.85 MB","heapTotal":"6.23 MB","heapUsed":"3.68 MB","external":"0.01 MB"}
let banana = new Fruit('banana', 20);
print();
// {"rss":"180.02 MB","heapTotal":"166.25 MB","heapUsed":"163.77 MB","external":"0.01 MB"}

// 以上可知，根节点对apple和banana都引用，则无法释放任何内容导致无法GC

// 此时我们手动执行垃圾回收，如将banana置为null

banana = null;
global.gc(); // 注意是global.gc(),并且要使用node --expose-gc .\memory-usage.js运行
print();
// 注意要加上global.gc
// {"rss":"176.98 MB","heapTotal":"8.73 MB","heapUsed":"3.30 MB","external":"0.01 MB"}
