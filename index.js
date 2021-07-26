console.log("Design Patterns");

/** Creational Patterns */

// Class Pattern

class Car {
    constructor(doors, engine, color) {
        this.doors = doors;
        this.engine = engine;
        this.color = color;
    }
}

const opel = new Car(4, 'v6', "red");

// Constructor Pattern - use many constructors to extend one class

class Sedan extends Car {
    constructor(doors, engine, color) {
        super(doors, engine, color);
        this.wheels = 5;
    }
}

const mazda = new Sedan(4, 'v8', "green"); // adds "wheels: 5" prop to the object


// Singleton PAttern - allow only one instance to create from the class 

let instance = null;

class SingletonCar {
    constructor(color) {
        if (!instance) {
            this.color = color;
            instance = this;
        } else {
            return instance;
        }
    }
}

const instOne = new SingletonCar("orange") // color: "orange"
const instTwo = new SingletonCar("blue") // color: "orange"

console.log({ instOne }, { instTwo });

// Factory Pattern

class Mobile {
    constructor(display, color) {
        this.display = display;
        this.color = color;
    }
}

class MobileFactory {
    createMobile(type) {
        switch (type) {
            case 'samsung':
                return new Mobile(5, "black")
            case 'iphone':
                return new Mobile(4, "gold")
        }
    }
}

const factory = new MobileFactory();
const mySamsung = factory.createMobile('samsung');
console.log({ mySamsung });

class SuvMobile {
    constructor(display, color) {
        this.display = display;
        this.color = color;
    }
}

class SuvFactory {
    createMobile(type) {
        switch (type) {
            case 'galaxy C5':
                return new Mobile(6, "pink")
            case '12x':
                return new Mobile(8, "purple")
        }
    }
}

const mobileFactroy = new MobileFactory();
const suvFactroy = new SuvFactory();

// Abstract Factory Pattern

const mobileManifacturer = (type, model) => {
    switch (type) {
        case "mobile":
            return mobileFactroy.createMobile(model);
        case "suv":
            return suvFactroy.createMobile(model)
    }
}

const iphone12x = mobileManifacturer("suv", "12x")
console.log({ iphone12x });







/** Structural Patterns */


// Module Pattern - organize your code in pure functions  // import export

// Revealing Module Patern - the same with IIFE
const clark = (function() {
    const name = 'Poet';
    const identity = 'Stolen';
    const secretInfo = 'Encripted password';
    const sayHello = () => {
        console.log('Girl I know you want my love');
    };
    return { name, identity, sayHello };
})();

// Mixins Pattern - mix a function with existing class

let mobileMixin = {
    revScreen() {
        console.log(`The ${this.display} sized display is working fine`)
    }
}

Object.assign(Mobile.prototype, mobileMixin);

const samsung = mobileManifacturer("mobile", "samsung");
samsung.revScreen();

// Facade Pattern - similar to mediator, doesnt add any additional functionality

// hide a lot of code complexity behind and run one line with imported components
// React, Angular etc are working that way
// React app App.js where React.DOM is rendering


// Flyweight Pattern - prevent creation of more items into the memory of our broewsers
// Singleton is the best example of flyweight pattern


// Decorator Pattern - take a class and extend it with other code, like Mixins, TypeScript decorators

class MobileDecorator {
    constructor(display, color) {
        this.display = display;
        this.color = color;
    }

    // @mobileMixin - this will work in typescript
}






/** Behavioral Patterns */

// Observer Pattern - subscribe and observe

// State Pattern - hold the state of app with all data and props and when it changes it updates the rendering of app.
// React, Angular, state management libs


// Chain of responsibility - chain of events/funtions in a strict order, similar to callbacks

// Itaerator Pattern - iterate through rays of objaects, e.g React lists showing etc

// Strategy Pattern - create more things with the same command (e.g. many objects creation from classes with the same strategy)
// reuse code multiple times to create new things, DRY


// Memento Pattern - JSON.parse, JSON. stringify - provide temporary state of object
// data never loses its accuracy


// Mediator Pattern - encapsulates and controls how some set of objects interact with each other
// a unified interface through which the different parts of system may communicate


class Member {
    constructor(name) {
        this.name = name
        this.chatroom = null
    }

    send(message, toMember) {
        this.chatroom.send(message, this, toMember)
    }

    receive(message, fromMember) {
        console.log(`${fromMember.name} to ${this.name}: ${message}`)
    }
}

class Chatroom {
    constructor() {
        this.members = {}
    }

    addMember(member) {
        this.members[member.name] = member
        member.chatroom = this
    }

    send(message, fromMember, toMember) {
        toMember.receive(message, fromMember)
    }
}


const chat = new Chatroom()

const bob = new Member("Bob")
const john = new Member("John")

chat.addMember(bob)
chat.addMember(john)

bob.send("Hey, John", john)
john.send("What's up, Bob", bob)



// Command Pattern - encapsulates actions or operations as an object - Redux

const carManager = {

    requestInfo: function(model, id) {
        return "The information for " + model + " with ID " + id + " is foobar";
    },

    buyVehicle: function(model, id) {
        return "You have successfully purchased Item " + id + ", a " + model;
    },

    arrangeViewing: function(model, id) {
        return "You have s.uccessfully booked a viewing of " + model + " ( " + id + " ) ";
    }

};



// class without syntactic sugar

// function Chatroom()
// {
//   this.members = {}
// }

// Chatroom.prototype = {
//   addMember: function(member)
//   {
//     this.members[member.name] = member
//     member.chatroom = this
//   },
//   send: function(message, fromMember, toMember)
//   {
//     toMember.receive(message, fromMember)
//   }
// }