const acceptButton = document.querySelector('.acceptationbutton');
const ignoreButton = document.querySelector('.ignoreButton');

const acceptButtonPending = document.querySelector('.acceptionbuttonpending');

if(acceptButton != null) {
    acceptButton.addEventListener('click', async() => {
        await fetch('/invites/updateInviteStatus',  { method: 'POST'});
    });
}

if(ignoreButton != null) {
    ignoreButton.addEventListener('click', async() => {
        await fetch('invites/updateIgnoreStatus', { method: 'POST'});
    })
}

if(acceptButtonPending != null) {
    acceptButtonPending.addEventListener('click', async() => {
        await fetch('/invites/updatePendingStatus',  { method: 'POST'});
    });
}