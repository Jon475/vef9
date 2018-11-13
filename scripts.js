// const API_URL = '/example.json?domain=';
const API_URL = 'http://apis.is/isnic?domain=';

/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {
  let input;
  function display(data) {
    if (data.length === 0) {
      text('Lén er ekki skráð');
      return;
    }
      /* Þetta býr til lista með nafni á gögnunum og líka með gögnum sem þú sækir frá síðunni */
    function add(data, name) {
      if (data === '') return;
      const resultsDiv = document.querySelector('.results');
      const dl = document.createElement('dl');
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dl.appendChild(dt);
      dl.appendChild(dd);
      dt.appendChild(document.createTextNode(name));
      dd.appendChild(document.createTextNode(data));
      resultsDiv.appendChild(dl);
    }
    remove(document.querySelector('.results'));
    const [{ domain, registrantname, address, city, postalCode, country, phone, email, registered, expires, lastChange }] = data;

    add(domain, 'Lén');
    add(registrantname, 'Skráningaraðili');
    add(address, 'Heimilisfang');
    add(city, 'Borg');
    add(postalCode, 'póstnúmer');
    add(country, 'Land');
    add(phone, 'Sími');
    add(email, 'Netfang');
    add(registered, 'Skráð');
    add(expires, 'Rennur út');
    add(lastChange, 'Seinast breytt');
  }
  /* Býr til texta þegar það er búið að remova öll element í results */
  function text(display) {
    const text = document.createTextNode(display);
    remove(document.querySelector('.results'));
    document.querySelector('.results').appendChild(text);

  }
  /* Búum þetta til til að deleta því gamla sem við leituðum af */
  function remove(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  function fetchResults(searchValue) {
    fetch(`${API_URL}${searchValue}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('200 error');
        }
        return res.json();
      })
      .then(data => display(data.results))
      .catch(err => console.error(err));
  }

  function onSubmit(e) {
    e.preventDefault();
    const { value } = input;
    if (value.trim() !== '') {
      fetchResults(value);
    }
    else {
      sshowmeassage('Lén þarf að vera strengur.');
    }
  }

  function showmeassage(text) {
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }
    results.appendChild(el('p', text));
  }
  function script(gif) {
    const img = documnet.createElement('img');
    img.setAttribute('src','loading.gif');
    results.appendChild(img);
  }

  function el(name, ...children) {
    const element = document.createElement(name);
    for (let child of children) {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      }
      else if (child) {
        element.appendChild(child);
      }
    }
  }

  function init(domains) {
    const form = domains.querySelector('form');
    input = form.querySelector('input');
    results = domains.querySelector('.results');
    form.addEventListener('submit', onSubmit);
  }
  return {
    init,
  };
})();
document.addEventListener('DOMContentLoaded', () => {
  const domains = document.querySelector('.domains');
  program.init(domains);
});
