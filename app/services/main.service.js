import angular from 'angular';
export default angular.module('services.mainService',[])
  .service('mainService',['$resource', class mainService{
    constructor($resource){
      return $resource('http://localhost:8000/',{},{
        query: {
          method:'GET',
          params:{
          },
          isArray:true
        }
      });
    }
  }])
  .name;
