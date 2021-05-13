// animate cards
var mq = window.matchMedia( "(max-width: 470px)" );
if (mq.matches) {
    // window width is at less than 470px
    $(document).ready(function(){
      $(window).scroll(function(){
        var posTop=$(document).scrollTop();
        // console.log(posTop)
        if(posTop>100&&posTop<400)$('.card-1').addClass('animate__animated animate__zoomIn')
        if(posTop>500&&posTop<900)$('.card-2').addClass('animate__animated animate__zoomIn')
        if(posTop>1000&&posTop<1400)$('.card-3').addClass('animate__animated animate__zoomIn')
        if(posTop>1600&&posTop<1900)$('.card-4').addClass('animate__animated animate__zoomIn')
        if(posTop>2000&&posTop<2600)$('.card-5').addClass('animate__animated animate__zoomIn')
        if(posTop>2700&&posTop<3300)$('.card-6').addClass('animate__animated animate__zoomIn')
        if(posTop>3400&&posTop<3800)$('.card-7').addClass('animate__animated animate__zoomIn')
        if(posTop>3900&&posTop<4300)$('.card-8').addClass('animate__animated animate__zoomIn')
        if(posTop>4300&&posTop<4800)$('.card-9').addClass('animate__animated animate__zoomIn')
      });
    });
}
else {
    // window width is greater than 570px
    $(document).ready(function(){
      $(window).scroll(function(){
        var posTop=$(document).scrollTop();
        console.log(posTop)
        if(posTop>200&&posTop<400)$('.card-1,.card-2,.card-3').addClass('animate__animated animate__zoomIn')
        if(posTop>500&&posTop<900)$('.card-4,.card-5,.card-6').addClass('animate__animated animate__zoomIn')
        if(posTop>1000&&posTop<1400)$('.card-7,.card-8,.card-9').addClass('animate__animated animate__zoomIn')      
      });
    });
    }

    // animate logo
var textWrapper = document.querySelector('.logo .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letters'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.logo .letters',
    translateY: ["1.1em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    rotateZ: [180, 0],
    duration: 750,
    easing: "easeOutExpo",
    delay: (el, i) => 50 * i
  }).add({
    targets: '.logo',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });



let carts=document.querySelectorAll('.add');

refreshCart();   // load local data
let products=[
    {
    name:'Apple i10',
    price:999.99,
    incart:0,
    productTag:19
    },
    {
    name:'Samsung S7',
    price:999.99,
    incart:0,
    productTag:3
    },
    {
    name:'Vivo V20',
    price:999.99,
    incart:0,
    productTag:4
    },
    {
    name:'One Plus',
    price:999.99,
    incart:0,
    productTag:5
    },
    {
    name:'Micromax MX',
    price:999.99,
    incart:0,
    productTag:6
    },
    {
    name:'RealMe R3',
    price:999.99,
    incart:0,
    productTag:8
    },
    {
    name:'Vivo V10',
    price:999.99,
    incart:0,
    productTag:2
    },
    {
    name:'ReadMe',
    price:999.99,
    incart:0,
    productTag:11
    },
    {
    name:'Google Pixel',
    price:999.99,
    incart:0,
    productTag:20
    },
]

// first time check
function refreshCart() {
    let productNumbers=localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart-btn span').textContent= productNumbers; 
    }
}

// total cart items
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click',()=>{
    cartNumbers(products[i]);
    totCost(products[i]);
    alert("Item Added In Cart ");
    })  
}



// update items in cart first time click or more time click
function cartNumbers(product) {
    let productNumbers=localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
   if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers+1);
    document.querySelector('.cart-btn span').textContent= productNumbers+1; 
   }else{
    localStorage.setItem('cartNumbers',1)  
    document.querySelector('.cart-btn span').textContent=1; 
   }
   setItems(product)
}

// set items in local storage 
function setItems(product) {
    let cartItems=localStorage.getItem("productsInCart")
    cartItems=JSON.parse(cartItems)
    if (cartItems!=null) {
        if (cartItems[product.productTag]==undefined) {
            cartItems={
                ...cartItems,
                [product.productTag]:product
            }
        }
        cartItems[product.productTag].incart+=1;
    }else{
        product.incart=1;
        cartItems={
            [product.productTag]:product
        }
    }
   
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}
//total cost
function totCost(product) {
    // console.log(product.price)
    let totCost=localStorage.getItem("total")
       if (totCost!=null) {
        totCost=parseFloat(totCost)
        localStorage.setItem("total",totCost+product.price)

    }else{
        localStorage.setItem("total",product.price)
    }       
}



// displayItems();
function displayItems() {
    let cartItems=localStorage.getItem("productsInCart")
    cartItems=JSON.parse(cartItems)
    let productContainer=document.querySelector(".product-container")
    let footContainer=document.querySelector(".foot-container")
    let totalPrice=document.querySelector(".total-price")
    // console.log(cartItems)
    let productNumbers=localStorage.getItem('cartNumbers');
    let totCost=localStorage.getItem("total")
    // totCost= totCost.toPrecision(8)
    // console.log(typeof totCost)
    totCost=parseFloat(totCost)
    totCost=totCost.toFixed(2)

    
    if (cartItems!=null&&productContainer!=null) {
        productContainer.innerHTML="";

        totalPrice.innerHTML=`<div class="card text-dark bg-warning mb-3" style="max-width: 18rem;">
        <div class="card-header">Cart Total</div>
        <div class="card-body">
          <h5 class="card-title"></h5>
          <p class="card-text">Total Price => $${totCost}</p>
          <p class="card-text">Quantity => ${productNumbers}</p>
          <button type="button" class="btn btn-dark">Buy Now</button>
          <button type="button" class="clear-all btn btn-dark">Clear All</button>
        </div>
      </div>`

        Object.values(cartItems).map(item=>{
            productContainer.innerHTML += ` <div class="card-add card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                 <img src="images/${item.productTag}.jpg" alt="...">
              </div>
              <div class="right col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${item.name}<i class="delete-item far fa-trash-alt"></i></h5>
                  <h6 class="card-price">Price : $${item.price}</h6>
                  <h6 class="card-quan">Quantity : ${item.incart}</h6>
                  <p class="card-desc">Description : <br>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, asperiores. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis, cumque.</p>
                </div>
              </div>
            </div>
          </div>`
        })
    }else{
        productContainer.innerHTML='<h4><i class="far fa-sad-cry"></i> No Items</h4>'
        footContainer.innerHTML=` <div class="foot" style="position: absolute;bottom: 0;">
        <ul class="items">
          <a href="#" class="item">Privacy</a>
          <a href="#" class="item">Terms</a>
          <a href="#" class="item">Contact</a>
        </ul>
        <h3>Shop<span>Phone</span> || Animesh © 2021</h3>
      </div>`
        
    }
}

displayItems();
let clearAll=document.querySelector(".clear-all")
clearAll.addEventListener('click',()=>{
        let cartItems=localStorage.getItem("productsInCart")
        let totalPrice=document.querySelector(".total-price")
        let footContainer=document.querySelector(".foot-container")
        let productContainer=document.querySelector(".product-container")
    
        localStorage.removeItem("productsInCart")
        localStorage.setItem("total",0)
        localStorage.setItem("cartNumbers",0)
        refreshCart();
        totalPrice.innerHTML=``
        productContainer.innerHTML='<h4><i class="far fa-sad-cry"></i> No Items</h4>'
        footContainer.innerHTML=` <div class="foot" style="position: absolute;bottom: 0;">
        <ul class="items">
          <a href="#" class="item">Privacy</a>
          <a href="#" class="item">Terms</a>
          <a href="#" class="item">Contact</a>
        </ul>
        <h3>Shop<span>Phone</span> || Animesh © 2021</h3>
      </div>`
        
    })




