function f1 () {
    console.log("hej");
}

const a = [1,2].map(x => x * 2); // returnerar 1 `* 2 och 2 * 2 i en array. Eller gångar alla elemnent med 2

console.log(a);

//MAP - Returnerar en ny array (transformerad).  


{
 const a = [1.1, 1.2,4.5].map(x => Math.floor(x))
 console.log(a) // returnerar array med 1 1 4
}

// Filter 
// Returnerar en ny array med ett urval av tidigare array. 

{
    const a1 = [1.1,1.2,4.5]
 const a2 = [1.1, 1.2,4.5].filter(Math.floor)
 console.log(a2) // returnerar array med 1 1 4
}

// FIND
// Anropar callback funktionen för varje element och returnerar första som är true annars undefind

{
    const b1 = [1.1,1.2,4.5];
}

//FINDINDEX
// Anropar callback funktionen för varje element och returnerar INDEX
//  för första som är true annars -1


// reduce 
// 
console.log("Reduce under här")
{

    function s (x , y) {return x + y };

    const b4 = [1,2,3,4,5,6,7,8].reduce((acc, current) => {
        return acc + current;
    }, 0);
    console.log(b4)
}

const sumOfAllIds = disciplines.reduce((acc, current) => {
    const idCurrent = current.id;
    return acc + idCurrent;
}, 0)

const sumOfAllFactors = disciplines.reduce((acc, current) => {
    let sumFactors = 0;
    for (let key in current.skillFactors) sumFactors += current.skillFactors[key];
    return acc + sumFactors;
}, 0)



console.log("Här slutar reduce")



for (let discipline of disciplines) {
    if (discipline.skillFactors.S01 < 20) continue
    console.log(discipline.name, discipline.skillFactors.S01) 

    disciplines.forEach(x => {
        if (x.skillFactors.S01 > 20) {
            console.log(x.name, x.skillFactors.S01)
        } 
    })
}

disciplines.forEach()





// reduce REDUCE reduce REDUCE reduce REDUCE reduce REDUCE reduce REDUCE reduce REDUCE reduce REDUCE reduce REDUCE reduce REDUCE

{
    [1, 2, 3].reduce((acc, curr) => {
        return acc + curr;
    }, 0); // 0 är startvärdet, initialValue, acc's första iterationen
}

// första iterationen kommer acc vara 0, och curr att vara 1 (första elementet i arrayen);
// de andra iterationerna kommer acc att vara det som returnerades föregående;

// 1: acc(0) + curr(1) = 1
// 2: acc(1) + curr(2) = 3
// 3: acc(3) + curr(3) = 6

// Alternativt
{
    const initialValue = 0;

    [1, 2, 3].reduce((acc, curr) => {
        return acc + curr;
    }, initialValue); // same same men kan reglera startvärdet
}

// ------------------------- Test ----------------------------

const sumOfAllIds = disciplines.reduce((acc, curr) => {
    const idCurrent = curr.id;
    return acc + idCurrent;
}, 0);



const sumOfAllFactors = disciplines.reduce((acc, curr) => {
    let sumFactors = 0;
    for (let key in curr.skillFactors) sumFactors += curr.skillFactors[key];
    return acc + sumFactors;
}, 0)

// ---------------------------------------------------------------

// A = s1: 17, s2: 16, s3: 19
// B = s1: 21, s2: 13, s3: 15

// A = a1: 361, a2 401, b1: 120, b2: 50
// B = a1: 250, a2: 173, b1: 150, b2: 401

//s1 för A.
// (Pa1 + Pa2) * As1 + (Pb1 + Pb2) * Bs1 = 