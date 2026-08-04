document.addEventListener('DOMContentLoaded', () => {
  const frame = document.getElementById('inviteFrame');
  const trigger = document.getElementById('flipTrigger');
  let isOpen = false;

  const openInvite = () => {
    if (!frame || isOpen) return;
    isOpen = true;
    frame.classList.add('is-open');
    document.body.classList.add('page-open');
  };

  if (trigger) {
    trigger.addEventListener('click', openInvite);
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openInvite();
      }
    });
  }
});
