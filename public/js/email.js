
const emailHandler = async (event) => {
    event.preventDefault();

    const body = {
        content: document.querySelector('#email-wrapper').innerHTML
    }

    const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    if (response.ok) {
        const res = await response.json();
        const linkDiv = document.querySelector('#email-link');
        const link = document.createElement('a');
        link.innerText = 'Demonstration Email';
        link.href = res;
        linkDiv.appendChild(link)
    } else {
        console.log(response + ': ' + response.statusText);
        alert("Failed to send Email");
    }
}

  document
    .querySelector('#email-button')
    .addEventListener('click', emailHandler);