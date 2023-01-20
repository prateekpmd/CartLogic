let shop = document.getElementById("shop");


let basket = JSON.parse(localStorage.getItem("data")) || [];

let genrateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
     
      
     let search = basket.find((x) => x.id === id) || [];
     
      return `<div id=product-id-${id} class="item">
        <img class='bbw' width="230" src="${img}" alt="" srcset="" />
        <div class="details">
          <h3>${name}</h3>
          <p>
            ${desc}
          </p>
          <div class="price-quantity">
            <h2>₹${price}</h2>
            <div class="buttons"> 
             <i onclick= "dec(${id})" class="bi bi-dash"></i>
              <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
               <i onclick= "inc(${id})" class="bi bi-plus"></i>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join(""));
};

genrateShop();

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
  
    basket = basket.filter((x) => x.item != 0);
   localStorage.setItem("data", JSON.stringify(basket));
   
      
};  

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  cartAmou();
};

function cartAmou() {
 let cartIcon = document.getElementById("cartAmount");
 
cartIcon.innerHTML =basket.reduce((acc,curr)=>{
  return acc+curr.item
},0);

}

cartAmou();


