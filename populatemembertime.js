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

document.getElementById('wf-form-Google-maps-link-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Empêche la soumission normale du formulaire

  const form = document.getElementById('wf-form-Profile-form');
  const loader = document.getElementById('loader-step2');
  const overlay = document.createElement('div'); // Crée un overlay
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = '#111a2b';
  overlay.style.opacity = '0.3';
  overlay.style.zIndex = '10'; // Assurez-vous que l'overlay est au-dessus du formulaire

  form.style.position = 'relative'; // Assurez-vous que le formulaire est bien positionné pour l'overlay
  form.appendChild(overlay); // Ajoute l'overlay sur le formulaire

  // Affiche le loader et rend le formulaire non cliquable
  loader.classList.remove('hidden');
  form.classList.add('disabled');

  // Simule une tâche de 30 secondes
  setTimeout(() => {
    // Cache le loader et retire l'overlay
    loader.classList.add('hidden');
    form.classList.remove('disabled');
    form.removeChild(overlay); // Retire l'overlay

    // Appeler la fonction pour afficher les horaires après la fin de l'animation du loader
    memberstack.getCurrentMember().then(({ data: member }) => {
        if (member) {
            displayAllWorkSchedules(member.id);
        }
    });

  }, 30000); // Le loader tourne pendant 30 secondes
});
