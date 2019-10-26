import Model from "./model";
import View from "./view";

export default class Controller {

  constructor() {
    this.model = new Model();
    this.view = new View();
    this.model.bindItemsChanged(this.onItemsChanged.bind(this));
    this.onItemsChanged(this.model.items);
  }

  // watch for items change
  onItemsChanged(items) {
    this.view.drawTable(items); // redraw table with updated items
  }


  init() {
    const form = document.querySelector(this.view.domsClassName.form);
    if (form) {
      form.addEventListener('submit', e => this.view.addTodo(e, this.bindAddTodo.bind(this)));
    }

    document.addEventListener('click', e => this.view.deleteTodo(e, this.bindDeleteTodo.bind(this)));

    document.addEventListener('keyup', e => this.view.editTodo(e, this.bindEditTodo.bind(this)));

    document.addEventListener('change', e => this.view.setTodoStatus(e, this.bindSetTodoStatus.bind(this)));

  }


  bindSetTodoStatus(id, status) {
    this.model.setTodoStatus(id, status);
  }

  bindEditTodo(id, description) {
    this.model.editTodo(id, description);
  }

  // getting data from view and adding to model items
  bindAddTodo(data) {
    // console.log(this.model.items);
    // return;
    this.model.addTodo(data);
  }

  // get deleted todo id 
  bindDeleteTodo(id) {
    if (id) {
      this.model.deleteTodo(id, this.view.deleteTableTr.bind(this.view));
    }
  }

}