1. redis本质上是一种键值内存数据库，但它吸收了部分关系数据库的特点，因此介于关系数据库和键值数据库之间。底层数据库要求高精准，就注定了它的效率不会很高，因此借助于redis可以给数据库分担，先从redis的缓存中看有没有请求想要的结果，若没有再去底层数据库操作。
2. 优点：
  读写快：set 110000/s get 81000/s
  支持存储多种数据结构如集合、散列表等
  操作具有原子性，所有redis操作均为原子操作，能够保证两个客户端并发访问，redis服务器能够接收更新的值
  除缓存功能外还可以运用于消息中间件（发布订阅消息）或保存用户状态等地方
3. 