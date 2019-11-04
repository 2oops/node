const format = function (bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
};

const print = function() {
  const memoryUsage = process.memoryUsage();
  console.log(`heapTotal: ${format(memoryUsage.heapTotal)}, heapUsed: ${format(memoryUsage.heapUsed)}`);
}

const total = [];
setInterval(function() {
  total.push(new Array(20 * 1024 * 1024)); // 大内存占用
  print();
}, 1000)
// otal 为全局变量每次大约增长 160 MB 左右且不会被回收
// 在接近 V8 边界时无法在分配内存导致进程内存溢出。