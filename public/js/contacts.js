let allInviteBtns = document.getElementsByClassName("invitebtn");

//invited versus not invited
Array.from(allInviteBtns).forEach(function (btn) {
  btn.addEventListener('click', function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const inviteStatus = this.parentNode.parentNode.childNodes[7].innerText

    fetch('/contacts', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'name': name,
        'inviteStatus': inviteStatus
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});



let trash = document.getElementsByClassName("fa-trash");

//deleting selected contacts
Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    let name = this.parentNode.parentNode.childNodes[1].innerText
    fetch('contacts', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name
      
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});



let clearBtn = document.querySelector(".clear")

// deleting all contacts
clearBtn.addEventListener("click", clearAll)
function clearAll() {
  fetch('deleteAllContacts', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(function (response) {
    window.location.reload()
  })
}
