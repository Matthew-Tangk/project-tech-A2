const acceptButton = document.querySelector('.acceptationbutton');
const acceptButtonPending = document.querySelector('.acceptionbuttonpending')
console.log(acceptButtonPending);

if(acceptButton != null) {
    acceptButton.addEventListener('click', async() => {
        await fetch('/invites/updateInviteStatus',  { method: 'POST'});
    });
}

if(acceptButtonPending != null) {
    acceptButtonPending.addEventListener('click', async() => {
        await fetch('/invites/updatePendingStatus',  { method: 'POST'});
    });
}