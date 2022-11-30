/* eslint-disable */

const updateData = async (data, type) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${
        type === 'password' ? 'updatePassword' : 'UpdateMe'
      }`,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Your data updated');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

document.querySelector('.form-user-data').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = new FormData();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const photo = document.getElementById('photo').files[0];

  form.append('name', name);
  form.append('email', email);
  form.append('photo', photo);

  updateData(form);
});

document
  .querySelector('.form-user-settings')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save--password').textContent = 'Loading ....';
    document.querySelector('.btn--save--password').disabled = true;

    const oldPassword = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateData({ oldPassword, password, passwordConfirm }, 'password');

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';

    document.querySelector('.btn--save--password').textContent =
      'Save password';
    document.querySelector('.btn--save--password').disabled = false;
  });
