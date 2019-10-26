// @ts-check
export default class Model {

  constructor() {
    this.items = this.getItems();
  }

  getItems() {
    return JSON.parse(localStorage.getItem('todoList')) || [];
  }

  addTodo(data) {
    const newID = this.items.length ? this.items[this.items.length - 1].id + 1 : 1;
    const {
      description,
      startTime,
      executionTime
    } = data;
    this.items.push({
      id: newID,
      description,
      startTime: new Date(startTime).getTime(),
      executionTime: new Date(executionTime).getTime(),
      status: false,
      executedTime: null
    });
    this.onItemsChanged(this.items);
    this.saveItems();
  }

  deleteTodo(id, cb) {
    this.items.splice(this.items.findIndex(i => i.id === id), 1);
    this.saveItems();
    setTimeout(() => cb(id), 500);
    // cb(id);
  }

  editTodo(id, description) {
    this.items.map(item => {
      if (item.id === id) {
        item.description = description;
      }
      return item;
    });
    this.saveItems();
  }

  setTodoStatus(id, status) {
    this.items.map(item => {
      if (item.id === id) {
        item.status = status;
      }
      return item;
    })
    this.onItemsChanged(this.items);
    this.saveItems();
  }

  // save items to db/storage
  saveItems() {
    localStorage.setItem('todoList', JSON.stringify(this.items));
  }

  // binding model's items change with controller method
  bindItemsChanged(cb) {
    this.onItemsChanged = cb;
  }


}