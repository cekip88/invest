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
    _.leadMap();
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
    let head = document.querySelector('.head');
    if (window.pageYOffset > 132 && window.innerWidth > 1199){
      head.setAttribute('style','padding:20px 0;')
    } else {
      if (head.hasAttribute('style')) head.removeAttribute('style')
    }
  }

  textAnimation(){
    let blocks = document.querySelectorAll('.animation-block');
    if (!blocks.length) return;
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

  leadMap(){
    let map = document.querySelector('.contacts-map iframe');
    if (map) map.setAttribute('src','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3043.5649951409064!2d-74.30058058443582!3d40.285412371539124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3d3f7a3d2a35d%3A0x40b1f83007afe202!2zMjAwIENyYWlnIFJkLCBNYW5hbGFwYW4gVG93bnNoaXAsIE5KIDA3NzI2LCDQodCo0JA!5e0!3m2!1sru!2skz!4v1615911286891!5m2!1sru!2skz')
  }
}
new Front();
