function calculateStats () {

    participants.forEach(participant => {
        participant.stats = {
            S01: 0,
            S02: 0,
            S03: 0,
            S04: 0,
            S05: 0
        }

        participant.gamesPlayed = 0;
    })

    seasons.forEach(season => {

        season.competitionDays.forEach(day => {
            day.events.forEach(event => {
                const discipline = disciplines.find(d =>
                    d.id === event.disciplineId
                );

                event.scores.forEach(score => {
                    const participant = participants.find(p =>
                        p.id === score.participantId
                    );  
                    
                    participant.gamesPlayed++;
                        
                    Object.entries(discipline.skillFactors).forEach(([skill, factor]) => {
                        participant.stats[skill] += (score.score * factor) / participant.gamesPlayed;
                    });
                })
            })
        })
    })
    
}



calculateStats();
