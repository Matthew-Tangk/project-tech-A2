const acceptButton = document.querySelector('.acceptationbutton');
console.log(acceptButton);

acceptButton.addEventListener('click', async() => {
    console.log('click');
    await fetch('/invites/updateInviteStatus',  { method: 'POST'});
});
