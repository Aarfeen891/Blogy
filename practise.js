//

// const aar1 = [1, 2, 3];
// const newA = [];
// aar1.forEach(function (e, i, a) {
//   console.log(`${i} : ${e + 100} : ${a} `);
//   let sum = e + 100;
//   newA.push(sum);
// });
// console.log(newA);

// let name = "Aarfeen";
// name = "taimoor";

// function name1() {
//   console.log(name);
//   let name2 = "taimor";
// }

// name1();
// console.log(name);

//???????????????????????????????????????//
// let a = 10;
// let b = 20;

// function swap(a, b) {
//   a = a;
//   b = b;
//   console.log(a);
//   console.log(b);
// }

// swap(b, a);

// let car = "Honda";
// // let newCar = null;
// console.log(newCar);
// function car1() {
//   console.log(car);
//   car = "civic";
//   newCar = car;
//   return newCar;
// }

// car1();

// console.log(typeof newCar);

// function add(aar) {
//   if (aar.length == 0) {
//     return 0;
//   } else {
//     return aar.pop() + add(aar);
//   }
// }

// add([1, 2, 3, 4]);

let aar = [3, 5, 2, 7];
let x = 9;
let check = true;
let i = 0;
while (check) {
  if (aar[i] == x) {
    console.log(`index of matchin ${aar[i]}`);
    check = false;
  } else if (i < aar.length) {
  } else {
    i = i + 1;
  }
}
