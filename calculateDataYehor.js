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
        let amountPlayedTheDiscipline = [];

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

    const S01ParticipantPerformance = participants.map(p => p.stats.S01);
    const S01BestPerformance = Math.max(...S01ParticipantPerformance);

    const S02ParticipantPerformance = participants.map(p => p.stats.S02);
    const S02BestPerformance = Math.max(...S02ParticipantPerformance);

    const S03ParticipantPerformance = participants.map(p => p.stats.S03);
    const S03BestPerformance = Math.max(...S03ParticipantPerformance);

    const S04ParticipantPerformance = participants.map(p => p.stats.S04);
    const S04BestPerformance = Math.max(...S04ParticipantPerformance);

    const S05ParticipantPerformance = participants.map(p => p.stats.S05);
    const S05BestPerformance = Math.max(...S05ParticipantPerformance);

    console.log(S01ParticipantPerformance);
    console.log(S01BestPerformance);
    console.log(participants);
    
}

calculateStats();
