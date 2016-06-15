import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './home.routes';
import resource from 'angular-resource';
import HomeController from './home.controller';
import mainService from '../../services/main.service';

export default angular.module('app.home', [uirouter, mainService,resource])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;
