// let arr1 = [1,2,3];
// let arr2 = [1,2,3];
// arr1.sayHello = () =>{
//     console.log("Hello!, i am arr");
// }
// arr2.sayHello = () =>{
//     console.log("Hello! I am arr2");
// }

// function personMaker(name, age){
//     const person = {
//         name:name,
//         age:age,
//         talk() {
//             console.log(`Hi my name is ${this.name}`);
//         }
//     }
//     return person;
// }
// let p1 = personMaker('Shraddha',22);
// let p2 = personMaker('Sumit',21);


//constructor dont return and start with capitals
// function Person(name, age){
//     this.name = name;
//     this.age = age;
//     console.log(this);
//     console.log(this);
//     console.log(this);
//     console.log(this);
    
// }
// Person.prototype.talk = function (){
//     console.log(`Hi my name is ${this.name}`);
// }
// let p1 = new Person('Shraddha',22);
// let p2 = new Person('Sumit',21);




// class Person{
//     constructor(name,age){
//         this.name = name;
//         this.age = age;
//     }
//     talk(){
//         console.log(`hi my name is ${this.name}`);
//     }
// }
// let p1 = new Person('Shraddha',22);
// let p2 = new Person('Sumit',21);


class Person{
    constructor(name,age){
        console.log(`person class constructor`);
        this.name = name;
        this.age = age;
    }
    talk(){
        console.log(`Hello, I am ${this.name}`);
    }
}
class Student extends Person{
    constructor(name,age,marks){
        console.log(`student class constructor`);
        super(name,age);
        this.marks = marks;
    }
    
}
let stu1 = new Student('adam',25,95);

class Teacher extends Person{
    constructor(name,age,subject){
        console.log(`teacher class constructor`);
        super(name,age);
        this.subject = subject;
    }
    
}
