document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const to = params.get('to');

  const frontTextEl = document.getElementById('frontText');
  if (frontTextEl && to && to.trim()) {
    frontTextEl.textContent = to.trim();
  }

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
