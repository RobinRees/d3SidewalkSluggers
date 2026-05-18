// Create totalScorePerSeason

function totalScorePerSeason() {
    participants.forEach(participant => {
        participant.totalScorePerSeason = {
            year0: 0,
            year1: 0,
            year2: 0,
            year3: 0,
            year4: 0,
            year5: 0,
            year6: 0,
            year7: 0,
            year8: 0,
            year9: 0
        }
    })

    seasons.forEach(season => {
        let currentYear = season.year;

        season.competitionDays.forEach(day => {
            day.events.forEach(event => {
                event.scores.forEach(score => {
                    participants.forEach(person => {
                        if (person.id === score.participantId) {
                            person.totalScorePerSeason[`year${currentYear}`] += score.score;
                        }
                    })
                })
            })
        })
    })

}

(function createTotalScoreKey() {
    participants.forEach(char => {
        char.totalScore = 0;            // Creates totalScore key in every participant's object
        let totalScore = 0;             // Variable to add every seasons score to
        for (let i = 0; i <= 9; i++) {
            totalScore += char.totalScorePerSeason[`year${i}`];         // Adds every seasons score to totalScore variable
        }
        char.totalScore = totalScore;   // Sets participants totalScore key to same value as totalScore variable
    })
}());

function findTopFiveOAT(participants) {                 // When called returns array of 5 participant objects which key totalScore is of highest number
    return participants
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 5) 
};

function sortByTotalScore(participants) {               // When called returns whole participant array sorted by key totalScore
    return participants.sort((a, b) => b.totalScore - a.totalScore)
}