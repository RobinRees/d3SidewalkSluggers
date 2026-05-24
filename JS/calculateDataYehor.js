function calculateStats() {
    participants.forEach(participant => {
         participant.stats = {
            S01: 0,
            S02: 0,
            S03: 0,
            S04: 0,
            S05: 0
        }
    });

    seasons.forEach(season => {
        season.competitionDays.forEach(competitionDay => {
            competitionDay.events.forEach(event => {
                const discipline = disciplines.find(discipline => 
                    event.disciplineId === discipline.id
                )

                const 
            })
        })
    })
}