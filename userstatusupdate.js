<script>
  document.addEventListener('DOMContentLoaded', function() {
    const memberstack = window.$memberstackDom;

    // Fonction pour mettre à jour le champ personnalisé du membre
    async function updateMemberStatus() {
      try {
        const member = await memberstack.getCurrentMember();
        if (member && member.data) {
          // Mettre à jour le champ personnalisé "status" à "Validated"
          const response = await memberstack.updateMember({
            customFields: {
              "status": "Validated"
            }
          });
          console.log('Statut du membre mis à jour à "Validated"', response);
        } else {
          console.log('Aucun membre n\'est actuellement connecté');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut du membre :', error);
      }
    }

    // Vérifier si l'utilisateur vient d'un lien d'affiliation
    if (window.promotekit_referral && window.promotekit_referral.trim() !== "") {
      console.log('Référence Promotekit :', window.promotekit_referral);
      updateMemberStatus();
    } else {
      console.log('Pas de référence d\'affiliation détectée');
    }
  });
</script>
