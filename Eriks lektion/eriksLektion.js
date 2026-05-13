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