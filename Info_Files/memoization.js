// Memoization ensures that a function doesn't run for the same inputs more than once by keeping a record 
// of the results for the given inputs (ususually in an object). 

// For example, a simple recursive function for computing the nth Fibonacci number: 

function fib(n) {
    if (n < 0) {
      throw new Error(
        'Index was negative. No such thing as a negative index in a series.');
    }
  
    // Base cases
    if (n === 0 || n === 1) {
      return n;
    }
  
    console.log(`computing fib(${n})`);
    return fib(n - 1) + fib(n - 2);
};

// Will run on the same inputs multiple times:

// fib(5)
// computing fib(5)
// computing fib(4)
// computing fib(3)
// computing fib(2)
// computing fib(2)
// computing fib(3)
// computing fib(2)
// 5

// To avoid the duplicate work caused by the branching, we can wrap the function in a class that stores an
// instance property, memo, that maps inputs to outputs. Then we simply:
    // 1) check memo to see if we can avoid computing the answer for any given input, and
    // 2) save the results of any calculations to memo.

class Fibber {
    constructor() {
        this.memo = {};
    }
    
    fib(n) {
        if (n < 0) {
        throw new Error('Index was negative. No such thing as a negative index in a series.');
    
        // Base cases
        } else if (n === 0 || n === 1) {
        return n;
        }
    
        // See if we've already calculated this
        if (this.memo.hasOwnProperty(n)) {
        console.log(`grabbing memo[${n}]`);
        return this.memo[n];
        }
    
        console.log(`computing fib(${n})`);
        const result = this.fib(n - 1) + this.fib(n - 2);
    
        // Memoize
        this.memo[n] = result;
    
        return result;
    }
};

// We save a bunch of calls by checking the memo:

// new Fibber().fib(5)
// computing fib(5)
// computing fib(4)
// computing fib(3)
// computing fib(2)
// grabbing memo[2]
// grabbing memo[3]
// 5

// Memoization is a common strategy for dynamic programming problems, which are problems where the solution
// is composed of solutions to the same problem with smaller inputs (as with the Fibonacci problem, above).
// The other common strategy for dynamic programming problems is going bottom-up, which is usually cleaner
// and often more efficient. 