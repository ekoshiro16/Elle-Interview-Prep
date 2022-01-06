// PROMPT: 

// Given an array of integers, find the highest product you can get from three of the integers. 

// The input arrayOfInts will always have at least three integers.

// ******************************************************************************************************

// FURTHER QUESTIONS:

// Does your function work with negative numbers? If arrayOfInts is [-10, -10, 1, 3, 2] we should return 300
// (which we get by taking -10 * -10 * 3).

// We can do this in O(n) time and O(1) space.

// BREAKDOWN: 

// To brute force an answer we could iterate through arrayOfInts and multiply each integer by each other
// integer, and then multiply that product by each other OTHER integer. This would probably involve nesting
// 3 loops. But that would be an O(n^3) runtime - we can definitely do better than that.

// Because any integer in the array could potentially be part of the greatest product of three integers, we 
// must at least look at each integer. So we're doomed to spend at least O(n) time. 

// Sorting the array would let us grab the highest numbers quickly, so it might be a good first step.
// Sorting takes O(n log n) time. That's better than the O(n^3) time our brute force approach required, but 
// we can still do better. 

// Since we know we must spend at least O(n) time, let's see if we can solve it in exactly O(n) time. 

// A great way to get O(n) runtime is to use a greedy approach - how can we keep track of the highestProductOf3
// " so far" As we do just one walk through the array? 

// Put differently, for each new current number during our iteration, how do we know if it gives us a new 
// highestProductOf3? 

// We have a new highestProductOf3 if the current number times two other numbers gives a product that's 
// higher than our current highestProductOf3. What must we keep track of at each step so that we know if the 
// current number times two other numbers gives us a new highestProductOf3. 

// Our first guess might be:
    // 1) our current highestProductOf3
    // 2) the threeNumbersWhichGiveHighestProduct

// But consider this example:

const arrayOfInts = [1, 10, -5, 1, -100]; 

// Right before we hit -100 (so, in our second-to-last iteration), our highestProductOf3 was 10, and the 
// threeNumbersWhichGiveHighestProduct were [10, 1, 1]. But once we hit -100, suddenly we can take -100 * -5
// *10 to get 5000. So we should have "hold on to" that -5, even though it wasn't one of the threeNumbersWhichGiveHighestProduct.

// We need something a little smarter than threeNumbersWhichGiveHighestProduct. What should we keep track of
// to make sure we can handle a case like this? 

// There are at least 2 great answers:
    // 1) Keep track of the highest2 and lowest2 (most negative) numbers. If the current number times some
    // combination of those is higher than the current highestProductOf3, we have a new highestProductOf3!

    // 2) Keep track of the highestProductOf2 and lowestProductOf2 (could be a low negative number). If the 
    // current number times one of those is higher than the current highestProductOf3, we have a new 
    // highestProductOf3! 

// We'll go with option #2. It ends up being just slightly cleaner than (1), though they both work just fine. 

// How do we keep track of the higehstProductOf2 and lowestProductOf2 at each iteration? (Hint: We may need
// to also keep track of something else). 

// Well, we should also keep track of the lowest number and highest number. If the current number times the
// current highest - or the current lowest, if current is negative - is greater than the current highestProductOf2,
// we have a new highestProductOf2. Same for lowestProductOf2. 

// So at each iteration we're keeping track of and updating:

    // * highestProductOf3
    // * highestProductOf2
    // * highest
    // * lowestProductOf2
    // * lowest 

// Can you implement this in code? But be careful - make sure you update each of these variables in the right
// order, otherwise you might end up e.g. multiplying the current number by itself to get a new highestProductOf2.

// SOLUTION:

// We use a greedy approach to solve the problem in one pass. At each iteration we keep track of: 

    // * highestProductOf3
    // * highestProductOf2
    // * highest
    // * lowestProductOf2
    // * lowest 

// When we reach the end, the highestProductOf3 is our answer. We maintain the others because they're 
// necessary for keeping the highestProductOf3 up to date as we walk through the array. At each iteration,
// the highestProductOf3 is the highest of:

    // 1) the current highestProductOf3
    // 2) current * highestPRoductOf2 
    // 3) current * lowestProductOf2 (if current and lowestProductOf2 are both low negative numbers, this 
    // product is a high positive number)

function highestProductOf3(arrayOfInts) {
    if (arrayOfInts.length < 3) {
        console.error('Less than 3 items!'); 
    };

    // We're going to start at the 3rd item (at index 2). So first we pre-populate highest and lowest based
    // on the first 2 items. We could also start these as null and check below if they're set but this is 
    // arguably cleaner. 
    let highest = Math.max(arrayOfInts[0], arrayOfInts[1]); 
    let lowest = Math.min(arrayOfInts[0], arrayOfInts[1]); 

    let highestProductOf2 = arrayOfInts[0] * arrayOfInts[1];
    let lowestProductOf2 = arrayOfInts[0] * arrayOfInts[1]; 

    // Except for the highestProductOf3. We pre-populate this variable for the first 3 items of our array. 
    // This means that in our first pass it'll check against itself, which is fine. 
    let highestProductOf3 = arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2]; 

    // Iterate through our array. starting at index 2
    for (let i = 0; i < arrayOfInts.length; i++) {
        const current = arrayOfInts[i]; 

        // Ask ourselves: Do we have a new highestProductOf3? 
        // It's either the current highest, the current times the highest product of 2, or the current times
        // the lowest product of 2. 
        highestProductOf3 = Math.max(
            highestProductOf3,
            current * highestProductOf2,
            current * lowestProductOf2 
        );

        // Do we have a new lowest product of 2?
        lowestProductOf2 = Math.min(
            lowestProductOf2,
            current * highest,
            current * lowest
        ); 

        // Do we have a new highest? 
        highest = Math.max(highest, current); 

        // Do we have a new lowest? 
        lowest = Math.min(lowest, current); 
    }

    return highestProductOf3; 
};

// COMPLEXITY 
// O(n) time and O(1) additional space 

// BONUS 
    // 1) What if we wanted the highest product of 4 items?
    // 2) What if we wanted the highest product of k items? 
    // 3) If our highest product is really big, it could overflow. How should we protect against this? 

// WHAT WE LEARNED

// With greedy algorithms, we ask ourselves: "Suppose we could come up with the answer in one pass through
// the input, by simply updating the 'best answer so far' as we go. What additional values would we need to
// keep updated as we looked at each item in our set, in order to be able to update the 'best answer so far' 
// in constant time?"
