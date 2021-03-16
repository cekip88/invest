import { MainEventBus } from "./libs/MainEventBus.lib.js";
import { gsap } from "./libs/GreenSock.lib.js";
import { _front } from "./libs/_front.js";
class Front extends _front{
  constructor(){
    super();
    const _ = this;
    MainEventBus.add(_.componentName,'createOrderSuccess',_.createOrderSuccess.bind(_));
    MainEventBus.add(_.componentName,'createOrderFail',_.createOrderFail.bind(_));
    MainEventBus.add(_.componentName,'burgerClick',_.burgerClick.bind(_));
    MainEventBus.add(_.componentName,'selectOpen',_.selectOpen.bind(_));
    MainEventBus.add(_.componentName,'selectChoose',_.selectChoose.bind(_));

    _.selectAutoChoose();
    _.headScroll();
    _.textAnimation();
    window.addEventListener('scroll',function () {
      _.headScroll();
      _.textAnimation();
    })
  }
  createOrderSuccess(orderData){}
  createOrderFail(orderData){}

  burgerClick(){
    let head = document.querySelector('.head');
    head.classList.toggle('active');
  }

  selectAutoChoose(){
    let selects = document.querySelectorAll('.select');
    if (selects.length){
      for (let select of selects){
        let head = select.firstElementChild.firstElementChild;
        let firstButton = select.lastElementChild.firstElementChild;
        let input = select.previousElementSibling;
        head.textContent = input.value = firstButton.textContent;
      }
    }
  }
  selectOpen(clickData){
    let btn = clickData.item;
    let select = btn.parentElement;
    select.classList.toggle('active')
  }
  selectChoose(clickData){
    let btn = clickData.item;
    let value = btn.textContent;
    let select = btn.parentElement.parentElement;
    let input = select.previousElementSibling;
    let head = select.firstElementChild;
    let headText = head.firstElementChild;
    headText.textContent = value;
    input.value = value;
    select.classList.remove('active')
  }

  headScroll(){
    const _ = this;
    let head = document.querySelector('.head');
    if (window.pageYOffset > 132 && window.innerWidth > 1199){
      head.setAttribute('style','padding:20px 0;')
    } else {
      if (head.hasAttribute('style')) head.removeAttribute('style')
    }
  }

  textAnimation(){
    const _ = this;
    let blocks = document.querySelectorAll('section');
    for (let block of blocks){
      if (window.pageYOffset + window.innerHeight - 150 >= block.offsetTop){
        if (!block.hasAttribute('data-animated')){
          block.setAttribute('data-animated',true);
          let units = block.querySelectorAll('.animation');
          gsap.to(units,{x:0,opacity:1,stagger:.3})
        }
      }
    }
  }
}
new Front();
