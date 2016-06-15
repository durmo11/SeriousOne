export default class HomeController {
  constructor(mainService) {
    this.twitterUser= mainService.query();
    console.log(this.twitterUser);
  }

}
HomeController.$inject = ['mainService'];
