// require('./test-module.js')
const Test = require('./test-module.js')

console.log(Test.age)
Test.getAge() //如果Test不是module.exports进来的话会报错
console.log(require.prototype) // require {}
console.log(require.cache) // filename paths exports: {}
console.log(require.extensions) // js json node
console.log(require.name) // require