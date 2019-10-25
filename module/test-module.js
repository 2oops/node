// module.exports = {
//   name: '2oops',
//   getAge: (age = 20) => {
//     console.log(age)
//   }
// }

// 直接使用exports要注意不能改变exports的指向
// 报错
// exports = {
//   name: '2oops',
//   getAge: () => {

//   }
// }

// 以下直接使用exports是OK的
exports.age = 22
exports.getAge = function() {
  console.log('21')
}