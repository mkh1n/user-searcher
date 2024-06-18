import './fakeApi.js'; //fake api for development
import './style.css'

const elements = {
  usersContainer: document.getElementById('usersContainer'),
  searchBar: document.getElementById('searchBar'),
  prevButton: document.getElementById('prevButton'),
  nextButton: document.getElementById('nextButton'),
  buttonBlock: document.getElementById('buttonBlock'),
};

const showError = (errorMessage) => {
  elements.usersContainer.innerHTML = `
    <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="alert alert-warning text-center" role="alert">
          <h4 class="alert-heading">${errorMessage}</h4>
        </div>
      </div>
    </div>
  </div>`
  elements.buttonBlock.style.opacity = '0'
}
const renderUsers = (data) => {

  elements.usersContainer.innerHTML = '';
  if (data.result.length == 0) {
    showError('No users found')
  } else {
    elements.buttonBlock.style.opacity = '1'
  }

  data.result.forEach((user) => {
    const userBlock = document.createElement('div');
    userBlock.classList.add('col');
    userBlock.innerHTML = `
      <div class="col cardHolder">
                <div class="card h-100 shadow-sm">
                    <div class="card-body text-center d-flex align-items-center">
                        <img src="${user.avatarUrl}" alt="User Avatar" class="rounded-circle img-fluid me-3" style="width: 70px; height: 70px;">
                        <h5 class="card-title">${user.name}</h5>
                    </div>
                </div>
            </div>`;
    elements.usersContainer.appendChild(userBlock)
  })
  elements.usersContainer.style.opacity = '1';

  elements.nextButton.disabled = !data.nextPageUrl;
  elements.nextButton.dataset.url = data.nextPageUrl || '';

  elements.prevButton.disabled = !data.previousPageUrl;
  elements.prevButton.dataset.url = data.previousPageUrl || '';
}
const loadUsers = (url) => {
  elements.usersContainer.style.opacity = '0';
  fetch(url)
    .then(response => {
      if (!response.ok) {
        showError('Network error');
        console.error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
      renderUsers(data);
    })
    .catch(error => {
      showError('Server error');
      console.error('There has been a problem with your fetch operation:', error);
    });
};

elements.searchBar.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  const url = `/api/users?searchTerm=${searchTerm}`;
  loadUsers(url);
});

elements.prevButton.addEventListener('click', (e) => {
  const url = e.target.dataset.url;
  if (url) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    loadUsers(url);
  }
});

elements.nextButton.addEventListener('click', (e) => {
  const url = e.target.dataset.url;
  if (url) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    loadUsers(url);
  }
});

window.onload = () => {
  loadUsers('/api/users?searchTerm=');
};