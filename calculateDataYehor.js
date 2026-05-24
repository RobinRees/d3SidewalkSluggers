function calculateStats () {

    participants.forEach(participant => {
        participant.stats = {
            S01: 0,
            S02: 0,
            S03: 0,
            S04: 0,
            S05: 0
        };

        
    });

    seasons.forEach(season => {
        season.competitionDays.forEach(day => {
            day.events.forEach(event => {
                const discipline = disciplines.find(d =>
                    d.id === event.disciplineId
                    
                );

                event.scores.forEach(score => {
                    const participant = participants.find(participant =>
                        participant.id === score.participantId
                    );

                    const baseScore = score.score;
                        
                    Object.entries(discipline.skillFactors).forEach(([skill, factor]) => {
                        participant.stats[skill] += baseScore * factor;
                    });
                });
            });
        });
    });
};

function normalizeStats(participants) {
    const skills = ["S01", "S02", "S03", "S04", "S05"];
    
    skills.forEach(skill => {
        const values = participants.map(participant => participant.stats[skill]);

        const min = Math.min(...values);
        const max = Math.max(...values);
        console.log(max);
        
        const scaleStats = d3.scaleLinear()
            .domain([min, max])
            .range([0, 20]);

        participants.forEach(participant => {
            participant.stats[skill] = scaleStats(participant.stats[skill]);
        });
    });
};


calculateStats();
normalizeStats(participants);
