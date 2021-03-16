import { MainEventBus } from "./libs/MainEventBus.lib.js";
import { _front } from "./libs/_front.js";
class Front extends _front{
  constructor(){
    super();
    const _ = this;
    MainEventBus.add(_.componentName,'createOrderSuccess',_.createOrderSuccess.bind(_));
    MainEventBus.add(_.componentName,'createOrderFail',_.createOrderFail.bind(_));
    MainEventBus.add(_.componentName,'burgerClick',_.burgerClick.bind(_));
  }
  createOrderSuccess(orderData){}
  createOrderFail(orderData){}

  burgerClick(){
    let head = document.querySelector('.head');
    head.classList.toggle('active');
  }
}
new Front();
