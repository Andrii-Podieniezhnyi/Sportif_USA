import { dataSportifUSA } from "./data_sportif_USA.js";
import {catalogPageOnLoad, modalClose, searchResultCardBuild} from "./functions.js";



const current_discount_40_percent = dataSportifUSA.filter((item) => item.keywords.includes("40 percent off"));

const current_discount_40_percent__card = current_discount_40_percent.map(({prodImg, prodName, prodStars, prodPrice, brand}) => {
    return`
    <div class="now_off__1__card">
        <div class="now_off__1__img">
            <img src="${prodImg}">
        </div>
        <div class="now_off__1__prod_name">${prodName}</div>
        <div class="now_off__1__prod_brand">${brand}</div>
        <div class="now_off__1__now_off__1__prod_stars">
            <img src="${prodStars}">
        </div>
        <div class="now_off__1__prod_price">As low as<span>${prodPrice}</span></div>
        <div class="button__add_to_cart">
            <button>
                <a href="#"><img src="./img/ico/shopping_bag.svg" alt="shopping_bag">ADD TO CART</a>
            </button>
        </div>
    </div>
    `
}).join("");

if (document.querySelector(".now_off__1__content_container") != null) {
    document.querySelector(".now_off__1__content_container")
    .insertAdjacentHTML("beforeend", current_discount_40_percent__card);    
}



// button "back_to_top"

const buttonBackToTop = document.querySelector(".back_to_top");

window.addEventListener("scroll", function () {

    if (window.scrollY > 1500) {
        buttonBackToTop.classList.add("visible");
    } else {
        buttonBackToTop.classList.remove("visible")
    }
})

buttonBackToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth"})
})

//


// Сторінка каталогу

const contentContainer = document.querySelector(".content_container");

catalogPageOnLoad();

    
// rotate img      

const rotateImg = document.querySelectorAll(".rotateImg");
const filterSizeContent = document.querySelector(".filter_size__content");
const filterBrandContent = document.querySelector(".filter_brand__content");
const filterInseamContent = document.querySelector(".filter_inseam__content");
const filterBrand = document.querySelector(".filter_brand");
const filterInseam = document.querySelector(".filter_inseam");
    
rotateImg.forEach((element) => {
    element.addEventListener("click", function () {
        element.classList.toggle("rotate");
        const filterSizeContentComputedStyle = window.getComputedStyle(filterSizeContent);
        const filterBrandContentComputedStyle = window.getComputedStyle(filterBrandContent);
        const filterInseamContentComputedStyle = window.getComputedStyle(filterInseamContent);
        
        if (filterSizeContentComputedStyle.display === "none" && element.previousElementSibling.innerHTML === "SIZE") {
            filterSizeContent.style.display = "flex";
            filterBrand.style.top = "100px";
            filterInseam.style.top = "100px";

        } else if (filterBrandContentComputedStyle.display === "none" && element.previousElementSibling.innerHTML === "BRAND") {
            filterBrandContent.style.display = "flex";
        } else if (filterInseamContentComputedStyle.display === "none" && element.previousElementSibling.innerHTML === "INSEAM") {
            filterInseamContent.style.display = "flex";
        } else {
            switch (element.previousElementSibling.innerHTML) {
                case "SIZE": 
                    filterSizeContent.style.display = "none"
                    filterBrand.style.top = "0";               
                    filterInseam.style.top = "0";             
                    break;
                case "BRAND":
                    filterBrandContent.style.display = "none"
                    break;
                case "INSEAM":
                    filterInseamContent.style.display = "none";
                    break;
                default:
                    break;
            }
        }
    })    
})

//


// Модальне вікно

const modalContainerBackground = document.querySelector(".modal_container__background");

if (modalContainerBackground != null) {
    modalContainerBackground.addEventListener("click", (e) => {
        if (e.target === modalContainerBackground) {
            modalClose()
        }
    })    
}

//


// Глобальний пошук

const divSearch = document.querySelector(".search")
const searchInput =  document.querySelector(".search input");
const searchResultBackgroung = document.querySelector(".search_result__backgroung");
const searchResultContainer = document.querySelector(".search_result__container");
    
searchInput.addEventListener("input", () => {
    const searchResultContent = document.querySelector(".search_result__content");
    searchResultContent.innerHTML = "";

    if (searchInput.value) {
        searchResultBackgroung.style.display = "flex";
    } else {
        searchResultBackgroung.style.display = "none";
        searchResultContent.innerHTML = "";
        return;
    }
    
    searchInput.addEventListener("focus", () => {
        if (searchInput.value) {
            searchResultBackgroung.style.display = "flex";    
        }
    })

    document.addEventListener("click", (e) => {
        const modalMenu = document.querySelector(".modal_menu");

        if (e.target !== searchResultBackgroung && !searchResultBackgroung.contains(e.target) &&
            e.target !== searchResultContainer && !searchResultContainer.contains(e.target) && 
            e.target !== divSearch && !divSearch.contains(e.target)) {
            searchResultBackgroung.style.display = "none";
        }
    })

    let searchInputValue = searchInput.value.toLowerCase();

    const searchResult = dataSportifUSA.filter((item) => item.prodName.toLowerCase().includes(searchInputValue));
    
    searchResultCardBuild(searchResult);
})




//


// Перевірка поля вводу email 



const subscribeButton = document.querySelector(".subscribe_button");
    subscribeButton.addEventListener("click", (e) => {
        e.preventDefault();
        
        let emailInput = document.querySelector(".email_input");
        const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const messageText = document.querySelector(".message_text");
    
        if (emailRegex.test(emailInput.value)) {
            messageText.style.display = "flex";
            messageText.textContent = "You got subscribed";
            emailInput.value = "";
        } else {
            messageText.style.display = "flex";
            messageText.textContent = "Invalid email adress";
        }

        setTimeout(() => {
           messageText.style.display = "none";
           messageText.textContent = ""; 
        }, 3000);    
    })