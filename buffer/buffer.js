// Stream 数据从一端流向另一端，单向，举例：水灌菜地
// Buffer 计算机中的一个小物理单位，通常位于计算机的ARM中，举例：公交站等待区

// 可以通过 Buffer.from()、Buffer.alloc() 与 Buffer.allocUnsafe() 三种方式来创建

const b1 = Buffer.from('10');
const b2 = Buffer.from('10', 'utf8');
const b3 = Buffer.from([10]);
const b4 = Buffer.from(b3);
const b5 = Buffer.from('16', 'hex')

console.log(b5.toString('hex')) // Buffer字符编码

console.log(b1, b2, b3, b4,b5); //<Buffer 31 30> <Buffer 31 30> <Buffer 0a> <Buffer 0a>

// Buffer.alloc()返回一个已经初始化的Buffer，可以保证新创建的Buffer永远不包含旧数据
const alloc = Buffer.alloc(10) // 10字节的缓冲区创建
console.log(alloc)

// Buffer.allocUnsafe()创建未初始化的buffer,分配的内存片可能包含旧数据，因此不安全
const allocUnsafe = Buffer.allocUnsafe(10)
console.log(allocUnsafe)

/* 由于 Buffer 需要处理的是大量的二进制数据，假如用一点就向系统去申请，
则会造成频繁的向系统申请内存调用，所以 Buffer 所占用的内存不再由 V8 分配，
而是在 Node.js 的 C++ 层面完成申请，在 JavaScript 中进行内存分配。
因此，这部分内存我们称之为堆外内存。
*/

// Buffer内存分配原理
// NodeJs采用了slab机制（Linux的一种内存分配机制，时间和空间的折中方案）进行预先申请、事后分配的一种动态管理机制。
// slab分配器基于对象管理，NodeJs以8KB为界限来区分是大对象还是小对象，
// slab具有full(完全分配)、partial(部分分配)、empty(没有被分配)三种状态

// Buffer应用场景
// I/O操作
// 加密和解密
// zlib.js

// 缓冲和缓存--视频播放器
// 缓存可以看作是一个中间层，它可以是永久性的将热点数据进行缓存，使得访问速度更快
// 在一些 Web 应用中，对于静态数据可以预先转为 Buffer 进行传输，可以有效减少 CPU 的重复使用（重复的字符串转 Buffer 操作）