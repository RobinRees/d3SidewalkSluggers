function calculateStats () {

    participants.forEach(participant => {
        participant.stats = {
            S01: 0,
            S02: 0,
            S03: 0,
            S04: 0,
            S05: 0
        }
    })

    /* 
    
    Sen här måste vi på någotsätt gå igonom allt för att få ut så att rätt persons score läggs rätt.
    Kommer vara många loppar
    
    */



}


/* För att räkna ut stats måste vi göra följande som erik sa: 

    Ta D01, binda den till S01. 
    Räkna ihop allas poäng som dem fått i endast D01. 
    Den som har mest poäng i D01. Är bäst i S01.
    Den som är sämst i D01 den är sämst i S01. 
    Efter vi har allas score så kan vi räkna ut skalan. dvs 
    Den som är bäst är 20 och den som är sämst är 1. Alla andra hamnar där emellan. 

    Vi gör detta för varje skill.


*/


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

totalScorePerSeason();

function disciplineScorePerSeason () {

}