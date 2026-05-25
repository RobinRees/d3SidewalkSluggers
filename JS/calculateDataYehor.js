function calculateStatistics() {
    // seasons[0] = {...seasons[0], competitionDays: seasons[0].competitionDays.filter((x, i) => i < 2)}
    // const _seasons = [seasons[0]];
    participants.forEach(participant => {
        participant.stats = {
            S01: 0,
            S02: 0,
            S03: 0,
            S04: 0,
            S05: 0
        }

        participant.disciplineScores = {};
    });


    seasons.forEach(season => {
        season.competitionDays.forEach(competitionDay => {
            console.log(competitionDay.locationId);
            competitionDay.events.forEach(event => {
                const discipline = disciplines.find(discipline => 
                   discipline.id === event.disciplineId
                )
                console.log(event.disciplineId);
                event.scores.forEach(score => {
                    
                    const participant = participants.find(participant =>
                        participant.id === score.participantId
                    );

                    if (!participant.disciplineScores[discipline.name]) {
                        participant.disciplineScores[discipline.name] = [];
                    }
                    
                    
                    console.log(participant.id, discipline.name, score.score);
                    
                    participant.disciplineScores[discipline.name].push(score.score);
                    
                })
            })
        })
    })
    console.log(participants);
    
    
    

    participants.forEach(participant => {
        disciplines.forEach(discipline => {
            const scores = participant.disciplineScores[discipline.name];

            if (!scores || scores.length === 0) return;

            const meanScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;

            Object.entries(discipline.skillFactors).forEach(([skill, factor]) => {
                participant.stats[skill] += meanScore * factor;
            })
        })
        console.log(participant.stats);
            
    })
}

calculateStatistics();