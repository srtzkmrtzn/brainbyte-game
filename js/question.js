"use strict";

const QUESTION_BANK = [
  // =========================================================
  // PYTHON - CODE DEBUGGING
  // =========================================================
  {
    level: 1,
    language: "python",
    difficulty: "EASY",
    type: "Code Debugging",
    title: "Python Indentation",
    prompt: "Which line contains the bug?",
    referenceCode: 
`def greet(name):
    print("Hello " + name)`,
    debugCode: 
`def greet(name):
print("Hello " + name)`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 1, // Line 2
    hint: "Python relies on whitespace.",
    explanation: "Python requires indentation for blocks inside functions."
  },
  {
    level: 2,
    language: "python",
    difficulty: "EASY",
    type: "Code Debugging",
    title: "List Indexing",
    prompt: "Which line contains the bug?",
    referenceCode: 
`fruits = ["apple", "banana", "cherry"]
print(fruits[0])`,
    debugCode: 
`fruits = ["apple", "banana", "cherry"]
print(fruits[1])

# Output should be Apple`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 1,
    hint: "Arrays are zero-indexed.",
    explanation: "To get the first element 'apple', the index must be 0."
  },
  {
    level: 3,
    language: "python",
    difficulty: "MEDIUM",
    type: "Code Debugging",
    title: "Dictionary Access",
    prompt: "Which line contains the bug?",
    referenceCode: 
`user = {"name": "Alice", "age": 25}
print(user.get("name"))`,
    debugCode: 
`user = {"name": "Alice", "age": 25}
print(user.name)`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 1,
    hint: "Dictionaries in Python are not objects with properties.",
    explanation: "You must use bracket notation `user['name']` or `.get('name')`."
  },
  {
    level: 4,
    language: "python",
    difficulty: "MEDIUM",
    type: "Code Debugging",
    title: "Comparison Operators",
    prompt: "Which line contains the bug?",
    referenceCode: 
`x = 10
if x == 10:
    print("Ten!")`,
    debugCode: 
`x = 10
if x = 10:
    print("Ten!")`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 1,
    hint: "Assignment vs Comparison.",
    explanation: "A single '=' assigns a value. Double '==' compares values."
  },
  {
    level: 5,
    language: "python",
    difficulty: "HARD",
    type: "Code Debugging",
    title: "Mutable Default Arguments",
    prompt: "Which line contains the bug?",
    referenceCode: 
`def add_item(item, cart=None):
    if cart is None:
        cart = []
    cart.append(item)
    return cart`,
    debugCode: 
`def add_item(item, cart=[]):
    if cart is None:
        cart = []
    cart.append(item)
    return cart`,
    answers: ["Line 1", "Line 2", "Line 4", "No error"],
    answerIndex: 0,
    hint: "Lists persist across function calls if defined in the signature.",
    explanation: "Using a mutable default argument like `[]` causes the list to be shared across all calls."
  },

  // =========================================================
  // C++ - CODE DEBUGGING
  // =========================================================
  {
    level: 1,
    language: "cpp",
    difficulty: "EASY",
    type: "Code Debugging",
    title: "Missing Semicolon",
    prompt: "Which line contains the bug?",
    referenceCode: 
`#include <iostream>
int main() {
    std::cout << "Hello";
    return 0;
}`,
    debugCode: 
`#include <iostream>
int main() {
    std::cout << "Hello"
    return 0;
}`,
    answers: ["Line 2", "Line 3", "Line 4", "No error"],
    answerIndex: 1,
    hint: "Check the end of statements.",
    explanation: "C++ requires a semicolon at the end of statements."
  },
  {
    level: 2,
    language: "cpp",
    difficulty: "EASY",
    type: "Code Debugging",
    title: "Main Function Type",
    prompt: "Which line contains the bug?",
    referenceCode: 
`int main() {
    return 0;
}`,
    debugCode: 
`void main() {
    return 0;
}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 0,
    hint: "What should main() return to the OS?",
    explanation: "The main function in C++ must return an `int`, not `void`."
  },
  {
    level: 3,
    language: "cpp",
    difficulty: "MEDIUM",
    type: "Code Debugging",
    title: "Array Bounds",
    prompt: "Which line contains the bug?",
    referenceCode: 
`int arr[3] = {1, 2, 3};
for(int i = 0; i < 3; i++) {
    std::cout << arr[i];
}`,
    debugCode: 
`int arr[3] = {1, 2, 3};
for(int i = 0; i <= 3; i++) {
    std::cout << arr[i];
}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 1,
    hint: "Check the loop condition.",
    explanation: "Index 3 is out of bounds for an array of size 3 (valid indices are 0, 1, 2)."
  },
  {
    level: 4,
    language: "cpp",
    difficulty: "MEDIUM",
    type: "Code Debugging",
    title: "Pointer Dereferencing",
    prompt: "Which line contains the bug?",
    referenceCode: 
`int x = 5;
int* ptr = &x;
std::cout << *ptr;`,
    debugCode: 
`int x = 5;
int* ptr = &x;
std::cout << ptr;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 2,
    hint: "Are you printing the value or the address?",
    explanation: "Printing `ptr` outputs the memory address. You need `*ptr` to print the value."
  },
  {
    level: 5,
    language: "cpp",
    difficulty: "HARD",
    type: "Code Debugging",
    title: "Memory Leak",
    prompt: "Which line contains the bug?",
    referenceCode: 
`int* data = new int[10];
// do work
delete[] data;`,
    debugCode: 
`int* data = new int[10];
// do work
delete data;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 2,
    hint: "How do you free an array?",
    explanation: "When allocating memory with `new[]`, you must free it with `delete[]`."
  },

  // =========================================================
  // JAVA - CODE DEBUGGING
  // =========================================================
  {
    level: 1,
    language: "java",
    difficulty: "EASY",
    type: "Code Debugging",
    title: "String Comparison",
    prompt: "Which line contains the bug?",
    referenceCode: 
`String a = "test";
if (a.equals("test")) {
    System.out.println("Match");
}`,
    debugCode: 
`String a = "test";
if (a == "test") {
    System.out.println("Match");
}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 1,
    hint: "How do you compare object values in Java?",
    explanation: "In Java, '==' compares object references, while '.equals()' compares string values."
  },
  {
    level: 2,
    language: "java",
    difficulty: "EASY",
    type: "Code Debugging",
    title: "Print Syntax",
    prompt: "Which line contains the bug?",
    referenceCode: 
`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}`,
    debugCode: 
`public class Main {
    public static void main(String[] args) {
        Console.log("Hello");
    }
}`,
    answers: ["Line 2", "Line 3", "Line 4", "No error"],
    answerIndex: 1,
    hint: "Java doesn't use Console.log.",
    explanation: "The correct output method in Java is `System.out.println()`."
  },
  {
    level: 3,
    language: "java",
    difficulty: "MEDIUM",
    type: "Code Debugging",
    title: "Array Length",
    prompt: "Which line contains the bug?",
    referenceCode: 
`int[] numbers = {1, 2, 3};
int size = numbers.length;`,
    debugCode: 
`int[] numbers = {1, 2, 3};
int size = numbers.length();`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 1,
    hint: "Is length a method or a property?",
    explanation: "In Java arrays, `length` is a property, not a method, so no parentheses are used."
  },
  {
    level: 4,
    language: "java",
    difficulty: "MEDIUM",
    type: "Code Debugging",
    title: "Class Instantiation",
    prompt: "Which line contains the bug?",
    referenceCode: 
`Scanner sc = new Scanner(System.in);
int x = sc.nextInt();`,
    debugCode: 
`Scanner sc = Scanner(System.in);
int x = sc.nextInt();`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 0,
    hint: "How do you create a new object in Java?",
    explanation: "You must use the `new` keyword to instantiate an object in Java."
  },
  {
    level: 5,
    language: "java",
    difficulty: "HARD",
    type: "Code Debugging",
    title: "Null Pointer",
    prompt: "Which line contains the bug?",
    referenceCode: 
`String text = null;
if (text != null && text.length() > 0) {
    System.out.println("Valid");
}`,
    debugCode: 
`String text = null;
if (text.length() > 0 && text != null) {
    System.out.println("Valid");
}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 1,
    hint: "Short-circuit evaluation evaluates left to right.",
    explanation: "Checking `.length()` before checking for `null` throws a NullPointerException."
  },

  // =========================================================
  // WEB (HTML/CSS/JS) - CODE DEBUGGING
  // =========================================================
  {
    level: 1,
    language: "web",
    difficulty: "EASY",
    type: "Code Debugging",
    title: "HTML Closing Tag",
    prompt: "Which line contains the bug?",
    referenceCode: 
`<div class="container">
    <h1>Title</h1>
</div>`,
    debugCode: 
`<div class="container">
    <h1>Title</h1>
</div`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 2,
    hint: "Check the closing syntax of the container.",
    explanation: "The closing div tag is missing its final closing bracket '>'."
  },
  {
    level: 2,
    language: "web",
    difficulty: "EASY",
    type: "Code Debugging",
    title: "CSS Color Property",
    prompt: "Which line contains the bug?",
    referenceCode: 
`.box {
    background-color: red;
    color: white;
}`,
    debugCode: 
`.box {
    text-color: red;
    color: white;
}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 1,
    hint: "There is no text-color property in CSS.",
    explanation: "Use `color` for text color and `background-color` for backgrounds."
  },
  {
    level: 3,
    language: "web",
    difficulty: "MEDIUM",
    type: "Code Debugging",
    title: "JS DOM Selection",
    prompt: "Which line contains the bug?",
    referenceCode: 
`const btn = document.getElementById("submit");
btn.addEventListener("click", () => {});`,
    debugCode: 
`const btn = document.getElementById("#submit");
btn.addEventListener("click", () => {});`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 0,
    hint: "Do you need the '#' when using getElementById?",
    explanation: "`getElementById` does not require the '#' symbol."
  },
  {
    level: 4,
    language: "web",
    difficulty: "MEDIUM",
    type: "Code Debugging",
    title: "CSS Class Syntax",
    prompt: "Which line contains the bug?",
    referenceCode: 
`<button class="btn primary">
    Click Me
</button>`,
    debugCode: 
`<button class="btn, primary">
    Click Me
</button>`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 0,
    hint: "How do you separate multiple classes in HTML?",
    explanation: "Multiple CSS classes should be separated by a space, not a comma."
  },
  {
    level: 5,
    language: "web",
    difficulty: "HARD",
    type: "Code Debugging",
    title: "JS Async/Await",
    prompt: "Which line contains the bug?",
    referenceCode: 
`async function getData() {
    const res = await fetch('/api');
    return res.json();
}`,
    debugCode: 
`function getData() {
    const res = await fetch('/api');
    return res.json();
}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"],
    answerIndex: 0,
    hint: "Where can you use the 'await' keyword?",
    explanation: "The `await` keyword can only be used inside an `async` function."
  }
];

const SPOT_DIFF_BANK = [
  // =========================================================
  // PYTHON - SPOT THE DIFFERENCE
  // =========================================================
  {
    level: 1,
    language: "python",
    difficulty: "MEDIUM",
    type: "Spot the Difference",
    title: "Multiple Bugs",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`def calc_total(cart):
    total = 0
    tax = 0.12
    for item in cart:
        total += item
    return total * (1 + tax)`,
    debugCode:
`def calc_total(cart):
    total = 10
    tax = 0.21
    for item in cart:
        total -= item
    return total * (1 + tax)`,
    bugLines: [1, 2, 4], 
    explanation: "Initial total, tax rate, and loop operator were changed."
  },
  {
    level: 2,
    language: "python",
    difficulty: "MEDIUM",
    type: "Spot the Difference",
    title: "String Formatting",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`def get_greeting(name, age):
    greeting = f"Hello {name}"
    info = f"You are {age} years old"
    return greeting + ". " + info`,
    debugCode:
`def get_greeting(name, age):
    greeting = "Hello {name}"
    info = f"You are {age} years old"
    return greeting - ". " + info`,
    bugLines: [1, 3],
    explanation: "Missing 'f' for f-string, and incorrect concatenation operator."
  },
  {
    level: 3,
    language: "python",
    difficulty: "HARD",
    type: "Spot the Difference",
    title: "Class Definition",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`class Player:
    def __init__(self, hp):
        self.hp = hp
    
    def take_damage(self, dmg):
        self.hp -= dmg`,
    debugCode:
`class Player:
    def _init_(self, hp):
        self.hp = hp
    
    def take_damage(dmg):
        self.hp -= dmg`,
    bugLines: [1, 4],
    explanation: "Init requires double underscores, and instance methods must take 'self' as the first parameter."
  },
  {
    level: 4,
    language: "python",
    difficulty: "HARD",
    type: "Spot the Difference",
    title: "File Handling",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`def save_data(data):
    with open("save.txt", "w") as f:
        f.write(data)
    print("Saved")`,
    debugCode:
`def save_data(data):
    with open("save.txt", "r") as f:
        f.read(data)
    print("Saved")`,
    bugLines: [1, 2],
    explanation: "Mode should be 'w' to write, and you use f.write() instead of f.read()."
  },
  {
    level: 5,
    language: "python",
    difficulty: "HARD",
    type: "Spot the Difference",
    title: "List Comprehension",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`numbers = [1, 2, 3, 4, 5]
evens = [x for x in numbers if x % 2 == 0]
squares = [x*x for x in evens]`,
    debugCode:
`numbers = [1, 2, 3, 4, 5]
evens = [x for x in numbers if x % 2 = 0]
squares = {x*x for x in evens}`,
    bugLines: [1, 2],
    explanation: "Comparison requires '==', and '{}' creates a set instead of a list."
  },

  // =========================================================
  // C++ - SPOT THE DIFFERENCE
  // =========================================================
  {
    level: 1,
    language: "cpp",
    difficulty: "MEDIUM",
    type: "Spot the Difference",
    title: "Pointer Issues",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`void updateValue(int* ptr) {
    if (ptr != nullptr) {
        *ptr = 100;
    }
}`,
    debugCode:
`void updateValue(int* ptr) {
    if (ptr == nullptr) {
        ptr = 100;
    }
}`,
    bugLines: [1, 2],
    explanation: "The null check was inverted, and the pointer address was reassigned instead of the value."
  },
  {
    level: 2,
    language: "cpp",
    difficulty: "MEDIUM",
    type: "Spot the Difference",
    title: "Vector Iteration",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`std::vector<int> nums = {1, 2, 3};
for (auto it = nums.begin(); it != nums.end(); ++it) {
    std::cout << *it;
}`,
    debugCode:
`std::vector<int> nums = {1, 2, 3};
for (auto it = nums.begin(); it < nums.end; ++it) {
    std::cout << it;
}`,
    bugLines: [1, 2],
    explanation: "Missing parentheses on end(), and iterators must be dereferenced with *it."
  },
  {
    level: 3,
    language: "cpp",
    difficulty: "HARD",
    type: "Spot the Difference",
    title: "Class Inheritance",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`class Base {
    public:
        virtual void print() { cout << "Base"; }
};
class Derived : public Base {
    public:
        void print() override { cout << "Derived"; }
};`,
    debugCode:
`class Base {
    private:
        virtual void print() { cout << "Base"; }
}
class Derived : public Base {
    public:
        void print() { cout << "Derived"; }
};`,
    bugLines: [1, 3, 6],
    explanation: "Base methods must be public to override, class needs a semicolon, and missing override keyword."
  },
  {
    level: 4,
    language: "cpp",
    difficulty: "HARD",
    type: "Spot the Difference",
    title: "Memory Management",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`int* createArray(int size) {
    int* arr = new int[size];
    return arr;
}`,
    debugCode:
`int* createArray(int size) {
    int arr[size];
    return arr;
}`,
    bugLines: [1, 2],
    explanation: "Returning a pointer to a local stack array causes undefined behavior."
  },
  {
    level: 5,
    language: "cpp",
    difficulty: "HARD",
    type: "Spot the Difference",
    title: "Include Directives",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "test";
}`,
    debugCode:
`#include iostream
#include "string"
using std;
int main() {
    string s = "test";
}`,
    bugLines: [0, 1, 2],
    explanation: "iostream needs angle brackets, string should use angle brackets, and namespace keyword is missing."
  },

  // =========================================================
  // JAVA - SPOT THE DIFFERENCE
  // =========================================================
  {
    level: 1,
    language: "java",
    difficulty: "MEDIUM",
    type: "Spot the Difference",
    title: "Constructor Mixup",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`public class User {
    private String name;
    public User(String name) {
        this.name = name;
    }
}`,
    debugCode:
`public class User {
    private String name;
    public void User(String n) {
        name = name;
    }
}`,
    bugLines: [2, 3],
    explanation: "Constructors cannot have a return type (void), and assigning name to itself does nothing."
  },
  {
    level: 2,
    language: "java",
    difficulty: "MEDIUM",
    type: "Spot the Difference",
    title: "List Initialization",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`List<String> list = new ArrayList<>();
list.add("Apple");
int count = list.size();`,
    debugCode:
`List<String> list = new List<>();
list.push("Apple");
int count = list.length;`,
    bugLines: [0, 1, 2],
    explanation: "List is an interface. You add with .add(), and size is a method .size()."
  },
  {
    level: 3,
    language: "java",
    difficulty: "HARD",
    type: "Spot the Difference",
    title: "Exception Handling",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    e.printStackTrace();
} finally {
    System.out.println("Done");
}`,
    debugCode:
`try {
    int result = 10 / 0;
} catch (Exception e) {
    e.printStackTrace();
} catch (ArithmeticException e) {
    System.out.println("Done");
}`,
    bugLines: [2, 4],
    explanation: "Catching a specific exception after a general Exception causes a compiler error. Finally block missing."
  },
  {
    level: 4,
    language: "java",
    difficulty: "HARD",
    type: "Spot the Difference",
    title: "Static Context",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`public class App {
    int count = 0;
    public void run() {
        count++;
    }
}`,
    debugCode:
`public class app {
    int count = 0;
    public static void run() {
        count++;
    }
}`,
    bugLines: [0, 2],
    explanation: "A static method cannot access a non-static instance variable."
  },
  {
    level: 5,
    language: "java",
    difficulty: "HARD",
    type: "Spot the Difference",
    title: "Map Iteration",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`Map<String, Integer> map = new HashMap<>();
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey());
}`,
    debugCode:
`Map<String, Integer> map = new HashMap<>();
for (String entry : map) {
    System.out.println(entry);
}`,
    bugLines: [1, 2],
    explanation: "You cannot iterate directly over a Map. You must use .keySet(), .values(), or .entrySet()."
  },

  // =========================================================
  // WEB (HTML/CSS/JS) - SPOT THE DIFFERENCE
  // =========================================================
  {
    level: 1,
    language: "web",
    difficulty: "MEDIUM",
    type: "Spot the Difference",
    title: "Form Submission",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`<form id="myForm">
    <input type="text" required>
    <button type="submit">Send</button>
</form>`,
    debugCode:
`<form id="myForm">
    <input type="text" validate>
    <button type="button">Send</button>
</form>`,
    bugLines: [1, 2],
    explanation: "The required attribute is standard, and the button type must be submit for native forms."
  },
  {
    level: 2,
    language: "web",
    difficulty: "MEDIUM",
    type: "Spot the Difference",
    title: "Flexbox CSS",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`.container {
    display: flex;
    justify-content: center;
    align-items: center;
}`,
    debugCode:
`.container {
    display: block;
    align-content: center;
    align-items: center;
}`,
    bugLines: [1, 2],
    explanation: "Display must be flex, and justify-content handles the main axis."
  },
  {
    level: 3,
    language: "web",
    difficulty: "HARD",
    type: "Spot the Difference",
    title: "Event Listeners",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
    });
});`,
    debugCode:
`document.querySelector('.btn').forEach(btn => {
    btn.onClick('click', (e) => {
        e.stopDefault();
    });
});`,
    bugLines: [0, 1, 2],
    explanation: "querySelector only returns one element. Use addEventListener and preventDefault()."
  },
  {
    level: 4,
    language: "web",
    difficulty: "HARD",
    type: "Spot the Difference",
    title: "Fetch API",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`fetch('/data.json')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));`,
    debugCode:
`fetch('/data.json')
    .then(res => res.parse())
    .then(data => console.log(data))
    .error(err => console.error(err));`,
    bugLines: [1, 3],
    explanation: "Response uses .json(), and promise chains use .catch() instead of .error()."
  },
  {
    level: 5,
    language: "web",
    difficulty: "HARD",
    type: "Spot the Difference",
    title: "CSS Selectors",
    prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode:
`ul > li {
    list-style: none;
}
.active::after {
    content: "";
}`,
    debugCode:
`ul < li {
    list-style: none;
}
.active:after {
    text: "";
}`,
    bugLines: [0, 4],
    explanation: "The child selector is '>', and pseudo-elements use the 'content' property."
  }
];