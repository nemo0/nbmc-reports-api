// // function Stack() {
// //   this._size = 0;
// //   this._storage = {};
// // }

// class Stack {
//   constructor() {
//     this._size = 0;
//     this._storage = {};
//   }

//   push(data) {
//     // Increases the size of our storage
//     let size = ++this._size;

//     // assigns size as a key of storage
//     // assigns data as the value of this key
//     this._storage[size] = data;
//   }

//   pop() {
//     let size = this._size;
//     let deletedData;

//     if (size) {
//       deletedData = this._storage[size];

//       delete this._storage[size];
//       this._size--;

//       return deletedData;
//     }
//   }
// }

// const s = new Stack();
// const a = 5;
// s.push(a);
// console.log(s);
// const b = {
//   data: 'Hello',
// };
// s.push(b);
// console.log(s);
// console.log(s.pop());
// console.log(s);

// // Queue Implementation
// class Queue {
//   constructor() {
//     this._oldestIndex = 1;
//     this._newestIndex = 1;
//     this._storage = {};
//   }

//   size() {
//     return this._newestIndex - this._oldestIndex;
//   }

//   enqueue(data) {
//     this._storage[this._newestIndex] = data;
//     this._newestIndex++;
//   }

//   dequeue() {
//     let oldestIndex = this._oldestIndex;
//     let newsestIndex = this._newestIndex;
//     let deletedData;

//     if (oldestIndex !== newsestIndex) {
//       deletedData = this._storage[oldestIndex];
//       delete this._storage[oldestIndex];
//       this._oldestIndex++;

//       return deletedData;
//     }
//   }
// }

// const q = new Queue();
// const x = 5;
// const y = 6;
// q.enqueue(x);
// q.enqueue(y);
// console.log(q);
// q.dequeue();
// console.log(q);
// q.dequeue();
// console.log(q);
// q.dequeue();
// console.log(q);

const nums = [5, 8, 1, 4];
// nums.push(6, 7, 8);
// nums.pop();
// nums.shift();
nums.unshift(2, 3);

console.log(nums);
