(function totalScorePerSeason() {
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

}());

(function createTotalScoreKey() {
    participants.forEach(char => {
        char.totalScore = 0;
        let totalScore = 0;
        for (let i = 0; i <= 9; i++) {
            totalScore += char.totalScorePerSeason[`year${i}`];
        }
        char.totalScore = totalScore;
    })
}());

function sortByTotalScore(participants) {
    return participants.toSorted((a, b) => b.totalScore - a.totalScore)
}

function findTopFiveOAT(participants) {
    return sortByTotalScore(participants).slice(0, 5)
};

function createDatasetForCoords(placement, patchId) {
    let dataset = [];

    if (patchId === "all") {
        for (i = 0; i <= 9; i++) {
            dataset.push({ "year": i, "score": `${findTopFiveOAT(participants)[placement].totalScorePerSeason[`year${i}`]}` });
        }
        return dataset;
    }

    for (i = 0; i <= 9; i++) {
            dataset.push({ "year": i, "score": `${findTopFiveByPatch(participants, patchId)[placement].totalScorePerSeason[`year${i}`]}` });
        }

    return dataset;
}

function findTopFiveByPatch(participants, patchId) {
    return participants.filter(char => char.totalScorePerSeason[`year${patchId}`] !== 0)
        .toSorted((a, b) => b.totalScorePerSeason[`year${patchId}`] - a.totalScorePerSeason[`year${patchId}`])
        .slice(0, 5)
}

function findHighestScoreInASeason() {
    const topPlayerPerSeasons = [];
    for (let i = 0; i <= 8; i++) {
        topPlayerPerSeasons.push(findTopFiveByPatch(participants, i)[0]);
    }

    let seasonWithTopScore = undefined;
    let topScoreInASeason = 0;

    topPlayerPerSeasons.forEach(player => {
        Object.entries(player.totalScorePerSeason).forEach(([year, score]) => {
            if (score > topScoreInASeason) {
                topScoreInASeason = score;
                seasonWithTopScore = year;
            }
        })
    })

    console.log(seasonWithTopScore);
    console.log(topScoreInASeason);



    return {
        player: topPlayerPerSeasons.filter(player => {
            return player.totalScorePerSeason[seasonWithTopScore] === topScoreInASeason
        }),
        score: topScoreInASeason,
        season: seasonWithTopScore
    };
}