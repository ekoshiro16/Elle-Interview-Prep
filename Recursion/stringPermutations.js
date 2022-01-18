// PROMPT:

// Write a recursive function for generating all permutations of an input string. Return them as a set. 

// Don't worry about time or space complexity - if we wanted efficiency we'd write an iterative version of this
// function.

// To start, assume every character in the input string is unique. 

// Your function can have loops - if just needs to also be recursive.

// BREAKDOWN:

// Let's break the problem into subproblems. How could we re-phrase the problem of getting all permutations 
// for "cats" in terms of a smaller but similar subproblem. 

// Let's make our subproblems be getting all permutations for all characters except the last one. If we had
// all permutations for "cat", how could we use that to generate all permutations for "cats"?

// Well, we could put the 's' in 'cats' in each possible position for each possible permutation of 'cat'!

// These are our permutations of "cat":

    // * cat
    // * cta
    // * atc
    // * act 
    // * tac
    // * tca 

// For each of them, we add "s" in each possible position. So for "cat":

    // * cat
        // * scat
        // * csat
        // * cast 
        // * cats

// And for "cta":

    // * scta
    // * csta
    // * ctsa
    // * ctas

// And so on. 

// Now that we can break the problem into subproblems, we just need a base case and we have a recursive algorithm.

// SOLUTION:

// If we're making all permutations for "cat", we can take all permutations for "ca" and then put "t" in each
// possible position in each of those permutations. We use this approach recursively:

function getPermutations(str) {
    // Base Case
    if (str.length <= 1) {
        return new Set([str]);
    };

    const allCharsExceptLast = str.slice(0, -1); 
    const lastChar = str[str.length - 1]; 

    // Recursive call: get all possible permutations for all chars except last 
    const permutationsOfAllCharsExceptLast = getPermutations(allCharsExceptLast); 

    // Put the last char in all possible positions for each of the above permutations 
    const permutations = new Set(); 

    permutationsOfAllCharsExceptLast.forEach((permutationOfAllCharsExceptLast) => {
        for (let position = 0; position <= allCharsExceptLast.length; position++) {
            const permutation = permutationOfAllCharsExceptLast.slice(0, position) + lastChar + permutationOfAllCharsExceptLast.slice(position);
            permutations.add(permutation);
        };
    });

    return permutations; 
};

// BONUS:

// How does the problem change if the string can have duplicate characters? 

// What if we wanted to bring down the time and/or space costs? 

// TAKEAWAYS:

// This is a problem where working through an example with a sample input is HUGE. Sometimes it helps to think
// of algorithm design as a two-part process: first figure out how you would solve the problem "by hand," as 
// though the input was a stack of paper on a desk in front of you. Then translate that process into code. 