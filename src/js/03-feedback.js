import throttle from 'lodash.throttle'

const refs = {
    formElem: document.querySelector(".feedback-form")
}

refs.formElem.addEventListener('input', throttle(onFormInput, 500))

let obj = {};

function onFormInput(ev) {
    const value = ev.target.value;
    const key = ev.target.name;
    obj[key] = value;
    localStorage.setItem('feedback-form-state', JSON.stringify(obj))
}

function onLoadPage() {
    const data = localStorage.getItem('feedback-form-state')
    const parseData = JSON.parse(data) || {};
    refs.formElem.elements.email.value = parseData?.email || '';
    refs.formElem.elements.message.value = parseData?.message || '';
}
onLoadPage()

document.querySelector('form').addEventListener('submit', onFormSubmit)

function onFormSubmit(event) {
    event.preventDefault();

    var email = document.querySelector('input[name="email"]').value;
    var message = document.querySelector('textarea[name="message"]').value;

    console.log({ email: email, message: message });
    obj = {};
    event.target.reset();
    localStorage.removeItem('feedback-form-state');

    document.querySelector('input[name="email"]').value = '';
    document.querySelector('textarea[name="message"]').value = '';
};

