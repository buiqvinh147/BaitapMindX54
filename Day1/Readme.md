### 1. Cách kiểm tra một biến x cho trước là function, array, number, string, undefined

1. String

- Sử dụng toán tử typeof
  var a = "helo"
  console.log(typeof a); //=> String

2. Null và Undefined

- Null luôn được đặt rõ ràng thành một biến
- Undefined là giá trị mặc định cho biến chưa được khởi tạo
  TH sử dụng toá tử typeof
  console.log(typeof undefined); //=> "undefined"
  console.log(typeof null); //=> "object"
  => Lỗi
  Để kiểm tra Null hoặc Undefined sử dụng toán tử đẳng thức nghiêm ngặt (===)
  if(a === undefined) {}
  if(a === null) {}

3. Array
   Mảng là đối tượng . Nếu sử dụng toán tử typeof sẽ nhận được kết quả là đối tượng. Cách để kiểm tra xem một biến có phải là một mảng hay không bằng cách sử dụng phương thức tĩnh _Array.isArray () _ (IE9 +):

Array.isArray(someVar);
Array.isArray([11, 22, 33]); //=> true
Array.isArray({}); //=> false

4. Function
   Function cũng là đối tượng. Tuy nhiên, khác với mảng, có thể kiểm tra các hàm bằng cách sử dụng toán tử typeof:
   const f = function() {};
   console.log(typeof f === 'function'); //=> true

5. Objects
   So sánh nó với biến tương ứng
   const a = {};
   console.log(a === Object(a)); //=> true

const b = [];
console.log(b === Object(b)); //=> true

const c = function() {};
console.log(c === Object(c)); //=> true

const d = 123;
console.log(d === Object(d)); //=> false

const e = '';
console.log(e === Object(e)); //=> false

6. Numbers và Booleans
   Sử dụng toán tử typeof:
   if (typeof a === 'string') {}
   if (typeof b === 'boolean') {}

### 2. Tìm hiểu về Event loop, giải thích tại sao đoạn code sau chữ Một lại hiện sau chữ Hai

```
setTimeout(function() {
console.log('Một');
}, 0);
function second() {
console.log('Hai');
}
second();
```

- Event Loop là cơ chế giúp Javascript có thể thực hiện nhiều thao tác cùng một lúc
- Event Loop có một công việc đơn giản: theo dõi Call Stack và Callback Queue (hàng đợi các hàm callback). Nếu Call Stack đang trống, nó sẽ lấy event đầu tiên từ trong hàng đợi ra và đẩy nó vào trong Call Stack - tức là thực thi nó.
  Mỗi vòng lặp như thế được gọi là 1 tick trong Event Loop. Mỗi sự kiện chỉ là 1 hàm callback.
  setTimeout(...) không tự động đặt callback vào trong event loop queue. Nó thiết lập một bộ đếm. Khi bộ đếm kết thúc, môi trường đặt callback vào trong event loop, vì thế những tick tiếp theo có thể lấy nó ra và thực thi:
  setTimeout(myCallback, 1000);
- Nó không có nghĩa là myCallback sẽ được thực thi sau 1000ms, mà đúng hơn là, trong 1000ms, myCallback sẽ được thêm vào trong queue. Tuy nhiên queue này có thể đang có event khác đã được thêm vào trước đó, và vì thế callback sẽ phải chờ.
- Trường hợp này setTimeout(function() {}, 0) có nghĩa là thực thi sau khi tất cả các hàm hiện tại trong Event queue được thực thi trong 0ms.

### 3. Tìm hiểu về deep copy và shallow copy trong JS. Giải thích kết quả của đoạn code sau.

```
const macbooks = ['macbook2015', { model: 'macbook2014' }, 'macbook2017'];
const apples = [...macbooks];
apples[0] = 'air';
apples[1].model = 'm1';
console.log(macbooks) // ['macbook2015', { model: 'm1' }, 'macbook2017']
console.log(apples) // ['air', { model: 'm1' }, 'macbook2017']
```

- Deep copy nghĩa là toàn bộ giá trị được gán vào biến sẽ được sao chéo và tách rời hoàn toàn với bản gốc.

- Shallow copy có nghĩa là một số giá trị sẽ vẫn kết nối với bản gốc.
- Shallow copying: nhiệm vụ của nó chỉ copy những giá trị nông nghĩa là nó chỉ sao chép các giá trị đối tượng bình thường nhưng các giá trị lồng nhau vẫn sử dụng reference đến một đối tượng ban đầu.
