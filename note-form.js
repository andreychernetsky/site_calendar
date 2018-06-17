// {
//         date: '01.05.2018',
//         image: ['http://vk.com/...', 'http://vk.com/...'],
//         title: 'Some title',
//         description: 'description ...',
//},

let form = document.querySelector('#note-form');
let button = form.querySelector('[type="button"]');

button.addEventListener('click', () => {
    let note = formData(form);
    if (!note.title || !note.date) {
        alert('поле даты или поле названия не заполнено');
        return
    }
    saveNote(note);
});

/**
 *
 * @param form: domElement
 */
function formData(form) {
    const formElemTypes = ['text', 'number', 'date', 'phone', 'email', 'password'];
    const formElements = getFormElements(formElemTypes, form);

    function data(elements) {
        let res = {};
        elements.forEach((el) => res[el.name] = el.value);
        return res;
    }

    return data(formElements);
}

function getFormElements(types, form) {
    let result = [];
    types.forEach((type) => {
        const list = [...form.querySelectorAll(`[type='${type}']`)];
        result = result.concat(list)
    });
    result = result.concat([...form.querySelectorAll('textarea')]);
    return result;
}