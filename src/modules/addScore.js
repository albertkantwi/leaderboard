import loader from './api_loader.js';

const ul = document.getElementById('scores-list');
const form = document.querySelector('.add-form');
const btnRefresh = document.querySelector('.refresh');
const info = document.querySelector('.info');

class DOMManipulator {
  populateScoreBoard = async () => {
    const scores = await loader.getData();
    if (scores.result !== []) {
      ul.innerHTML = '';
      scores.result.forEach((score) => {
        const li = document.createElement('li');
        li.innerHTML = `${score.user}: ${score.score}`;
        ul.appendChild(li);
      });
    }
  }

  addSubmitListener = () => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = form.elements.name.value;
      const score = form.elements.score.value;
      const result = loader.setData({ user: name, score });
      let id = null;
      let msg = null;
      result.then((res) => {
        id = res.id;
        msg = res.message;
        this.showNotification(msg, id);
      });
      this.showNotification(msg, id);
    });
  };

  addRefreshListener = () => {
    btnRefresh.addEventListener('click', (event) => {
      event.preventDefault();
      this.populateScoreBoard();
    });
  };

  showNotification = async (msg, id) => {
    info.innerHTML = msg;
    if (id) {
      info.classList.add('success');
      info.classList.remove('error');
    } else {
      info.classList.remove('success');
      info.classList.add('error');
    }

    setTimeout(() => {
      info.innerHTML = '';
    }, 5000);
  }
}

export default DOMManipulator;