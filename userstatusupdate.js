  const memberstack = window.$memberstackDom;

  // Function to update the member's custom field
  async function updateMemberStatus() {
    try {
      const member = await memberstack.getCurrentMember();
      if (member && member.data) {
        // Update the custom field "status" to "Validated"
        await memberstack.updateMember({
          customFields: {
            "status": "Validated"
          }
        });
        console.log('Member status updated to "Validated"');
      } else {
        console.log('No member is currently logged in');
      }
    } catch (error) {
      console.error('Error updating member status:', error);
    }
  }

  // Check if the user came from an affiliate link
  if (window.promotekit_referral) {
    updateMemberStatus();
  }
