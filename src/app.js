require('jquery');
require('jquery-datetimepicker');
import './scss/styles.scss';
import {
  initBasicScripts
} from './js/scripts';
import Controller from './js/controller';
initBasicScripts();

const controller = new Controller();
controller.init();