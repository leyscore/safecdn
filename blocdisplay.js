document.addEventListener("DOMContentLoaded", async function() {
    window.$memberstackDom.getCurrentMember().then((member) => {
        if (member.data) {
            var status = member.data.customFields.status; // Récupère la valeur du champ personnalisé "status"

            // Récupère les sections
            var startSection = document.getElementById("start-section");
            var waitingSection = document.getElementById("waiting-section");
            var validatedSection = document.getElementById("validated-section");
            var refusedSection = document.getElementById("refused-section");

            // Cache toutes les sections au départ
            startSection.style.display = "none";
            waitingSection.style.display = "none";
            validatedSection.style.display = "none";
            refusedSection.style.display = "none";

            // Affiche la section appropriée en fonction de la valeur de "status"
            switch (status) {
                case 'Start':
                    startSection.style.display = "flex"; // Affiche la section pour "Start"
                    break;
                case 'Waiting':
                    waitingSection.style.display = "block"; // Affiche la section pour "Waiting"
                    break;
                case 'Validated':
                    validatedSection.style.display = "block"; // Affiche la section pour "Validated"
                    break;
                case 'Refused':
                    refusedSection.style.display = "block"; // Affiche la section pour "Refused"
                    break;
                default:
                    console.log("Statut inconnu.");
                    break;
            }
        }
    }).catch(error => {
        console.error("Erreur lors de la récupération des données du membre :", error);
    });
});
