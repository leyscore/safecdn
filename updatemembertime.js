<script>
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('wf-form-Profile-form');

  // Fonction pour récupérer les horaires d'ouverture avec jours par défaut
  function getOpeningHours() {
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    const workSchedule = [];

    days.forEach(day => {
      const startMorning = document.getElementById(`start-time-${day}-1`)?.value || '';
      const endMorning = document.getElementById(`end-time-${day}-1`)?.value || '';
      const startAfternoon = document.getElementById(`start-time-${day}-2`)?.value || '';
      const endAfternoon = document.getElementById(`end-time-${day}-2`)?.value || '';

      const slots = [];

      // Vérifier si la tranche du matin existe
      if (startMorning && endMorning) {
        slots.push({
          open: startMorning.replace(":", ""),
          close: endMorning.replace(":", "")
        });
      } else {
        // Si aucun horaire de matin, ajouter un slot par défaut
        slots.push({
          open: "0000",
          close: "0000"
        });
      }

      // Vérifier si la tranche de l'après-midi existe
      if (startAfternoon && endAfternoon) {
        slots.push({
          open: startAfternoon.replace(":", ""),
          close: endAfternoon.replace(":", "")
        });
      } else {
        // Si aucun horaire de l'après-midi, ajouter un slot par défaut
        slots.push({
          open: "0000",
          close: "0000"
        });
      }

      workSchedule.push({
        day: capitalizeFirstLetter(day),
        slots: slots
      });
    });

    return { workSchedule: workSchedule };
  }

  // Fonction utilitaire pour capitaliser la première lettre
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Fonction pour mettre à jour le JSON membre
  async function updateMemberJson() {
    const memberstack = window.$memberstackDom;
    const { data: member } = await memberstack.getCurrentMember();

    if (!member) return;

    const memberId = member.id;
    const currentMemberData = await memberstack.getMemberJSON(memberId);

    const currentData = currentMemberData.data || {};
    const updatedData = {};

    const newOpeningHours = getOpeningHours();
    if (JSON.stringify(newOpeningHours) !== JSON.stringify(currentData.openingHours)) {
      updatedData.openingHours = newOpeningHours;
    }

    if (Object.keys(updatedData).length > 0) {
      const result = await memberstack.updateMemberJSON({ json: updatedData });
      console.log('Mise à jour des données membre:', result);
    } else {
      console.log('Aucune donnée modifiée.');
    }
  }

  form.addEventListener('input', function() {
    updateMemberJson();
  });
});
</script>
