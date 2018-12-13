var fs = require('fs');

// Read, prepare and execute puzzle 
fs.readFile('puzzleinput.txt', 'utf8', function (err, puzzle) {

    const sequence = puzzle
        .split("\r\n");

    // Part 1
    const { found2, found3 } = sequence.reduce( ( result, nxtValue ) => {

        const res = nxtValue.split('').reduce( (col, character ) => {
            col[character] = col[character] + 1 || 1;
            return col; 
        }, {})

        let newValue = Object.keys(res).reduce( ( val, nxtKey) => {
            if(res[nxtKey] == 2)
                val.has2 = 1;;
            if(res[nxtKey] == 3)
               val.has3 = 1;

            return val;
        } , { has2: 0, has3: 0});

        result.found2 += newValue.has2;
        result.found3 += newValue.has3;
        return result;


    } , { found2:0, found3:0});
    
    console.log(found2 * found3);

    // Part 2
    sequence.forEach( (nxtValue, index) => {
        
        for( var i=index+1; i<sequence.length; i++){

            var compare = sequence[i].split('');
            var numOfDiffs = nxtValue.split('').reduce( (summary, nxtChar, charIndex) => {
                if(nxtChar!=compare[charIndex]) return { diffCount: summary.diffCount + 1, maxDiffPos: charIndex} ;
                return summary;
            }, {diffCount: 0, maxDiffPos: -1} );

            if(numOfDiffs.diffCount==1) {
                compare.splice(numOfDiffs.maxDiffPos, 1);
                console.log(nxtValue + " -- " + sequence[i] + " --> " + compare.join(''));
            }
        }
    });
});