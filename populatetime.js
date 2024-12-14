<script>
const memberstack = window.$memberstackDom;

memberstack.getCurrentMember().then(({ data: member }) => {
    if (member) {
        displayAllWorkSchedules(member.id);
    }
});

async function displayAllWorkSchedules(memberId) {
    try {
        // Récupère les données JSON du membre
        const memberData = await memberstack.getMemberJSON(memberId);
        const workSchedule = memberData.data.openingHours.workSchedule;

        console.log("Work Schedule:", workSchedule); // Ajout d'un log pour vérifier les données récupérées

        // Remplir les horaires dans les inputs de chaque jour
        workSchedule.forEach(schedule => {
            const day = schedule.day.toLowerCase(); // Convertir le jour en minuscule (ex : lundi → mon)
            const slots = schedule.slots;

            console.log(`Day: ${day}, Slots:`, slots); // Log pour vérifier les jours et les horaires

            // Itérer sur chaque plage horaire du jour
            slots.forEach((slot, index) => {
                // Construire l'ID des champs de saisie (ex : start-time-mon-1)
                const startInputId = `start-time-${day}-${index + 1}`;
                const endInputId = `end-time-${day}-${index + 1}`;

                console.log(`Looking for start input: ${startInputId}, end input: ${endInputId}`); // Log pour vérifier les IDs des éléments

                // Récupérer les éléments DOM correspondants
                const startTimeInput = document.getElementById(startInputId);
                const endTimeInput = document.getElementById(endInputId);

                // Vérifier si les éléments existent
                if (startTimeInput && endTimeInput) {
                    const startTime = formatTime(slot.open); // Formater l'heure de début
                    const endTime = formatTime(slot.close); // Formater l'heure de fin

                    console.log(`Setting start time to: ${startTime}, end time to: ${endTime}`); // Log pour vérifier les valeurs

                    // Ajouter l'attribut 'value' aux éléments
                    startTimeInput.setAttribute('value', startTime);
                    endTimeInput.setAttribute('value', endTime);
                } else {
                    console.log(`Elements not found: ${startInputId}, ${endInputId}`); // Log si les éléments ne sont pas trouvés
                }
            });
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des horaires du membre:", error);
    }
}

// Fonction pour formater les heures (par exemple : 0900 -> 09:00)
function formatTime(time) {
    if (time && time !== '0') {
        let hour = time.slice(0, 2);
        let minute = time.slice(2);

        // Ajouter un zéro devant l'heure ou la minute si nécessaire
        hour = hour.length === 1 ? `0${hour}` : hour;
        minute = minute.length === 1 ? `0${minute}` : minute;

        return `${hour}:${minute}`;
    }
    return ''; // Si l'heure est '0', renvoyer une chaîne vide
}
</script>
