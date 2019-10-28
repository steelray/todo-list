// @ts-check
import {
  initMDCRipple
} from "./scripts";
import moment from "moment";
import {
  MDCSnackbar
} from "@material/snackbar";

export default class View {

  constructor() {
    this.snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
  }

  get domsClassName() {
    return {
      form: '#todoForm',
      tableContent: '#todoTableContent',
    };
  }

  addTodo(e, cb) {
    e.preventDefault();
    const data = this.getFormData(e.target);
    return cb(data);
  }

  // reset for after todo added
  resetForm() {
    const form = document.querySelector(this.domsClassName.form);
    // @ts-ignore
    form.reset();
    this.snackbar.labelText = 'Your task added!';
    this.snackbar.actionButtonText = 'close';
    this.snackbar.open();
  }

  // get all tags value wich has "name" attribute
  getFormData(form) {
    const children = form.querySelectorAll('[name]');
    const data = [];
    for (const child of Object.values(children)) {
      let value = child.value;
      if (child.getAttribute('name') === 'startTime' || child.getAttribute('name') === 'executionTime') {
        value = new Date(value).getTime();
      }
      data[child.getAttribute('name')] = value;
    }
    if (data['startTime'] > data['executionTime']) {
      this.snackbar.labelText = 'Start time can not be greater execution time!';
      this.snackbar.open();
      return;
    }
    return data;
  }

  drawTable(items) {
    // console.log(items);
    // return;
    const tableCont = document.querySelector(this.domsClassName.tableContent);
    tableCont.innerHTML = '';
    for (const item of items) {
      const tr = this.createElement('tr');
      tr.setAttribute('data-id', item.id);


      // statusTD
      const statusTD = this.createElement('td');
      const mdcCheckbox = this.createElement('div', ['mdc-checkbox', 'todo-table__status']);

      const mdcCheckboxInput = this.createElement('input', 'mdc-checkbox__native-control');
      mdcCheckboxInput.type = 'checkbox';
      mdcCheckboxInput.checked = item.status;

      const mdcCheckboxBg = this.createElement('div', 'mdc-checkbox__background');

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', "0 0 24 24");
      svg.classList.add('mdc-checkbox__checkmark');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.classList.add('mdc-checkbox__checkmark-path');
      path.setAttribute('fill', 'none');
      path.setAttribute('d', 'M1.73,12.91 8.1,19.28 22.79,4.59');

      const mdcCheckboxMark = this.createElement('div', 'mdc-checkbox__mixedmark');

      svg.append(path);
      mdcCheckboxBg.append(svg);
      mdcCheckbox.append(mdcCheckboxInput, mdcCheckboxBg, mdcCheckboxMark);
      statusTD.append(mdcCheckbox);
      // statusTD end


      // descriptionTD
      const descriptionTD = this.createElement('td');

      const description = this.createElement('div', 'todo-table__description');
      const span = this.createElement('span');
      if (item.status) {
        span.classList.add('disabled');
      } else {
        span.setAttribute('contenteditable', true);
      }
      span.textContent = item.description;

      description.append(span);
      descriptionTD.append(description);
      // descriptionTD end


      // startTimeTD
      const startTimeTD = this.createElement('td');
      startTimeTD.textContent = moment(item.startTime).format('MMM D YYYY, h:mm a');

      // executionTimeTD 
      const executionTimeTD = this.createElement('td');
      executionTimeTD.textContent = moment(item.executionTime).format('MMM D YYYY, h:mm a');


      // deleteTD
      const deleteTD = this.createElement('td');
      const button = this.createElement('button', ['mdc-button', 'mdc-button--danger', 'my-surface', 'todo-table__delete']);
      button.textContent = 'Delete';
      deleteTD.append(button);


      // adding all tds to tr
      tr.append(
        statusTD,
        descriptionTD,
        startTimeTD,
        executionTimeTD,
        deleteTD
      );

      tableCont.append(tr);

    }

    initMDCRipple();

  }


  deleteTodo(e, cb) {
    const target = e.target;
    let id = 0;
    if (target.classList.contains('todo-table__delete')) {
      e.preventDefault();
      const tr = target.parentNode.parentNode;
      id = +tr.dataset.id;
      tr.classList.add('pending');
    }
    cb(id);
  }

  deleteTableTr(id) {
    const tr = document.querySelector(this.domsClassName.tableContent).querySelector(`tr[data-id="${id}"]`);
    if (tr) {
      tr.classList.add('hide');
      setTimeout(() => tr.parentNode.removeChild(tr), 400);
    }
  }

  editTodo(e, cb) {
    const target = e.target;
    if (target.parentNode.classList.contains('todo-table__description')) {
      const description = target.textContent;
      const id = +target.parentNode.parentNode.parentNode.dataset.id;
      if (id) {
        cb(id, description);
      }
    }
  }

  setTodoStatus(e, cb) {
    const target = e.target;
    if (target.classList.contains('mdc-checkbox__native-control')) {
      const id = +target.parentNode.parentNode.parentNode.dataset.id;
      if (id) {
        cb(id, target.checked);
      }
    }
  }

  createElement(tagName, classList) {
    const tag = document.createElement(tagName);
    if (classList) {
      const classes = typeof classList !== 'object' ? [classList] : classList;
      for (const className of classes) {
        tag.classList.add(className);
      }
    }
    return tag;
  }

}