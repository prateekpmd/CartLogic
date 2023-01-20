
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];


function cartAmou() {
  let cartIcon = document.getElementById("cartAmount");
cartIcon.innerHTML = basket.reduce((acc, curr) => {
  return acc + curr.item;
}, 0);
}

cartAmou();

function generateCartItems (){
    if(basket.length!=0){
        shoppingCart.innerHTML=basket.map((x)=>{
          let {id,item}=x;
          
          let search=shopItemsData.find((y)=>y.id===id ) ||[];
         
          return `
          <div class="cart-item">
             <img width="130" src="${search.img}" alt=" "/>
              <div class="details-1">
                 <div class="title-price-x">
                    <h4 class="title-price"> 
                       <p>${search.name} </p>
                        <i onclick="remove(${id})" class="bi bi-x"></i>
                    </h4>  
                    <span class='cart-item-price'>₹ ${search.price} </span>      
               </div>
                
            <div class="buttons">
            <i onclick= "dec(${id})" class="bi bi-dash"></i>
              <div id=${id} class="quantity">${item}</div>
               <i onclick= "inc(${id})" class="bi bi-plus"></i>
            </div>
           <h3>Total: ₹${item * search.price}</h3>
          </div>
          </div>

          `;

        }).join("");
    }
    else{
      label.innerHTML=`
        <h2>Cart is Empty </h2>
        <a href="index.html">
        <button class="HomeBtn">Home</button>
        </a>
        `;
        shoppingCart.innerHTML=``;
      
    }
}

generateCartItems();

let inc = (id) => {

  let selectedItem = id;
  
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({   
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  
  update(selectedItem.id);
  totalAmount();
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

function dec(id) {

   let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if(search === undefined) return;
  else if (search.item === 0) return;
   else {
    search.item -= 1;
  }
     update(selectedItem.id);
     totalAmount();
    basket = basket.filter((x) => x.item != 0);
    generateCartItems();
   localStorage.setItem("data", JSON.stringify(basket));
   
      
};


let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  cartAmou();
};

function cartAmou() {
  let cartIcon = document.getElementById("cartAmount");

  cartIcon.innerHTML = basket.reduce((acc, curr) => {
    return acc + curr.item;
  }, 0);
}

cartAmou();


function remove(id){
  let selected=id;
 
  basket=basket.filter((x)=>x.id !== selected.id)
  generateCartItems();
     localStorage.setItem("data", JSON.stringify(basket));
     cartAmou();
     totalAmount();

} 

function totalAmount(){
  if(basket.length!=0){
    let amount=basket.map((x)=>{
      let {id,item}=x;
      let search=shopItemsData.find((y)=>y.id===id);
      let final=search.price *item;
      return final
    }).reduce((acc,curr)=>acc+curr ,0);
    label.innerHTML = `
    <h2> Total Bill :  ₹${amount}</h2>
    <div class="bbb">
     <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeall">Clear Cart </button>
    </div>
    `;

  }else{ 

  }

}

totalAmount();


function clearCart(){
  let ne=basket.splice(0);
 
  
  generateCartItems();
  cartAmou();
  localStorage.setItem("data", JSON.stringify(basket));
}