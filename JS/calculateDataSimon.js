function totalScorePerSeason () {
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

function findTopFiveCharactersOfAllTime () {
    participants.forEach(char => {
        char.totalScore = 0;
        let totalScore = 0;
        for (let i = 0; i <= 9; i++) {
            totalScore += char.totalScorePerSeason[`year${i}`];
        }
        char.totalScore = totalScore;
    })
}

findTopFiveCharactersOfAllTime();