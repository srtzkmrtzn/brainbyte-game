"use strict";

const QUESTION_BANK = [
  // =========================================================
  // PYTHON - CODE DEBUGGING (23 Levels)
  // =========================================================
  
  // --- HOUSE 2: Easy (Levels 1-3) ---
  {
    level: 1, house: 2, language: "python", difficulty: "EASY", type: "Code Debugging",
    title: "Python Indentation", prompt: "Which line contains the bug?",
    referenceCode: `def greet(name):\n    print("Hello " + name)`,
    debugCode: `def greet(name):\nprint("Hello " + name)`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Python relies on whitespace.", explanation: "Python requires indentation for blocks inside functions."
  },
  {
    level: 2, house: 2, language: "python", difficulty: "EASY", type: "Code Debugging",
    title: "List Indexing", prompt: "Which line contains the bug?",
    referenceCode: `fruits = ["apple", "banana", "cherry"]\nprint(fruits[0])`,
    debugCode: `fruits = ["apple", "banana", "cherry"]\nprint(fruits[1])`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Arrays are zero-indexed.", explanation: "To get the first element 'apple', the index must be 0."
  },
  {
    level: 3, house: 2, language: "python", difficulty: "EASY", type: "Code Debugging",
    title: "Print Syntax", prompt: "Which line contains the bug?",
    referenceCode: `name = "John"\nprint(name)`,
    debugCode: `name = "John"\nprint name`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Python 3 requires parentheses.", explanation: "In Python 3, print is a function and requires ()."
  },

  // --- HOUSE 3: Easy (Levels 4-6) ---
  {
    level: 4, house: 3, language: "python", difficulty: "EASY", type: "Code Debugging",
    title: "Comparison Operators", prompt: "Which line contains the bug?",
    referenceCode: `x = 10\nif x == 10:\n    print("Ten!")`,
    debugCode: `x = 10\nif x = 10:\n    print("Ten!")`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Assignment vs Comparison.", explanation: "A single '=' assigns a value. Double '==' compares values."
  },
  {
    level: 5, house: 3, language: "python", difficulty: "EASY", type: "Code Debugging",
    title: "String Concatenation", prompt: "Which line contains the bug?",
    referenceCode: `age = 20\nprint("Age: " + str(age))`,
    debugCode: `age = 20\nprint("Age: " + age)`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "You cannot add integers to strings.", explanation: "You must cast the integer to a string using str()."
  },
  {
    level: 6, house: 3, language: "python", difficulty: "EASY", type: "Code Debugging",
    title: "Missing Colon", prompt: "Which line contains the bug?",
    referenceCode: `for i in range(5):\n    print(i)`,
    debugCode: `for i in range(5)\n    print(i)`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "How do you end a loop declaration?", explanation: "For loops must end with a colon ':'."
  },

  // --- HOUSE 4: Easy (Levels 7-9) ---
  {
    level: 7, house: 4, language: "python", difficulty: "EASY", type: "Code Debugging",
    title: "Dictionary Access", prompt: "Which line contains the bug?",
    referenceCode: `user = {"name": "Alice"}\nprint(user["name"])`,
    debugCode: `user = {"name": "Alice"}\nprint(user.name)`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Dictionaries aren't objects.", explanation: "Use bracket notation `user['name']`."
  },
  {
    level: 8, house: 4, language: "python", difficulty: "EASY", type: "Code Debugging",
    title: "Boolean Capitalization", prompt: "Which line contains the bug?",
    referenceCode: `is_active = True\nif is_active:\n    print("Go")`,
    debugCode: `is_active = true\nif is_active:\n    print("Go")`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Python is case-sensitive.", explanation: "Booleans in Python must be capitalized: True / False."
  },
  {
    level: 9, house: 4, language: "python", difficulty: "EASY", type: "Code Debugging",
    title: "Function Definition", prompt: "Which line contains the bug?",
    referenceCode: `def my_func():\n    return 1`,
    debugCode: `function my_func():\n    return 1`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "How do you declare a function in Python?", explanation: "Use the `def` keyword."
  },

  // --- HOUSE 5: Medium (Levels 10-12) ---
  {
    level: 10, house: 5, language: "python", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Mutable Default Args", prompt: "Which line contains the bug?",
    referenceCode: `def add(item, cart=None):\n    if cart is None:\n        cart = []`,
    debugCode: `def add(item, cart=[]):\n    if cart is None:\n        cart = []`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Lists persist across calls.", explanation: "Mutable default arguments are evaluated once."
  },
  {
    level: 11, house: 5, language: "python", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Global Variables", prompt: "Which line contains the bug?",
    referenceCode: `x = 5\ndef mod():\n    global x\n    x = 10`,
    debugCode: `x = 5\ndef mod():\n    x = 10`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 2,
    hint: "Scope matters.", explanation: "Without `global`, a new local variable `x` is created."
  },
  {
    level: 12, house: 5, language: "python", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Catching Exceptions", prompt: "Which line contains the bug?",
    referenceCode: `try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    pass`,
    debugCode: `try:\n    x = 1 / 0\ncatch ZeroDivisionError:\n    pass`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 2,
    hint: "Python uses a specific word for catching errors.", explanation: "Use `except`, not `catch`."
  },

  // --- HOUSE 6: Medium (Levels 13-15) ---
  {
    level: 13, house: 6, language: "python", difficulty: "MEDIUM", type: "Code Debugging",
    title: "List Modification in Loop", prompt: "Which line contains the bug?",
    referenceCode: `nums = [1, 2, 3]\nfor n in nums[:]:\n    nums.remove(n)`,
    debugCode: `nums = [1, 2, 3]\nfor n in nums:\n    nums.remove(n)`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Don't modify what you iterate over directly.", explanation: "Iterating over a list while removing elements skips indices."
  },
  {
    level: 14, house: 6, language: "python", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Class Self Keyword", prompt: "Which line contains the bug?",
    referenceCode: `class Cat:\n    def meow(self):\n        print("Meow")`,
    debugCode: `class Cat:\n    def meow():\n        print("Meow")`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Instance methods need a reference to the instance.", explanation: "Instance methods must take `self`."
  },
  {
    level: 15, house: 6, language: "python", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Tuple Immutability", prompt: "Which line contains the bug?",
    referenceCode: `t = (1, 2)\nnew_t = (3, 2)`,
    debugCode: `t = (1, 2)\nt[0] = 3`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Tuples cannot be changed.", explanation: "Tuples are immutable; you cannot assign to their indices."
  },

  // --- HOUSE 7: Medium (Levels 16-18) ---
  {
    level: 16, house: 7, language: "python", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Importing Modules", prompt: "Which line contains the bug?",
    referenceCode: `import math\nprint(math.pi)`,
    debugCode: `include math\nprint(math.pi)`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Python isn't C++.", explanation: "Use `import`, not `include`."
  },
  {
    level: 17, house: 7, language: "python", difficulty: "MEDIUM", type: "Code Debugging",
    title: "F-Strings", prompt: "Which line contains the bug?",
    referenceCode: `name = "Bob"\nprint(f"Hi {name}")`,
    debugCode: `name = "Bob"\nprint("Hi {name}")`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "How does Python interpolate variables?", explanation: "Missing the 'f' prefix before the string."
  },
  {
    level: 18, house: 7, language: "python", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Dict Iteration", prompt: "Which line contains the bug?",
    referenceCode: `d = {'a': 1}\nfor k, v in d.items():\n    pass`,
    debugCode: `d = {'a': 1}\nfor k, v in d:\n    pass`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Iterating a dict directly only gives keys.", explanation: "You must use `.items()` to get both key and value."
  },

  // --- HOUSE 8: School / Hard (Levels 19-23) ---
  {
    level: 19, house: 8, language: "python", difficulty: "HARD", type: "Code Debugging",
    title: "Variable Shadowing", prompt: "Which line contains the bug?",
    referenceCode: `x = [1]\ndef add_x(val):\n    x.append(val)`,
    debugCode: `x = [1]\ndef add_x(val):\n    x = x + [val]`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 2,
    hint: "Local assignment before reference.", explanation: "Assigning to `x` makes it local, throwing an UnboundLocalError."
  },
  {
    level: 20, house: 8, language: "python", difficulty: "HARD", type: "Code Debugging",
    title: "Deep Copy", prompt: "Which line contains the bug?",
    referenceCode: `import copy\na = [[1]]\nb = copy.deepcopy(a)`,
    debugCode: `import copy\na = [[1]]\nb = a.copy()`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 2,
    hint: "Nested lists need special care.", explanation: "`.copy()` is shallow. Modifying `b[0]` modifies `a[0]`."
  },
  {
    level: 21, house: 8, language: "python", difficulty: "HARD", type: "Code Debugging",
    title: "Generators", prompt: "Which line contains the bug?",
    referenceCode: `def gen():\n    yield 1\n    yield 2`,
    debugCode: `def gen():\n    return 1\n    yield 2`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Return stops execution.", explanation: "`return` exits the generator completely."
  },
  {
    level: 22, house: 8, language: "python", difficulty: "HARD", type: "Code Debugging",
    title: "Class Variables", prompt: "Which line contains the bug?",
    referenceCode: `class A:\n    def __init__(self):\n        self.data = []`,
    debugCode: `class A:\n    data = []\n    def __init__(self): pass`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Class variables are shared.", explanation: "Defining a list at the class level shares it across all instances."
  },
  {
    level: 23, house: 8, language: "python", difficulty: "HARD", type: "Code Debugging",
    title: "Lambda Late Binding", prompt: "Which line contains the bug?",
    referenceCode: `funcs = [lambda x, i=i: x * i for i in range(3)]\nprint(funcs[0](2))`,
    debugCode: `funcs = [lambda x: x * i for i in range(3)]\nprint(funcs[0](2))`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Lambdas bind names, not values.", explanation: "Without `i=i`, all lambdas use the final value of `i` (2)."
  },

  // =========================================================
  // C++ - CODE DEBUGGING (23 Levels)
  // =========================================================
  
  // --- HOUSE 2: Easy (Levels 1-3) ---
  {
    level: 1, house: 2, language: "cpp", difficulty: "EASY", type: "Code Debugging",
    title: "Missing Semicolon", prompt: "Which line contains the bug?",
    referenceCode: `#include <iostream>\nint main() {\n    std::cout << "Hello";\n    return 0;\n}`,
    debugCode: `#include <iostream>\nint main() {\n    std::cout << "Hello"\n    return 0;\n}`,
    answers: ["Line 2", "Line 3", "Line 4", "No error"], answerIndex: 1,
    hint: "Check the end of statements.", explanation: "C++ requires a semicolon at the end of statements."
  },
  {
    level: 2, house: 2, language: "cpp", difficulty: "EASY", type: "Code Debugging",
    title: "Main Function Type", prompt: "Which line contains the bug?",
    referenceCode: `int main() {\n    return 0;\n}`,
    debugCode: `void main() {\n    return 0;\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "What should main() return to the OS?", explanation: "The main function in C++ must return an `int`, not `void`."
  },
  {
    level: 3, house: 2, language: "cpp", difficulty: "EASY", type: "Code Debugging",
    title: "Variable Declaration", prompt: "Which line contains the bug?",
    referenceCode: `int x = 5;\nstd::cout << x;`,
    debugCode: `x = 5;\nstd::cout << x;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "C++ is strongly typed.", explanation: "Variables must be declared with a type (like int) before use."
  },

  // --- HOUSE 3: Easy (Levels 4-6) ---
  {
    level: 4, house: 3, language: "cpp", difficulty: "EASY", type: "Code Debugging",
    title: "Include Directives", prompt: "Which line contains the bug?",
    referenceCode: `#include <iostream>\nint main() { return 0; }`,
    debugCode: `include <iostream>\nint main() { return 0; }`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Preprocessor directives need a special symbol.", explanation: "Includes must start with the '#' symbol."
  },
  {
    level: 5, house: 3, language: "cpp", difficulty: "EASY", type: "Code Debugging",
    title: "Array Indexing", prompt: "Which line contains the bug?",
    referenceCode: `int arr[3] = {1, 2, 3};\nstd::cout << arr[0];`,
    debugCode: `int arr[3] = {1, 2, 3};\nstd::cout << arr[3];`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Arrays are zero-indexed.", explanation: "Index 3 is out of bounds for an array of size 3 (valid indices are 0, 1, 2)."
  },
  {
    level: 6, house: 3, language: "cpp", difficulty: "EASY", type: "Code Debugging",
    title: "Namespace Std", prompt: "Which line contains the bug?",
    referenceCode: `std::cout << "Hi";`,
    debugCode: `cout << "Hi";`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Where does cout come from?", explanation: "Without 'using namespace std;', you must prefix cout with 'std::'."
  },

  // --- HOUSE 4: Easy (Levels 7-9) ---
  {
    level: 7, house: 4, language: "cpp", difficulty: "EASY", type: "Code Debugging",
    title: "String Quotes", prompt: "Which line contains the bug?",
    referenceCode: `std::string s = "Hello";`,
    debugCode: `std::string s = 'Hello';`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Characters vs Strings.", explanation: "Single quotes are for char. Double quotes are for std::string."
  },
  {
    level: 8, house: 4, language: "cpp", difficulty: "EASY", type: "Code Debugging",
    title: "Boolean Values", prompt: "Which line contains the bug?",
    referenceCode: `bool isValid = true;`,
    debugCode: `bool isValid = True;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "C++ is case-sensitive.", explanation: "Boolean values in C++ are lowercase: 'true' or 'false'."
  },
  {
    level: 9, house: 4, language: "cpp", difficulty: "EASY", type: "Code Debugging",
    title: "Logical Operators", prompt: "Which line contains the bug?",
    referenceCode: `if (a > 0 && b > 0) {}`,
    debugCode: `if (a > 0 and b > 0) {}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Use symbols for logic.", explanation: "While 'and' works in some compilers, standard C++ typically uses '&&'."
  },

  // --- HOUSE 5: Medium (Levels 10-12) ---
  {
    level: 10, house: 5, language: "cpp", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Pointer Dereferencing", prompt: "Which line contains the bug?",
    referenceCode: `int x = 5;\nint* ptr = &x;\nstd::cout << *ptr;`,
    debugCode: `int x = 5;\nint* ptr = &x;\nstd::cout << ptr;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 2,
    hint: "Are you printing the value or the address?", explanation: "Printing `ptr` outputs the memory address. You need `*ptr` to print the value."
  },
  {
    level: 11, house: 5, language: "cpp", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Memory Leak", prompt: "Which line contains the bug?",
    referenceCode: `int* data = new int[10];\ndelete[] data;`,
    debugCode: `int* data = new int[10];\ndelete data;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "How do you free an array?", explanation: "When allocating memory with `new[]`, you must free it with `delete[]`."
  },
  {
    level: 12, house: 5, language: "cpp", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Reference Variables", prompt: "Which line contains the bug?",
    referenceCode: `int x = 10;\nint& ref = x;\nref = 20;`,
    debugCode: `int x = 10;\nint& ref;\nref = x;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "References must be initialized immediately.", explanation: "A reference must be initialized when it is declared."
  },

  // --- HOUSE 6: Medium (Levels 13-15) ---
  {
    level: 13, house: 6, language: "cpp", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Class Access Modifiers", prompt: "Which line contains the bug?",
    referenceCode: `class A {\npublic:\n    int x;\n};`,
    debugCode: `class A {\n    int x;\n};\nA obj; obj.x = 5;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Default visibility in classes.", explanation: "Class members are private by default. You must declare them public to access them externally."
  },
  {
    level: 14, house: 6, language: "cpp", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Switch Statements", prompt: "Which line contains the bug?",
    referenceCode: `switch(x) {\n    case 1: break;\n    default: break;\n}`,
    debugCode: `switch(x) {\n    case "1": break;\n    default: break;\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "What types can switch statements evaluate?", explanation: "Switch statements only work with integral types (int, char, enum), not strings."
  },
  {
    level: 15, house: 6, language: "cpp", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Vector Capacity", prompt: "Which line contains the bug?",
    referenceCode: `std::vector<int> v(5);\nv[0] = 10;`,
    debugCode: `std::vector<int> v;\nv[0] = 10;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "You can't assign to an empty vector via index.", explanation: "If the vector is empty, use .push_back() or initialize it with a size first."
  },

  // --- HOUSE 7: Medium (Levels 16-18) ---
  {
    level: 16, house: 7, language: "cpp", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Dangling Pointers", prompt: "Which line contains the bug?",
    referenceCode: `int* p = new int(5);\ndelete p;\np = nullptr;`,
    debugCode: `int* p = new int(5);\ndelete p;\nstd::cout << *p;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 2,
    hint: "Don't use memory after freeing it.", explanation: "Dereferencing a pointer after it has been deleted causes undefined behavior."
  },
  {
    level: 17, house: 7, language: "cpp", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Virtual Destructors", prompt: "Which line contains the bug?",
    referenceCode: `class Base { public: virtual ~Base() {} };\nBase* b = new Derived();\ndelete b;`,
    debugCode: `class Base { public: ~Base() {} };\nBase* b = new Derived();\ndelete b;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Deleting a derived class through a base pointer.", explanation: "Base classes need virtual destructors so the derived destructor is called."
  },
  {
    level: 18, house: 7, language: "cpp", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Const Correctness", prompt: "Which line contains the bug?",
    referenceCode: `void print(const std::string& str) {\n    std::cout << str;\n}`,
    debugCode: `void print(const std::string& str) {\n    str += "!";\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Can you modify a const variable?", explanation: "You cannot append to or modify a const reference."
  },

  // --- HOUSE 8: School / Hard (Levels 19-23) ---
  {
    level: 19, house: 8, language: "cpp", difficulty: "HARD", type: "Code Debugging",
    title: "Iterator Invalidation", prompt: "Which line contains the bug?",
    referenceCode: `for(auto it = v.begin(); it != v.end(); ) {\n    it = v.erase(it);\n}`,
    debugCode: `for(auto it = v.begin(); it != v.end(); ++it) {\n    v.erase(it);\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Erasing an element invalidates iterators.", explanation: ".erase() returns the next valid iterator, which must be assigned back to `it`."
  },
  {
    level: 20, house: 8, language: "cpp", difficulty: "HARD", type: "Code Debugging",
    title: "Return Local Reference", prompt: "Which line contains the bug?",
    referenceCode: `int getValue() {\n    int x = 5;\n    return x;\n}`,
    debugCode: `int& getValue() {\n    int x = 5;\n    return x;\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 2,
    hint: "Local variables are destroyed when the function ends.", explanation: "Returning a reference to a local stack variable causes a crash."
  },
  {
    level: 21, house: 8, language: "cpp", difficulty: "HARD", type: "Code Debugging",
    title: "Include Guards", prompt: "Which line contains the bug?",
    referenceCode: `#ifndef MY_HEADER_H\n#define MY_HEADER_H\nint x;\n#endif`,
    debugCode: `#ifndef MY_HEADER_H\nint x;\n#endif`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Include guards need to define the macro.", explanation: "You must `#define` the macro so subsequent includes are ignored."
  },
  {
    level: 22, house: 8, language: "cpp", difficulty: "HARD", type: "Code Debugging",
    title: "Pass by Value vs Reference", prompt: "Which line contains the bug?",
    referenceCode: `void swap(int& a, int& b) {\n    int temp = a; a = b; b = temp;\n}`,
    debugCode: `void swap(int a, int b) {\n    int temp = a; a = b; b = temp;\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "You want the swap to affect the original variables.", explanation: "Passing by value creates copies; you must pass by reference (&)."
  },
  {
    level: 23, house: 8, language: "cpp", difficulty: "HARD", type: "Code Debugging",
    title: "Multiple Inheritance Ambiguity", prompt: "Which line contains the bug?",
    referenceCode: `class D : public B, public C {\n    void foo() { B::print(); }\n};`,
    debugCode: `class D : public B, public C {\n    void foo() { print(); }\n};`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "If B and C both have print(), which one is called?", explanation: "The Diamond Problem: You must specify which base class method to call."
  },

  // =========================================================
  // JAVA - CODE DEBUGGING (23 Levels)
  // =========================================================
  
  // --- HOUSE 2: Easy (Levels 1-3) ---
  {
    level: 1, house: 2, language: "java", difficulty: "EASY", type: "Code Debugging",
    title: "String Comparison", prompt: "Which line contains the bug?",
    referenceCode: `String a = "test";\nif (a.equals("test")) {\n    System.out.println("Match");\n}`,
    debugCode: `String a = "test";\nif (a == "test") {\n    System.out.println("Match");\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "How do you compare object values in Java?", explanation: "In Java, '==' compares object references, while '.equals()' compares string values."
  },
  {
    level: 2, house: 2, language: "java", difficulty: "EASY", type: "Code Debugging",
    title: "Print Syntax", prompt: "Which line contains the bug?",
    referenceCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}`,
    debugCode: `public class Main {\n    public static void main(String[] args) {\n        Console.log("Hello");\n    }\n}`,
    answers: ["Line 2", "Line 3", "Line 4", "No error"], answerIndex: 1,
    hint: "Java doesn't use Console.log.", explanation: "The correct output method in Java is `System.out.println()`."
  },
  {
    level: 3, house: 2, language: "java", difficulty: "EASY", type: "Code Debugging",
    title: "Array Length", prompt: "Which line contains the bug?",
    referenceCode: `int[] numbers = {1, 2, 3};\nint size = numbers.length;`,
    debugCode: `int[] numbers = {1, 2, 3};\nint size = numbers.length();`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Is length a method or a property?", explanation: "In Java arrays, `length` is a property, not a method, so no parentheses are used."
  },

  // --- HOUSE 3: Easy (Levels 4-6) ---
  {
    level: 4, house: 3, language: "java", difficulty: "EASY", type: "Code Debugging",
    title: "Class Instantiation", prompt: "Which line contains the bug?",
    referenceCode: `Scanner sc = new Scanner(System.in);\nint x = sc.nextInt();`,
    debugCode: `Scanner sc = Scanner(System.in);\nint x = sc.nextInt();`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "How do you create a new object in Java?", explanation: "You must use the `new` keyword to instantiate an object in Java."
  },
  {
    level: 5, house: 3, language: "java", difficulty: "EASY", type: "Code Debugging",
    title: "Missing Semicolon", prompt: "Which line contains the bug?",
    referenceCode: `int score = 100;\nSystem.out.println(score);`,
    debugCode: `int score = 100\nSystem.out.println(score);`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Check the end of your statements.", explanation: "Java statements must be terminated with a semicolon."
  },
  {
    level: 6, house: 3, language: "java", difficulty: "EASY", type: "Code Debugging",
    title: "Boolean Variables", prompt: "Which line contains the bug?",
    referenceCode: `boolean isPlaying = true;`,
    debugCode: `bool isPlaying = true;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "What is the full name of the primitive type?", explanation: "In Java, the boolean primitive is `boolean`, not `bool`."
  },

  // --- HOUSE 4: Easy (Levels 7-9) ---
  {
    level: 7, house: 4, language: "java", difficulty: "EASY", type: "Code Debugging",
    title: "Main Method Signature", prompt: "Which line contains the bug?",
    referenceCode: `public static void main(String[] args) {\n    System.out.println("Start");\n}`,
    debugCode: `public void main(String[] args) {\n    System.out.println("Start");\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "How does the JVM call the main method?", explanation: "The main method must be `static` so it can be called without instantiating the class."
  },
  {
    level: 8, house: 4, language: "java", difficulty: "EASY", type: "Code Debugging",
    title: "Method Return Types", prompt: "Which line contains the bug?",
    referenceCode: `public int getScore() {\n    return 50;\n}`,
    debugCode: `public void getScore() {\n    return 50;\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "What type of data is being returned?", explanation: "If a method returns an integer, its return type must be `int`, not `void`."
  },
  {
    level: 9, house: 4, language: "java", difficulty: "EASY", type: "Code Debugging",
    title: "Variable Capitalization", prompt: "Which line contains the bug?",
    referenceCode: `String message = "Welcome!";`,
    debugCode: `string message = "Welcome!";`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Classes are capitalized in Java.", explanation: "`String` is an object in Java and must be capitalized."
  },

  // --- HOUSE 5: Medium (Levels 10-12) ---
  {
    level: 10, house: 5, language: "java", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Null Pointer", prompt: "Which line contains the bug?",
    referenceCode: `String text = null;\nif (text != null && text.length() > 0) {\n    System.out.println("Valid");\n}`,
    debugCode: `String text = null;\nif (text.length() > 0 && text != null) {\n    System.out.println("Valid");\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Short-circuit evaluation evaluates left to right.", explanation: "Checking `.length()` before checking for `null` throws a NullPointerException."
  },
  {
    level: 11, house: 5, language: "java", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Array Index Out of Bounds", prompt: "Which line contains the bug?",
    referenceCode: `int[] arr = new int[5];\narr[4] = 10;`,
    debugCode: `int[] arr = new int[5];\narr[5] = 10;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Arrays are zero-indexed.", explanation: "An array of size 5 has valid indices 0 through 4. Index 5 is out of bounds."
  },
  {
    level: 12, house: 5, language: "java", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Static Context", prompt: "Which line contains the bug?",
    referenceCode: `public class App {\n    int count = 0;\n    public void run() {\n        count++;\n    }\n}`,
    debugCode: `public class App {\n    int count = 0;\n    public static void run() {\n        count++;\n    }\n}`,
    answers: ["Line 2", "Line 3", "Line 4", "No error"], answerIndex: 2,
    hint: "Can static methods access instance variables?", explanation: "A static method cannot directly access a non-static instance variable like `count`."
  },

  // --- HOUSE 6: Medium (Levels 13-15) ---
  {
    level: 13, house: 6, language: "java", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Map Iteration", prompt: "Which line contains the bug?",
    referenceCode: `Map<String, Integer> map = new HashMap<>();\nfor (String key : map.keySet()) {\n    System.out.println(key);\n}`,
    debugCode: `Map<String, Integer> map = new HashMap<>();\nfor (String key : map) {\n    System.out.println(key);\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "You cannot iterate directly over a Map.", explanation: "You must use `.keySet()`, `.values()`, or `.entrySet()` to iterate over a Map."
  },
  {
    level: 14, house: 6, language: "java", difficulty: "MEDIUM", type: "Code Debugging",
    title: "List Initialization", prompt: "Which line contains the bug?",
    referenceCode: `List<String> list = new ArrayList<>();\nlist.add("Apple");`,
    debugCode: `List<String> list = new List<>();\nlist.add("Apple");`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Interfaces cannot be instantiated.", explanation: "`List` is an interface. You must instantiate a concrete class like `ArrayList`."
  },
  {
    level: 15, house: 6, language: "java", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Exception Handling", prompt: "Which line contains the bug?",
    referenceCode: `try {\n    int x = 10 / 0;\n} catch (ArithmeticException e) {\n    e.printStackTrace();\n}`,
    debugCode: `try {\n    int x = 10 / 0;\n} catch (Exception e) {\n    e.printStackTrace();\n} catch (ArithmeticException e) {\n}`,
    answers: ["Line 2", "Line 3", "Line 5", "No error"], answerIndex: 2,
    hint: "Catch blocks are evaluated in order.", explanation: "Catching a general `Exception` first makes subsequent specific catches unreachable (compiler error)."
  },

  // --- HOUSE 7: Medium (Levels 16-18) ---
  {
    level: 16, house: 7, language: "java", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Private Access", prompt: "Which line contains the bug?",
    referenceCode: `class User {\n    private String name;\n    public String getName() { return name; }\n}`,
    debugCode: `class User {\n    private String name;\n}\nUser u = new User();\nu.name = "Alice";`,
    answers: ["Line 2", "Line 4", "Line 5", "No error"], answerIndex: 2,
    hint: "Respect access modifiers.", explanation: "`name` is private and cannot be accessed directly from outside the class."
  },
  {
    level: 17, house: 7, language: "java", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Constructor Return Type", prompt: "Which line contains the bug?",
    referenceCode: `public class Player {\n    public Player() {\n        // init\n    }\n}`,
    debugCode: `public class Player {\n    public void Player() {\n        // init\n    }\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Constructors are special.", explanation: "Constructors must not have a return type, not even `void`."
  },
  {
    level: 18, house: 7, language: "java", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Final Variables", prompt: "Which line contains the bug?",
    referenceCode: `final int max = 100;\nSystem.out.println(max);`,
    debugCode: `final int max = 100;\nmax = 200;\nSystem.out.println(max);`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Final means final.", explanation: "Variables marked as `final` cannot be reassigned."
  },

  // --- HOUSE 8: School / Hard (Levels 19-23) ---
  {
    level: 19, house: 8, language: "java", difficulty: "HARD", type: "Code Debugging",
    title: "Thread Execution", prompt: "Which line contains the bug?",
    referenceCode: `Thread t = new Thread(() -> System.out.println("Go"));\nt.start();`,
    debugCode: `Thread t = new Thread(() -> System.out.println("Go"));\nt.run();`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Are you starting a new thread or just running a method?", explanation: "Calling `.run()` executes the code on the *current* thread. You must use `.start()` to spawn a new thread."
  },
  {
    level: 20, house: 8, language: "java", difficulty: "HARD", type: "Code Debugging",
    title: "Primitive Wrapper Comparison", prompt: "Which line contains the bug?",
    referenceCode: `Integer a = 128;\nInteger b = 128;\nif (a.equals(b)) { }`,
    debugCode: `Integer a = 128;\nInteger b = 128;\nif (a == b) { }`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 2,
    hint: "Integer caching only goes up to 127.", explanation: "For values > 127, `Integer` objects are not cached, so `==` compares references. Use `.equals()`."
  },
  {
    level: 21, house: 8, language: "java", difficulty: "HARD", type: "Code Debugging",
    title: "Interface Implementation", prompt: "Which line contains the bug?",
    referenceCode: `interface Flyable { void fly(); }\nclass Bird implements Flyable {\n    public void fly() {}\n}`,
    debugCode: `interface Flyable { void fly(); }\nclass Bird implements Flyable {\n    void fly() {}\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 2,
    hint: "Interface methods are inherently public.", explanation: "When implementing an interface method, you must explicitly declare it `public` because you cannot reduce visibility."
  },
  {
    level: 22, house: 8, language: "java", difficulty: "HARD", type: "Code Debugging",
    title: "Generics & Primitives", prompt: "Which line contains the bug?",
    referenceCode: `List<Integer> numbers = new ArrayList<>();\nnumbers.add(5);`,
    debugCode: `List<int> numbers = new ArrayList<>();\nnumbers.add(5);`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Generics only work with Objects.", explanation: "You cannot use primitive types (like `int`) as type arguments in Generics. Use `Integer`."
  },
  {
    level: 23, house: 8, language: "java", difficulty: "HARD", type: "Code Debugging",
    title: "ConcurrentModificationException", prompt: "Which line contains the bug?",
    referenceCode: `List<String> list = new ArrayList<>(Arrays.asList("a", "b"));\nlist.removeIf(s -> s.equals("a"));`,
    debugCode: `List<String> list = new ArrayList<>(Arrays.asList("a", "b"));\nfor (String s : list) {\n    if (s.equals("a")) list.remove(s);\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 2,
    hint: "Don't modify a collection while iterating with a standard for-each loop.", explanation: "Modifying a collection during a for-each loop throws a `ConcurrentModificationException`. Use an Iterator or `removeIf`."
  },

  // =========================================================
  // WEB (HTML/CSS/JS) - CODE DEBUGGING (23 Levels)
  // =========================================================
  
  // --- HOUSE 2: Easy (Levels 1-3) ---
  {
    level: 1, house: 2, language: "web", difficulty: "EASY", type: "Code Debugging",
    title: "HTML Closing Tag", prompt: "Which line contains the bug?",
    referenceCode: `<div class="container">\n    <h1>Title</h1>\n</div>`,
    debugCode: `<div class="container">\n    <h1>Title</h1>\n</div`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 2,
    hint: "Check the closing syntax of the container.", explanation: "The closing div tag is missing its final closing bracket '>'."
  },
  {
    level: 2, house: 2, language: "web", difficulty: "EASY", type: "Code Debugging",
    title: "CSS Color Property", prompt: "Which line contains the bug?",
    referenceCode: `.box {\n    background-color: red;\n    color: white;\n}`,
    debugCode: `.box {\n    text-color: red;\n    color: white;\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "There is no text-color property in CSS.", explanation: "Use `color` for text color and `background-color` for backgrounds."
  },
  {
    level: 3, house: 2, language: "web", difficulty: "EASY", type: "Code Debugging",
    title: "JS DOM Selection", prompt: "Which line contains the bug?",
    referenceCode: `const btn = document.getElementById("submit");\nbtn.addEventListener("click", () => {});`,
    debugCode: `const btn = document.getElementById("#submit");\nbtn.addEventListener("click", () => {});`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Do you need the '#' when using getElementById?", explanation: "`getElementById` does not require the '#' symbol."
  },

  // --- HOUSE 3: Easy (Levels 4-6) ---
  {
    level: 4, house: 3, language: "web", difficulty: "EASY", type: "Code Debugging",
    title: "CSS Class Syntax", prompt: "Which line contains the bug?",
    referenceCode: `<button class="btn primary">\n    Click Me\n</button>`,
    debugCode: `<button class="btn, primary">\n    Click Me\n</button>`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "How do you separate multiple classes in HTML?", explanation: "Multiple CSS classes should be separated by a space, not a comma."
  },
  {
    level: 5, house: 3, language: "web", difficulty: "EASY", type: "Code Debugging",
    title: "HTML Image Tag", prompt: "Which line contains the bug?",
    referenceCode: `<img src="logo.png" alt="Logo" />`,
    debugCode: `<img href="logo.png" alt="Logo" />`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "How do you specify the source of an image?", explanation: "Images use the `src` attribute, not `href` (which is for links)."
  },
  {
    level: 6, house: 3, language: "web", difficulty: "EASY", type: "Code Debugging",
    title: "JS Constant Reassignment", prompt: "Which line contains the bug?",
    referenceCode: `let score = 10;\nscore = 20;`,
    debugCode: `const score = 10;\nscore = 20;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Constants cannot be changed.", explanation: "Variables declared with `const` cannot be reassigned."
  },

  // --- HOUSE 4: Easy (Levels 7-9) ---
  {
    level: 7, house: 4, language: "web", difficulty: "EASY", type: "Code Debugging",
    title: "JS Array Length", prompt: "Which line contains the bug?",
    referenceCode: `const arr = [1, 2, 3];\nconsole.log(arr.length);`,
    debugCode: `const arr = [1, 2, 3];\nconsole.log(arr.length());`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Length is a property, not a method.", explanation: "In JavaScript, `length` is a property, so you don't use parentheses."
  },
  {
    level: 8, house: 4, language: "web", difficulty: "EASY", type: "Code Debugging",
    title: "CSS Margin syntax", prompt: "Which line contains the bug?",
    referenceCode: `.box {\n    margin: 10px 20px;\n}`,
    debugCode: `.box {\n    margin: 10px, 20px;\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "No commas needed here.", explanation: "CSS shorthand properties are separated by spaces, not commas."
  },
  {
    level: 9, house: 4, language: "web", difficulty: "EASY", type: "Code Debugging",
    title: "HTML Lists", prompt: "Which line contains the bug?",
    referenceCode: `<ul>\n    <li>Item 1</li>\n    <li>Item 2</li>\n</ul>`,
    debugCode: `<ul>\n    <item>Item 1</item>\n    <item>Item 2</item>\n</ul>`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "What is a list item called?", explanation: "Unordered lists (`<ul>`) must contain List Item (`<li>`) tags, not `<item>`."
  },

  // --- HOUSE 5: Medium (Levels 10-12) ---
  {
    level: 10, house: 5, language: "web", difficulty: "MEDIUM", type: "Code Debugging",
    title: "JS Async/Await", prompt: "Which line contains the bug?",
    referenceCode: `async function getData() {\n    const res = await fetch('/api');\n    return res.json();\n}`,
    debugCode: `function getData() {\n    const res = await fetch('/api');\n    return res.json();\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Where can you use the 'await' keyword?", explanation: "The `await` keyword can only be used inside an `async` function."
  },
  {
    level: 11, house: 5, language: "web", difficulty: "MEDIUM", type: "Code Debugging",
    title: "CSS Flexbox", prompt: "Which line contains the bug?",
    referenceCode: `.container {\n    display: flex;\n    justify-content: center;\n}`,
    debugCode: `.container {\n    display: flex;\n    align-content: center;\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 2,
    hint: "Aligning on the main axis.", explanation: "To center items horizontally in a standard flex row, use `justify-content`, not `align-content`."
  },
  {
    level: 12, house: 5, language: "web", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Form Submission", prompt: "Which line contains the bug?",
    referenceCode: `<form id="myForm">\n    <input type="text" required>\n    <button type="submit">Send</button>\n</form>`,
    debugCode: `<form id="myForm">\n    <input type="text" required>\n    <button type="button">Send</button>\n</form>`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 2,
    hint: "What button type submits a form?", explanation: "A button inside a form must have `type=\"submit\"` to trigger native form submission."
  },

  // --- HOUSE 6: Medium (Levels 13-15) ---
  {
    level: 13, house: 6, language: "web", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Event Listeners", prompt: "Which line contains the bug?",
    referenceCode: `const btn = document.querySelector('.btn');\nbtn.addEventListener('click', (e) => {\n    e.preventDefault();\n});`,
    debugCode: `const btn = document.querySelector('.btn');\nbtn.onClick('click', (e) => {\n    e.preventDefault();\n});`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "There is no onClick method like this.", explanation: "To attach an event listener dynamically, use `addEventListener`."
  },
  {
    level: 14, house: 6, language: "web", difficulty: "MEDIUM", type: "Code Debugging",
    title: "CSS Selectors", prompt: "Which line contains the bug?",
    referenceCode: `ul > li {\n    list-style: none;\n}`,
    debugCode: `ul < li {\n    list-style: none;\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Child combinator direction.", explanation: "The CSS direct child selector is `>`, not `<`."
  },
  {
    level: 15, house: 6, language: "web", difficulty: "MEDIUM", type: "Code Debugging",
    title: "JS JSON Parsing", prompt: "Which line contains the bug?",
    referenceCode: `const str = '{"name":"John"}';\nconst obj = JSON.parse(str);`,
    debugCode: `const str = '{"name":"John"}';\nconst obj = JSON.parseObject(str);`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Check the JSON API.", explanation: "The correct method to parse a JSON string into an object is `JSON.parse()`."
  },

  // --- HOUSE 7: Medium (Levels 16-18) ---
  {
    level: 16, house: 7, language: "web", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Fetch API", prompt: "Which line contains the bug?",
    referenceCode: `fetch('/api/data')\n  .then(res => res.json())\n  .then(data => console.log(data));`,
    debugCode: `fetch('/api/data')\n  .then(res => res.parse())\n  .then(data => console.log(data));`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "How do you extract JSON from a Fetch Response?", explanation: "The Fetch API Response object uses the `.json()` method, not `.parse()`."
  },
  {
    level: 17, house: 7, language: "web", difficulty: "MEDIUM", type: "Code Debugging",
    title: "Arrow Functions & 'this'", prompt: "Which line contains the bug?",
    referenceCode: `const obj = {\n  val: 10,\n  getVal: function() { return this.val; }\n};`,
    debugCode: `const obj = {\n  val: 10,\n  getVal: () => { return this.val; }\n};`,
    answers: ["Line 1", "Line 3", "Line 4", "No error"], answerIndex: 1,
    hint: "Arrow functions don't bind their own 'this'.", explanation: "Arrow functions inherit 'this' from their enclosing scope. A regular function is needed here to access `obj.val`."
  },
  {
    level: 18, house: 7, language: "web", difficulty: "MEDIUM", type: "Code Debugging",
    title: "CSS Pseudo-elements", prompt: "Which line contains the bug?",
    referenceCode: `.box::after {\n    content: "";\n    display: block;\n}`,
    debugCode: `.box::after {\n    text: "";\n    display: block;\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "What property is required for pseudo-elements?", explanation: "Pseudo-elements require the `content` property to render, not `text`."
  },

  // --- HOUSE 8: School / Hard (Levels 19-23) ---
  {
    level: 19, house: 8, language: "web", difficulty: "HARD", type: "Code Debugging",
    title: "JS SetTimeout Closure", prompt: "Which line contains the bug?",
    referenceCode: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}`,
    debugCode: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 0,
    hint: "Variable hoisting and closures.", explanation: "Using `var` means all timeouts share the same function-scoped `i` (prints 3, 3, 3). `let` creates block scope (prints 0, 1, 2)."
  },
  {
    level: 20, house: 8, language: "web", difficulty: "HARD", type: "Code Debugging",
    title: "JS Array Mutation", prompt: "Which line contains the bug?",
    referenceCode: `const items = [1, 2, 3];\nconst doubled = items.map(x => x * 2);`,
    debugCode: `const items = [1, 2, 3];\nconst doubled = items.forEach(x => x * 2);`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Which array method returns a new array?", explanation: "`forEach` returns `undefined`. You must use `map` to return a new modified array."
  },
  {
    level: 21, house: 8, language: "web", difficulty: "HARD", type: "Code Debugging",
    title: "CSS Grid vs Flex", prompt: "Which line contains the bug?",
    referenceCode: `.grid-container {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n}`,
    debugCode: `.grid-container {\n    display: flex;\n    grid-template-columns: 1fr 1fr;\n}`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Grid properties only work on Grids.", explanation: "`grid-template-columns` has no effect on a flexbox container."
  },
  {
    level: 22, house: 8, language: "web", difficulty: "HARD", type: "Code Debugging",
    title: "DOM Insertion", prompt: "Which line contains the bug?",
    referenceCode: `const el = document.createElement("div");\ndocument.body.appendChild(el);`,
    debugCode: `const el = document.createElement("div");\ndocument.body.innerHTML += el;`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "How do you insert an actual DOM node?", explanation: "Adding an Element object to innerHTML coerces it to a string ('[object HTMLDivElement]'). Use `appendChild`."
  },
  {
    level: 23, house: 8, language: "web", difficulty: "HARD", type: "Code Debugging",
    title: "Event Delegation", prompt: "Which line contains the bug?",
    referenceCode: `document.body.addEventListener('click', e => {\n  if (e.target.matches('.btn')) {\n    console.log('Clicked');\n  }\n});`,
    debugCode: `document.body.addEventListener('click', e => {\n  if (e.currentTarget.matches('.btn')) {\n    console.log('Clicked');\n  }\n});`,
    answers: ["Line 1", "Line 2", "Line 3", "No error"], answerIndex: 1,
    hint: "Target vs CurrentTarget.", explanation: "`currentTarget` is the element the listener is attached to (body). `target` is the actual element that was clicked."
  },
  
];



const SPOT_DIFF_BANK = [
  // =========================================================
  // PYTHON - SPOT THE DIFFERENCE (23 Levels)
  // =========================================================
  
  // --- HOUSE 2: Easy (Levels 1-3) ---
  {
    level: 1, house: 2, language: "python", difficulty: "EASY", type: "Spot the Difference",
    title: "Basic Math", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `a = 10\nb = 5\nc = a + b`,
    debugCode: `a = 10\nb = 5\nc = a * b`,
    bugLines: [2], explanation: "The addition operator was changed to multiplication."
  },
  {
    level: 2, house: 2, language: "python", difficulty: "EASY", type: "Spot the Difference",
    title: "List Creation", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `my_list = [1, 2, 3]\nprint(my_list)`,
    debugCode: `my_list = (1, 2, 3)\nprint(my_list)`,
    bugLines: [0], explanation: "Parentheses create a tuple, not a list."
  },
  {
    level: 3, house: 2, language: "python", difficulty: "EASY", type: "Spot the Difference",
    title: "While Loop", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `count = 0\nwhile count < 3:\n    count += 1`,
    debugCode: `count = 0\nwhile count > 3:\n    count += 1`,
    bugLines: [1], explanation: "The loop condition operator is flipped."
  },

  // --- HOUSE 3: Easy (Levels 4-6) ---
  {
    level: 4, house: 3, language: "python", difficulty: "EASY", type: "Spot the Difference",
    title: "String Methods", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `text = "hello"\nbig = text.upper()`,
    debugCode: `text = "hello"\nbig = text.capitalize()`,
    bugLines: [1], explanation: "Used capitalize() instead of upper()."
  },
  {
    level: 5, house: 3, language: "python", difficulty: "EASY", type: "Spot the Difference",
    title: "If/Else", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `if x > 5:\n    print("Big")\nelse:\n    print("Small")`,
    debugCode: `if x > 5:\n    print("Big")\nelif:\n    print("Small")`,
    bugLines: [2], explanation: "Used elif without a condition instead of else."
  },
  {
    level: 6, house: 3, language: "python", difficulty: "EASY", type: "Spot the Difference",
    title: "Dictionary Keys", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `data = {"id": 1}\nprint(data["id"])`,
    debugCode: `data = {"id": 1}\nprint(data[id])`,
    bugLines: [1], explanation: "The dictionary key must be a string."
  },

  // --- HOUSE 4: Easy (Levels 7-9) ---
  {
    level: 7, house: 4, language: "python", difficulty: "EASY", type: "Spot the Difference",
    title: "Boolean Logic", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `if a and b:\n    pass`,
    debugCode: `if a & b:\n    pass`,
    bugLines: [0], explanation: "Use 'and' for logical operations, not bitwise '&'."
  },
  {
    level: 8, house: 4, language: "python", difficulty: "EASY", type: "Spot the Difference",
    title: "Type Casting", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `val = "5"\nnum = int(val)`,
    debugCode: `val = "5"\nnum = Integer(val)`,
    bugLines: [1], explanation: "The cast function is int(), not Integer()."
  },
  {
    level: 9, house: 4, language: "python", difficulty: "EASY", type: "Spot the Difference",
    title: "Length Check", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `arr = []\nsize = len(arr)`,
    debugCode: `arr = []\nsize = arr.length()`,
    bugLines: [1], explanation: "Python uses the len() function, not a .length() method."
  },

  // --- HOUSE 5: Medium (Levels 10-12) ---
  {
    level: 10, house: 5, language: "python", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "File Modes", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `with open("f.txt", "a") as f:\n    f.write("test")`,
    debugCode: `with open("f.txt", "w") as f:\n    f.write("test")`,
    bugLines: [0], explanation: "Mode changed from append ('a') to write ('w')."
  },
  {
    level: 11, house: 5, language: "python", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "List Slicing", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `arr = [1,2,3,4]\nsub = arr[1:3]`,
    debugCode: `arr = [1,2,3,4]\nsub = arr[1,3]`,
    bugLines: [1], explanation: "Slicing uses a colon ':', not a comma ','."
  },
  {
    level: 12, house: 5, language: "python", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Class Init", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `class Dog:\n    def __init__(self):\n        self.bark = True`,
    debugCode: `class Dog:\n    def __init__():\n        self.bark = True`,
    bugLines: [1], explanation: "Missing 'self' parameter in __init__."
  },

  // --- HOUSE 6: Medium (Levels 13-15) ---
  {
    level: 13, house: 6, language: "python", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "List Comprehension", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `res = [x*2 for x in range(5)]`,
    debugCode: `res = [x*2 in range(5)]`,
    bugLines: [0], explanation: "Missing 'for x' in list comprehension syntax."
  },
  {
    level: 14, house: 6, language: "python", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Multiple Assignment", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `a, b = 1, 2\na, b = b, a`,
    debugCode: `a, b = 1\na, b = b, a`,
    bugLines: [0], explanation: "Missing the second value in tuple unpacking."
  },
  {
    level: 15, house: 6, language: "python", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Set Operations", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `s = {1, 2}\ns.add(3)`,
    debugCode: `s = {1, 2}\ns.append(3)`,
    bugLines: [1], explanation: "Sets use .add(), lists use .append()."
  },

  // --- HOUSE 7: Medium (Levels 16-18) ---
  {
    level: 16, house: 7, language: "python", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Kwargs", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `def func(**kwargs):\n    return kwargs.get('id')`,
    debugCode: `def func(*kwargs):\n    return kwargs.get('id')`,
    bugLines: [0], explanation: "Keyword arguments require double asterisks '**'."
  },
  {
    level: 17, house: 7, language: "python", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Inheritance", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `class Child(Parent):\n    def __init__(self):\n        super().__init__()`,
    debugCode: `class Child(Parent):\n    def __init__(self):\n        Parent.__init__()`,
    bugLines: [2], explanation: "super().__init__() is the standard Python 3 way."
  },
  {
    level: 18, house: 7, language: "python", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Exceptions", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `try:\n    run()\nexcept Exception as e:\n    print(e)`,
    debugCode: `try:\n    run()\nexcept Exception, e:\n    print(e)`,
    bugLines: [2], explanation: "Python 3 uses 'as e', not ', e' (Python 2)."
  },

  // --- HOUSE 8: School / Hard (Levels 19-23) ---
  {
    level: 19, house: 8, language: "python", difficulty: "HARD", type: "Spot the Difference",
    title: "Decorators", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `def dec(f):\n    def wrap():\n        return f()\n    return wrap`,
    debugCode: `def dec(f):\n    def wrap():\n        return f()\n    return wrap()`,
    bugLines: [3], explanation: "You must return the function reference, not call it."
  },
  {
    level: 20, house: 8, language: "python", difficulty: "HARD", type: "Spot the Difference",
    title: "Map & Lambda", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `nums = [1, 2]\nres = list(map(lambda x: x*2, nums))`,
    debugCode: `nums = [1, 2]\nres = map(lambda x: x*2, nums)`,
    bugLines: [1], explanation: "map() returns an iterator in Python 3; it must be cast to a list."
  },
  {
    level: 21, house: 8, language: "python", difficulty: "HARD", type: "Spot the Difference",
    title: "String Joining", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `words = ["A", "B"]\ns = "-".join(words)`,
    debugCode: `words = ["A", "B"]\ns = words.join("-")`,
    bugLines: [1], explanation: ".join() is called on the separator string, not the list."
  },
  {
    level: 22, house: 8, language: "python", difficulty: "HARD", type: "Spot the Difference",
    title: "Type Hinting", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `def calc(a: int) -> int:\n    return a * 2`,
    debugCode: `def calc(a: int) : int:\n    return a * 2`,
    bugLines: [0], explanation: "Return type hints use '->', not ':'."
  },
  {
    level: 23, house: 8, language: "python", difficulty: "HARD", type: "Spot the Difference",
    title: "Context Managers", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `class Timer:\n    def __enter__(self): pass\n    def __exit__(self, exc_type, exc_val, exc_tb): pass`,
    debugCode: `class Timer:\n    def __enter__(self): pass\n    def __exit__(self): pass`,
    bugLines: [2], explanation: "__exit__ requires parameters for exception handling."
  },

  // =========================================================
  // C++ - SPOT THE DIFFERENCE (23 Levels)
  // =========================================================
  
  // --- HOUSE 2: Easy (Levels 1-3) ---
  {
    level: 1, house: 2, language: "cpp", difficulty: "EASY", type: "Spot the Difference",
    title: "Basic Structs", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `struct Point {\n    int x;\n    int y;\n};`,
    debugCode: `struct Point {\n    int x\n    int y;\n}`,
    bugLines: [1, 3], explanation: "Missing semicolons after members and at the end of the struct."
  },
  {
    level: 2, house: 2, language: "cpp", difficulty: "EASY", type: "Spot the Difference",
    title: "Output Stream", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `std::cout << "Data" << std::endl;`,
    debugCode: `std::cout >> "Data" >> std::endl;`,
    bugLines: [0], explanation: "The output operator is <<, while >> is used for input (cin)."
  },
  {
    level: 3, house: 2, language: "cpp", difficulty: "EASY", type: "Spot the Difference",
    title: "Function Calls", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `int result = add(5, 10);\nstd::cout << result;`,
    debugCode: `int result = add[5, 10];\nstd::cout << result;`,
    bugLines: [0], explanation: "Functions are called with parentheses (), not square brackets []."
  },

  // --- HOUSE 3: Easy (Levels 4-6) ---
  {
    level: 4, house: 3, language: "cpp", difficulty: "EASY", type: "Spot the Difference",
    title: "Const Variables", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `const int max_size = 100;\nint arr[max_size];`,
    debugCode: `const int max_size;\nmax_size = 100;\nint arr[max_size];`,
    bugLines: [0, 1], explanation: "Const variables must be initialized at the time of declaration."
  },
  {
    level: 5, house: 3, language: "cpp", difficulty: "EASY", type: "Spot the Difference",
    title: "Array Elements", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `int scores[5];\nscores[0] = 100;`,
    debugCode: `int scores(5);\nscores[0] = 100;`,
    bugLines: [0], explanation: "Arrays are declared with square brackets [], not parentheses."
  },
  {
    level: 6, house: 3, language: "cpp", difficulty: "EASY", type: "Spot the Difference",
    title: "String Length", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `std::string name = "BrainByte";\nint len = name.length();`,
    debugCode: `std::string name = "BrainByte";\nint len = length(name);`,
    bugLines: [1], explanation: ".length() is a member function of the string class."
  },

  // --- HOUSE 4: Easy (Levels 7-9) ---
  {
    level: 7, house: 4, language: "cpp", difficulty: "EASY", type: "Spot the Difference",
    title: "If Statement", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `if (x == 10) {\n    x = 0;\n}`,
    debugCode: `if x == 10 then\n    x = 0;\nend`,
    bugLines: [0, 2], explanation: "C++ uses parentheses for conditions and braces for blocks, not 'then'/'end'."
  },
  {
    level: 8, house: 4, language: "cpp", difficulty: "EASY", type: "Spot the Difference",
    title: "Math Library", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `#include <cmath>\ndouble num = std::sqrt(16.0);`,
    debugCode: `#include <math>\ndouble num = std::squareRoot(16.0);`,
    bugLines: [0, 1], explanation: "The modern header is <cmath> and the function is std::sqrt()."
  },
  {
    level: 9, house: 4, language: "cpp", difficulty: "EASY", type: "Spot the Difference",
    title: "While Loop", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `while (count > 0) {\n    count--;\n}`,
    debugCode: `while (count > 0) {\n    count-;\n}`,
    bugLines: [1], explanation: "The decrement operator is double minus (--)."
  },

  // --- HOUSE 5: Medium (Levels 10-12) ---
  {
    level: 10, house: 5, language: "cpp", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Pointer Init", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `int* p = nullptr;\nif (p) { *p = 5; }`,
    debugCode: `int* p = NULL;\nif (p) { *p = 5; }`,
    bugLines: [0], explanation: "nullptr is the modern, type-safe standard in C++11 and later."
  },
  {
    level: 11, house: 5, language: "cpp", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Range-based For", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `std::vector<int> v = {1, 2, 3};\nfor (int& x : v) {\n    x++;\n}`,
    debugCode: `std::vector<int> v = {1, 2, 3};\nfor (int x in v) {\n    x++;\n}`,
    bugLines: [1], explanation: "C++ uses a colon (:) for range-based for loops, not the 'in' keyword."
  },
  {
    level: 12, house: 5, language: "cpp", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Templates", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `template <typename T>\nT add(T a, T b) {\n    return a + b;\n}`,
    debugCode: `template <class T>;\nT add(T a, T b) {\n    return a + b;\n}`,
    bugLines: [0], explanation: "Template declarations do not end with a semicolon."
  },

  // --- HOUSE 6: Medium (Levels 13-15) ---
  {
    level: 13, house: 6, language: "cpp", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Dynamic Cast", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `Base* b = new Derived();\nDerived* d = dynamic_cast<Derived*>(b);`,
    debugCode: `Base* b = new Derived();\nDerived* d = dynamic_cast(Derived*)(b);`,
    bugLines: [1], explanation: "C++ cast operators use angle brackets for the type, e.g., <Derived*>."
  },
  {
    level: 14, house: 6, language: "cpp", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Class Constructor", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `class Robot {\npublic:\n    Robot(int id) : _id(id) {}\n};`,
    debugCode: `class Robot {\npublic:\n    void Robot(int id) : _id(id) {}\n};`,
    bugLines: [2], explanation: "Constructors do not have return types, not even void."
  },
  {
    level: 15, house: 6, language: "cpp", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Vectors vs Arrays", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `std::vector<int> v;\nv.push_back(10);`,
    debugCode: `std::vector<int> v;\nv.add(10);`,
    bugLines: [1], explanation: "C++ vectors use push_back(), not add()."
  },

  // --- HOUSE 7: Medium (Levels 16-18) ---
  {
    level: 16, house: 7, language: "cpp", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Smart Pointers", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `#include <memory>\nstd::unique_ptr<int> p = std::make_unique<int>(5);`,
    debugCode: `#include <memory>\nstd::unique_ptr<int> p = new int(5);`,
    bugLines: [1], explanation: "It is best practice (and safer) to use std::make_unique rather than raw 'new'."
  },
  {
    level: 17, house: 7, language: "cpp", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Lambda Functions", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `int val = 10;\nauto f = [val]() { return val * 2; };`,
    debugCode: `int val = 10;\nauto f = () { return val * 2; };`,
    bugLines: [1], explanation: "Lambdas in C++ require a capture block [] to access outside variables."
  },
  {
    level: 18, house: 7, language: "cpp", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Struct Padding", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `struct Data {\n    char c;\n    int i;\n};\n// size is likely 8`,
    debugCode: `struct Data {\n    int i;\n    char c;\n}\n// size is likely 8`,
    bugLines: [3], explanation: "Missing a semicolon at the end of the struct declaration."
  },

  // --- HOUSE 8: School / Hard (Levels 19-23) ---
  {
    level: 19, house: 8, language: "cpp", difficulty: "HARD", type: "Spot the Difference",
    title: "Move Semantics", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `std::string a = "test";\nstd::string b = std::move(a);\n// a is now empty`,
    debugCode: `std::string a = "test";\nstd::string b = a.move();\n// a is now empty`,
    bugLines: [1], explanation: "Move is a standard library function (std::move), not a member function."
  },
  {
    level: 20, house: 8, language: "cpp", difficulty: "HARD", type: "Spot the Difference",
    title: "Thread Creation", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `#include <thread>\nvoid task() {}\nstd::thread t(task);\nt.join();`,
    debugCode: `#include <thread>\nvoid task() {}\nstd::thread t = new std::thread(task);\nt.join();`,
    bugLines: [2], explanation: "Threads are typically created on the stack. 'new' returns a pointer."
  },
  {
    level: 21, house: 8, language: "cpp", difficulty: "HARD", type: "Spot the Difference",
    title: "Mutex Locking", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `std::mutex m;\n{\n    std::lock_guard<std::mutex> lock(m);\n    // safe\n}`,
    debugCode: `std::mutex m;\n{\n    m.lock_guard();\n    // safe\n}`,
    bugLines: [2], explanation: "lock_guard is a separate RAII wrapper object, not a method on the mutex."
  },
  {
    level: 22, house: 8, language: "cpp", difficulty: "HARD", type: "Spot the Difference",
    title: "Constexpr Variables", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `constexpr int square(int x) {\n    return x * x;\n}\nconstexpr int y = square(5);`,
    debugCode: `const int square(int x) {\n    return x * x;\n}\nconstexpr int y = square(5);`,
    bugLines: [0], explanation: "A function must be declared constexpr to be evaluated at compile time for a constexpr variable."
  },
  {
    level: 23, house: 8, language: "cpp", difficulty: "HARD", type: "Spot the Difference",
    title: "Rule of Three/Five", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `class C {\npublic:\n    ~C();\n    C(const C&);\n    C& operator=(const C&);\n};`,
    debugCode: `class C {\npublic:\n    void ~C();\n    C(const C);\n    C& operator==(const C&);\n};`,
    bugLines: [2, 3, 4], explanation: "Destructors don't have return types. Copy constructor takes a reference. Assignment is operator=, not operator==."
  },

  // =========================================================
  // JAVA - SPOT THE DIFFERENCE (23 Levels)
  // =========================================================
  
  // --- HOUSE 2: Easy (Levels 1-3) ---
  {
    level: 1, house: 2, language: "java", difficulty: "EASY", type: "Spot the Difference",
    title: "Constructor Mixup", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `public class User {\n    private String name;\n    public User(String name) {\n        this.name = name;\n    }\n}`,
    debugCode: `public class User {\n    private String name;\n    public void User(String n) {\n        name = name;\n    }\n}`,
    bugLines: [2, 3], explanation: "Constructors cannot have a return type (void), and assigning name to itself does nothing."
  },
  {
    level: 2, house: 2, language: "java", difficulty: "EASY", type: "Spot the Difference",
    title: "Method Signature", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `public int calculateArea(int w, int h) {\n    return w * h;\n}`,
    debugCode: `public void calculateArea(int w, int h) {\n    return w * h;\n}`,
    bugLines: [0], explanation: "Method returns a value, so the return type must be int, not void."
  },
  {
    level: 3, house: 2, language: "java", difficulty: "EASY", type: "Spot the Difference",
    title: "Variable Declaration", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `int number = 10;\nSystem.out.println(number);`,
    debugCode: `var number = 10;\nSystem.out.println(number);`,
    bugLines: [0], explanation: "While `var` exists in modern Java, strict explicit typing (`int`) is preferred in this context."
  },

  // --- HOUSE 3: Easy (Levels 4-6) ---
  {
    level: 4, house: 3, language: "java", difficulty: "EASY", type: "Spot the Difference",
    title: "String Initialization", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `String greeting = "Hello World";`,
    debugCode: `String greeting = 'Hello World';`,
    bugLines: [0], explanation: "Java requires double quotes for Strings. Single quotes are for chars."
  },
  {
    level: 5, house: 3, language: "java", difficulty: "EASY", type: "Spot the Difference",
    title: "Boolean values", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `boolean isActive = true;`,
    debugCode: `boolean isActive = True;`,
    bugLines: [0], explanation: "Boolean literals in Java are strictly lowercase (true/false)."
  },
  {
    level: 6, house: 3, language: "java", difficulty: "EASY", type: "Spot the Difference",
    title: "For Loop Syntax", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}`,
    debugCode: `for (int i = 0, i < 5, i++) {\n    System.out.println(i);\n}`,
    bugLines: [0], explanation: "For loop parameters are separated by semicolons, not commas."
  },

  // --- HOUSE 4: Easy (Levels 7-9) ---
  {
    level: 7, house: 4, language: "java", difficulty: "EASY", type: "Spot the Difference",
    title: "Class Instantiation", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `Car myCar = new Car();`,
    debugCode: `Car myCar = Car();`,
    bugLines: [0], explanation: "The `new` keyword is required to instantiate an object."
  },
  {
    level: 8, house: 4, language: "java", difficulty: "EASY", type: "Spot the Difference",
    title: "Main Method", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `public static void main(String[] args) {}`,
    debugCode: `public static void main(string[] args) {}`,
    bugLines: [0], explanation: "The String class must be capitalized in Java."
  },
  {
    level: 9, house: 4, language: "java", difficulty: "EASY", type: "Spot the Difference",
    title: "Array Access", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `int[] arr = {1, 2, 3};\nint first = arr[0];`,
    debugCode: `int[] arr = {1, 2, 3};\nint first = arr.get(0);`,
    bugLines: [1], explanation: "Standard arrays use bracket notation. `.get()` is for ArrayLists."
  },

  // --- HOUSE 5: Medium (Levels 10-12) ---
  {
    level: 10, house: 5, language: "java", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "List Initialization", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `List<String> list = new ArrayList<>();\nlist.add("Apple");\nint count = list.size();`,
    debugCode: `List<String> list = new List<>();\nlist.push("Apple");\nint count = list.length;`,
    bugLines: [0, 1, 2], explanation: "List is an interface. You add with .add(), and size is a method .size()."
  },
  {
    level: 11, house: 5, language: "java", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Exception Handling", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `try {\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    e.printStackTrace();\n}`,
    debugCode: `try {\n    int result = 10 / 0;\n} catch (Exception e) {\n    e.printStackTrace();\n} catch (ArithmeticException e) {\n}`,
    bugLines: [2, 4], explanation: "Catching a general Exception first hides specific exceptions."
  },
  {
    level: 12, house: 5, language: "java", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Static Context", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `public class App {\n    int count = 0;\n    public void run() {\n        count++;\n    }\n}`,
    debugCode: `public class app {\n    int count = 0;\n    public static void run() {\n        count++;\n    }\n}`,
    bugLines: [0, 2], explanation: "Class should be capitalized. A static method cannot access non-static instance variables."
  },

  // --- HOUSE 6: Medium (Levels 13-15) ---
  {
    level: 13, house: 6, language: "java", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Map Iteration", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `Map<String, Integer> map = new HashMap<>();\nfor (Map.Entry<String, Integer> entry : map.entrySet()) {\n    System.out.println(entry.getKey());\n}`,
    debugCode: `Map<String, Integer> map = new HashMap<>();\nfor (String entry : map) {\n    System.out.println(entry);\n}`,
    bugLines: [1, 2], explanation: "You must use .entrySet(), .keySet(), or .values() to iterate a Map."
  },
  {
    level: 14, house: 6, language: "java", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "String Immutability", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `String s = "hello";\ns = s.toUpperCase();`,
    debugCode: `String s = "hello";\ns.toUpperCase();`,
    bugLines: [1], explanation: "Strings are immutable. Calling .toUpperCase() returns a new String that must be assigned."
  },
  {
    level: 15, house: 6, language: "java", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Wrapper Class Comparison", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `Integer a = 1000;\nInteger b = 1000;\nboolean same = a.equals(b);`,
    debugCode: `Integer a = 1000;\nInteger b = 1000;\nboolean same = (a == b);`,
    bugLines: [2], explanation: "Integer wrapper objects above 127 must be compared using .equals()."
  },

  // --- HOUSE 7: Medium (Levels 16-18) ---
  {
    level: 16, house: 7, language: "java", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Access Modifiers", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `class Data {\n    private int value;\n    public int getValue() { return value; }\n}`,
    debugCode: `class Data {\n    protected int value;\n    private int getValue() { return value; }\n}`,
    bugLines: [1, 2], explanation: "Getters should be public, and private fields are preferred for encapsulation."
  },
  {
    level: 17, house: 7, language: "java", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Abstract Classes", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `abstract class Shape {\n    abstract void draw();\n}`,
    debugCode: `abstract class Shape {\n    void draw();\n}`,
    bugLines: [1], explanation: "Methods without a body in abstract classes must use the `abstract` keyword."
  },
  {
    level: 18, house: 7, language: "java", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Scanner Usage", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `Scanner sc = new Scanner(System.in);\nString input = sc.nextLine();`,
    debugCode: `Scanner sc = new Scanner(System.out);\nString input = sc.readString();`,
    bugLines: [0, 1], explanation: "Scanner reads from System.in, and the method is nextLine(), not readString()."
  },

  // --- HOUSE 8: School / Hard (Levels 19-23) ---
  {
    level: 19, house: 8, language: "java", difficulty: "HARD", type: "Spot the Difference",
    title: "File Reading", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {\n    String line = br.readLine();\n} catch (IOException e) {}`,
    debugCode: `try (BufferedReader br = new BufferedReader("file.txt")) {\n    String line = br.read();\n} catch (Exception e) {}`,
    bugLines: [0, 1], explanation: "BufferedReader requires a Reader (like FileReader), and readLine() gets strings."
  },
  {
    level: 20, house: 8, language: "java", difficulty: "HARD", type: "Spot the Difference",
    title: "Thread Interface", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `class Task implements Runnable {\n    public void run() { }\n}`,
    debugCode: `class Task extends Runnable {\n    public void start() { }\n}`,
    bugLines: [0, 1], explanation: "Runnable is an interface (implements), and requires the run() method."
  },
  {
    level: 21, house: 8, language: "java", difficulty: "HARD", type: "Spot the Difference",
    title: "List RemoveIf", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `List<String> items = new ArrayList<>();\nitems.removeIf(s -> s.isEmpty());`,
    debugCode: `List<String> items = new ArrayList<>();\nitems.remove(s -> s.isEmpty());`,
    bugLines: [1], explanation: "Lambda-based conditional removal requires .removeIf(), not .remove()."
  },
  {
    level: 22, house: 8, language: "java", difficulty: "HARD", type: "Spot the Difference",
    title: "Generics Bounds", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `public <T extends Number> void process(T num) {\n    System.out.println(num.intValue());\n}`,
    debugCode: `public <T implements Number> void process(T num) {\n    System.out.println(num.toInt());\n}`,
    bugLines: [0, 1], explanation: "Generics use 'extends' for boundaries. The method is .intValue()."
  },
  {
    level: 23, house: 8, language: "java", difficulty: "HARD", type: "Spot the Difference",
    title: "Stream API", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `List<String> res = list.stream()\n    .filter(s -> s.length() > 5)\n    .collect(Collectors.toList());`,
    debugCode: `List<String> res = list.stream()\n    .map(s -> s.length() > 5)\n    .toList();`,
    bugLines: [1, 2], explanation: ".map() transforms values, .filter() removes them. .toList() is only in very modern Java; standard is Collectors.toList()."
  },

  // =========================================================
  // WEB (HTML/CSS/JS) - SPOT THE DIFFERENCE (23 Levels)
  // =========================================================
  
  // --- HOUSE 2: Easy (Levels 1-3) ---
  {
    level: 1, house: 2, language: "web", difficulty: "EASY", type: "Spot the Difference",
    title: "HTML Tags", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `<div>\n    <p>Text</p>\n</div>`,
    debugCode: `<div>\n    <text>Text</text>\n</div>`,
    bugLines: [1], explanation: "There is no <text> tag in standard HTML. Use <p>."
  },
  {
    level: 2, house: 2, language: "web", difficulty: "EASY", type: "Spot the Difference",
    title: "CSS Classes", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `.header {\n    font-size: 20px;\n}`,
    debugCode: `#header {\n    font-size: 20px;\n}`,
    bugLines: [0], explanation: "A period (.) is used for classes, a hash (#) is for IDs."
  },
  {
    level: 3, house: 2, language: "web", difficulty: "EASY", type: "Spot the Difference",
    title: "JS Let vs Const", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `let score = 10;\nscore = 15;`,
    debugCode: `const score = 10;\nscore = 15;`,
    bugLines: [0], explanation: "Constants cannot be reassigned; 'let' must be used."
  },

  // --- HOUSE 3: Easy (Levels 4-6) ---
  {
    level: 4, house: 3, language: "web", difficulty: "EASY", type: "Spot the Difference",
    title: "HTML Attributes", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `<a href="page.html">Link</a>`,
    debugCode: `<a src="page.html">Link</a>`,
    bugLines: [0], explanation: "Anchor tags (<a>) use 'href', not 'src'."
  },
  {
    level: 5, house: 3, language: "web", difficulty: "EASY", type: "Spot the Difference",
    title: "CSS Display", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `.hidden {\n    display: none;\n}`,
    debugCode: `.hidden {\n    visibility: hidden;\n}`,
    bugLines: [1], explanation: "visibility: hidden leaves the element taking up space. display: none removes it entirely."
  },
  {
    level: 6, house: 3, language: "web", difficulty: "EASY", type: "Spot the Difference",
    title: "JS Strings", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `const name = "Bob";\nconsole.log(\`Hi \${name}\`);`,
    debugCode: `const name = "Bob";\nconsole.log('Hi \${name}');`,
    bugLines: [1], explanation: "String interpolation requires backticks (\`), not single quotes."
  },

  // --- HOUSE 4: Easy (Levels 7-9) ---
  {
    level: 7, house: 4, language: "web", difficulty: "EASY", type: "Spot the Difference",
    title: "HTML Input", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `<input type="checkbox" checked />`,
    debugCode: `<input type="check" selected />`,
    bugLines: [0], explanation: "The correct type is 'checkbox', and the attribute is 'checked'."
  },
  {
    level: 8, house: 4, language: "web", difficulty: "EASY", type: "Spot the Difference",
    title: "CSS Colors", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `body {\n    background-color: #fff;\n}`,
    debugCode: `body {\n    background-color: #ffff;\n}`,
    bugLines: [1], explanation: "Hex codes are 3 or 6 characters long (or 4/8 with alpha). #ffff is invalid."
  },
  {
    level: 9, house: 4, language: "web", difficulty: "EASY", type: "Spot the Difference",
    title: "JS Array Methods", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `const arr = [1, 2];\narr.push(3);`,
    debugCode: `const arr = [1, 2];\narr.add(3);`,
    bugLines: [1], explanation: "JavaScript arrays use .push() to add elements, not .add()."
  },

  // --- HOUSE 5: Medium (Levels 10-12) ---
  {
    level: 10, house: 5, language: "web", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Form Submission", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `<form id="myForm">\n    <input type="text" required>\n    <button type="submit">Send</button>\n</form>`,
    debugCode: `<form id="myForm">\n    <input type="text" validate>\n    <button type="button">Send</button>\n</form>`,
    bugLines: [1, 2], explanation: "The attribute is 'required', and forms need a 'submit' button."
  },
  {
    level: 11, house: 5, language: "web", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Flexbox CSS", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `.container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}`,
    debugCode: `.container {\n    display: block;\n    align-content: center;\n    align-items: center;\n}`,
    bugLines: [1, 2], explanation: "Display must be flex, and justify-content handles the main axis."
  },
  {
    level: 12, house: 5, language: "web", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "DOM Query", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `const els = document.querySelectorAll('.card');\nels.forEach(el => el.hide());`,
    debugCode: `const els = document.getElementsByClassName('.card');\nels.forEach(el => el.hide());`,
    bugLines: [0, 1], explanation: "getElementsByClassName doesn't use '.' and returns an HTMLCollection which doesn't have .forEach()."
  },

  // --- HOUSE 6: Medium (Levels 13-15) ---
  {
    level: 13, house: 6, language: "web", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Event Listeners", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `document.querySelectorAll('.btn').forEach(btn => {\n    btn.addEventListener('click', (e) => {\n        e.preventDefault();\n    });\n});`,
    debugCode: `document.querySelector('.btn').forEach(btn => {\n    btn.onClick('click', (e) => {\n        e.stopDefault();\n    });\n});`,
    bugLines: [0, 1, 2], explanation: "querySelector returns one element. Use addEventListener and preventDefault."
  },
  {
    level: 14, house: 6, language: "web", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Fetch API", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `fetch('/data.json')\n    .then(res => res.json())\n    .then(data => console.log(data))\n    .catch(err => console.error(err));`,
    debugCode: `fetch('/data.json')\n    .then(res => res.parse())\n    .then(data => console.log(data))\n    .error(err => console.error(err));`,
    bugLines: [1, 3], explanation: "Response uses .json(), and promise chains use .catch() instead of .error()."
  },
  {
    level: 15, house: 6, language: "web", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "CSS Selectors", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `ul > li {\n    list-style: none;\n}\n.active::after {\n    content: "";\n}`,
    debugCode: `ul < li {\n    list-style: none;\n}\n.active:after {\n    text: "";\n}`,
    bugLines: [0, 4], explanation: "The child selector is '>', and pseudo-elements use the 'content' property."
  },

  // --- HOUSE 7: Medium (Levels 16-18) ---
  {
    level: 16, house: 7, language: "web", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Dataset Attributes", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `<div data-id="123" id="item"></div>\n<script>\nlet id = document.getElementById("item").dataset.id;\n</script>`,
    debugCode: `<div data-id="123" id="item"></div>\n<script>\nlet id = document.getElementById("item").getAttribute("dataset-id");\n</script>`,
    bugLines: [2], explanation: "To read data-* attributes, use .dataset.id or .getAttribute('data-id')."
  },
  {
    level: 17, house: 7, language: "web", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "CSS Positions", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `.modal {\n    position: fixed;\n    top: 50%;\n    transform: translateY(-50%);\n}`,
    debugCode: `.modal {\n    position: absolute;\n    top: 50%;\n    margin-top: -50%;\n}`,
    bugLines: [1, 3], explanation: "Fixed positions it relative to the viewport. Percentages in margin refer to parent width, not self height."
  },
  {
    level: 18, house: 7, language: "web", difficulty: "MEDIUM", type: "Spot the Difference",
    title: "Array Reduce", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `const sum = [1, 2, 3].reduce((acc, curr) => acc + curr, 0);`,
    debugCode: `const sum = [1, 2, 3].reduce((acc, curr) => acc += curr);`,
    bugLines: [0], explanation: "Reduce should return the new accumulator value, and providing an initial value is safer."
  },

  // --- HOUSE 8: School / Hard (Levels 19-23) ---
  {
    level: 19, house: 8, language: "web", difficulty: "HARD", type: "Spot the Difference",
    title: "Async Await Issues", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `async function load() {\n    const data = await fetch('/api');\n    return await data.json();\n}`,
    debugCode: `function load() {\n    const data = await fetch('/api');\n    return data.json();\n}`,
    bugLines: [0, 2], explanation: "You must declare the function as async to use await inside it."
  },
  {
    level: 20, house: 8, language: "web", difficulty: "HARD", type: "Spot the Difference",
    title: "CSS Grid Areas", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `.layout {\n    display: grid;\n    grid-template-areas: "header header"\n                         "nav main";\n}`,
    debugCode: `.layout {\n    display: grid;\n    grid-template-areas: header header\n                         nav main;\n}`,
    bugLines: [2, 3], explanation: "Grid template areas must be wrapped in quotation marks per row."
  },
  {
    level: 21, house: 8, language: "web", difficulty: "HARD", type: "Spot the Difference",
    title: "Event Delegation", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `document.body.addEventListener('click', e => {\n    if (e.target.matches('.btn')) {\n        handleClick();\n    }\n});`,
    debugCode: `document.body.addEventListener('click', e => {\n    if (e.currentTarget.matches('.btn')) {\n        handleClick();\n    }\n});`,
    bugLines: [1], explanation: "currentTarget refers to the body. You want e.target to check the clicked element."
  },
  {
    level: 22, house: 8, language: "web", difficulty: "HARD", type: "Spot the Difference",
    title: "Class Methods", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `class Widget {\n    constructor() { this.val = 1; }\n    render() { return this.val; }\n}`,
    debugCode: `class Widget {\n    constructor() { this.val = 1; }\n    function render() { return this.val; }\n}`,
    bugLines: [2], explanation: "Class methods in ES6 do not use the 'function' keyword."
  },
  {
    level: 23, house: 8, language: "web", difficulty: "HARD", type: "Spot the Difference",
    title: "DOM Node Creation", prompt: "Click the lines in the Debugging Code with errors.",
    referenceCode: `const div = document.createElement('div');\ndiv.textContent = 'Hello';\ndocument.body.appendChild(div);`,
    debugCode: `const div = document.createNode('div');\ndiv.innerHTML = 'Hello';\ndocument.body.appendNode(div);`,
    bugLines: [0, 2], explanation: "The correct methods are createElement and appendChild."
  }
];