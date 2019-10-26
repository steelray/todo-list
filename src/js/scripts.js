import {
  MDCRipple
} from "@material/ripple";
import {
  MDCTextField
} from "@material/textfield";
import $ from 'jquery';
import {
  MDCCheckbox
} from "@material/checkbox";
import {
  MDCDataTable
} from "@material/data-table";

export function initBasicScripts() {
  initMDCRipple();
  initMDCTextField();
  initDatetimepicker();
  initMDCCheckboxes();
  initMDCDataTable();
}

export function initMDCRipple(className = 'my-surface') {
  const surfaces = document.querySelectorAll(`.${className}`);
  for (const surface of Object.values(surfaces)) {
    new MDCRipple(surface);
  }
}

export function initMDCTextField(el) {
  // init for all elements with class mdc-text-field
  if (!el) {
    const fields = document.querySelectorAll('.mdc-text-field');
    for (const field of Object.values(fields)) {
      new MDCTextField(field);
    }
  }
}

export function initDatetimepicker() {
  $('.datetimepicker').datetimepicker();
}

export function initMDCCheckboxes() {
  const checkboxes = document.querySelectorAll('.mdc-checkbox');
  for (const checkbox of Object.values(checkboxes)) {
    new MDCCheckbox(document.querySelector(checkbox));
  }
}

export function initMDCDataTable() {
  const dataTables = document.querySelectorAll('.mdc-data-table');
  for (const dataTable of Object.values(dataTables)) {
    new MDCDataTable(document.querySelector(dataTable));
  }
}