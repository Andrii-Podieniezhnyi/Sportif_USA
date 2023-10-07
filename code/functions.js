import { dataShorts } from "./data_shorts.js";
import { dataPants } from "./data_pants.js";
import { dataAccessories } from "./data_accessories.js";
import {dataShirts} from "./data_shirts.js"
import { dataBrands } from "./data_brands.js";


// фільтрація масиву за розміром, типом товару та побудова картки з товаром

export function filteredDataAndHtmlCardBuild(currentSize) {
    let filteredData;

    switch (document.location.pathname) {
        case ("/Sportif_USA/pages/shorts.html"): 
            filteredData = dataShorts.filter((item) => item.size.includes(currentSize));
            prodCardBuild(filteredData);
            brandFilter(filteredData);
            inseamFilter(filteredData);
            activateModalCard(filteredData);
            break;
        case ("/Sportif_USA/pages/pants.html"):
            filteredData = dataPants.filter((item) => item.size.includes(currentSize));
            prodCardBuild(filteredData);
            brandFilter(filteredData);
            inseamFilter(filteredData);
            activateModalCard(filteredData);
            break;
        case("/Sportif_USA/pages/accessories.html"):
            filteredData = dataAccessories.filter((item) => item.size.includes(currentSize));
            prodCardBuild(filteredData);
            brandFilter(filteredData);
            activateModalCard(filteredData);
            break;
        case ("/Sportif_USA/pages/shirts.html"):
            filteredData = dataShirts.filter((item) => item.size.includes(currentSize));
            prodCardBuild(filteredData);
            brandFilter(filteredData);
            activateModalCard(filteredData);
            break;
        default:
            break;
    }
}

//



// Функція побудови картки товару

export function prodCardBuild(data) {
    let prodCard = data.map(({prodImg, prodName, prodStars, prodPrice, colorsLine, id, brand, typeOfProd}) => {
        const colorLineHTML = colorsLine.map(variant => `
        <div class="color_option" data-set="${variant.color}" title="${variant.color}">
            <img src="${variant.src}" alt="${variant.color}">
        </div>
    `).join("");
    return`
        <div class="prodCard" id="${id}">
            <div class="prodCard__img">
                <img src="${prodImg}">
            </div>
            <div class="prodCard__name" id="${typeOfProd}">${prodName}</div>
            <div class="prodCard__brand">${brand}</div>
            <div class="prodCard__stars">
                <img src=".${prodStars}">
            </div>
            <div class="prodCard__price">As low as<span>${prodPrice}</span></div>
            <div class="colors_line">${colorLineHTML}</div>
            <div class="button__add_to_cart">
                <button>
                    <a href="http://"><img src="../img/ico/shopping_bag.svg" alt="shopping_bag">ADD TO CART</a>
                </button>
            </div>
        </div>
    `    
}).join("");

    document.querySelector(".content_container").
        insertAdjacentHTML("beforeend", prodCard);
        
}

//


//  Функція страртового заповнення сторінки каталогу 

export function catalogPageOnLoad() {
    switch (document.location.pathname) {
        case ("/Sportif_USA/pages/shorts.html"): 
            prodCardBuild(dataShorts), 
            activateChangingColor(), 
            brandFilter(dataShorts), 
            inseamFilter(dataShorts),
            sizeFilter(dataShorts);
            activateModalCard(dataShorts); 
            break;

        case ("/Sportif_USA/pages/pants.html"):
            prodCardBuild(dataPants), 
            activateChangingColor(), 
            brandFilter(dataPants), 
            inseamFilter(dataPants),
            sizeFilter(dataPants);
            activateModalCard(dataPants);
            break;

        case ("/Sportif_USA/pages/accessories.html"):
            prodCardBuild(dataAccessories), 
            activateChangingColor(), 
            brandFilter(dataAccessories), 
            sizeFilter(dataAccessories);
            activateModalCard(dataAccessories);
             
            document.querySelector(".filter_inseam").
                style.display = "none";
            break;

        case ("/Sportif_USA/pages/shirts.html"):
            prodCardBuild(dataShirts), 
            activateChangingColor(), 
            brandFilter(dataShirts), 
            sizeFilter(dataShirts);
            activateModalCard(dataShirts);
             
            document.querySelector(".filter_inseam").
                style.display = "none";
            break;

        case ("/Sportif_USA/pages/brands.html"):
            dataBrandsToHTML(dataBrands);
            break;
            
        default:
            break;
    }
}

// 


// Функція зміни головного зображення картки продукту при перемиканні кольору

export function changeMainImg(color, currentImg, pathToImgGroup, folderName) {
    let lastSelectedColor;
    let imgPath;

    if (document.location.pathname === "/Sportif_USA/" || document.location.pathname === "/Sportif_USA/index.html") {
        imgPath = `./img/${folderName}/${pathToImgGroup}/${pathToImgGroup}__${color}.jpg`    
    } else {
        imgPath = `../img/${folderName}/${pathToImgGroup}/${pathToImgGroup}__${color}.jpg`    
    }
    
    currentImg.setAttribute("src", imgPath);
    lastSelectedColor = color;
}

//


// Функція для позначення обраного кольору головно зображення картки продукту
 
function setActiveColor(color, currentColorsLine) {
    
    currentColorsLine.forEach((currentColorsLine) => {
        
        if (currentColorsLine.getAttribute("data-set") === color) {
            currentColorsLine.style.border = "2px solid red";
        } else {
            currentColorsLine.style.border = "2px solid transparent"
        }
    })
}

//


//  Функція активації зміни кольору продукту картки 


export function activateChangingColor() {
    const prodCards = document.querySelectorAll(".prodCard");
    const colorOptions = document.querySelectorAll(".color_option");
   
    prodCards.forEach(() => {
        colorOptions.forEach((colorOptions) => {
            colorOptions.addEventListener("mouseover", (e) => {
                const color = e.currentTarget.getAttribute("data-set");
                const currentImg = e.currentTarget.parentElement.parentElement.children[0].children[0];    // головне зображення обраної картки
                const pathToImgGroup = e.currentTarget.parentElement.parentElement.children[1].innerHTML;  // назва продукту обраної картки для побудови шляху до варіацій кольору                
                const currentColorsLine = e.currentTarget.parentElement.querySelectorAll(".color_option");  // вся лінійка кольорів обраної картки
                const folderName = e.currentTarget.parentElement.parentElement.children[1].id;
                
                changeMainImg(color, currentImg, pathToImgGroup, folderName);
                setActiveColor(color, currentColorsLine);
            })
        })        
    }) 
}


//


//  Функція фільтрації за брендом

function brandFilter(data) {

        // Побудова фільтру за брендами в лівій колонці фільтрів

    const uniqueBrands = new Set(data.map(item => item.brand));
    const arrayUniqueBrands = Array.from(uniqueBrands);

    const brandsCheckBox = arrayUniqueBrands.map(brand => {
        return `
        <div>
            <label for="${brand}"><input type="checkbox" name="" id="${brand}">${brand}</label>
        </div>
        `
    }).join("")

    document.querySelector(".filter_brand__content").
        insertAdjacentHTML("beforeend", brandsCheckBox);


        //

        // Фільтрація по брендам

    const brandsInputs = document.querySelectorAll(".filter_brand__content input");
    const contentContainer = document.querySelector(".content_container");
    const filterInseamContent = document.querySelector(".filter_inseam__content")

    let arrayForAllFilteredBrands = [];

    brandsInputs.forEach(input => {
        input.addEventListener("click", () => {
            
            if (input.checked) {
                contentContainer.innerHTML = "";    
                const filteredByBrand = data.filter(item => item.brand.includes(input.id));
                arrayForAllFilteredBrands.push(...filteredByBrand);
                filterInseamContent.innerHTML = "";
                inseamFilter(arrayForAllFilteredBrands);           
                    
            } else if (input.checked === false) {
                contentContainer.innerHTML = "";
                const brandToRemove = input.id; 
                arrayForAllFilteredBrands = arrayForAllFilteredBrands.filter(item => !item.brand.includes(brandToRemove));
                filterInseamContent.innerHTML = "";   
                inseamFilter(arrayForAllFilteredBrands);  
            }  
            
            if (arrayForAllFilteredBrands.length === 0) {
                prodCardBuild(data);
                filterInseamContent.innerHTML = "";
                inseamFilter(data);
            }
        
            prodCardBuild(arrayForAllFilteredBrands);
            activateChangingColor();
            activateModalCard(arrayForAllFilteredBrands);
        })
    })
}

//


// Функція фільтрації по шву (inseam)

function inseamFilter(data) {
    // Побудова лівої колони фільру 
    const inseamSortByNumber = data.sort((a, b) => parseFloat(a.inseam) - parseFloat(b.inseam));
    const uniqueInseam = new Set(inseamSortByNumber.map((item) => item.inseam));
    const uniqueInseamArray = Array.from(uniqueInseam);

    const allInseam = uniqueInseamArray.map(inseam => {
        return`
            <button><span class="inseam_value">${inseam}</span></button>
        `
    }).join("")

    document.querySelector(".filter_inseam__content").
        insertAdjacentHTML("beforeend", allInseam)

    //

    // Логіка фільтрації
    const allFilterInseamSpan = document.querySelectorAll(".inseam_value");
    const contentContainer = document.querySelector(".content_container");
    const filterBrandContent = document.querySelector(".filter_brand__content");
    
    allFilterInseamSpan.forEach(element => {
        element.addEventListener("click", () => {
            // Виділення активного inseam
            allFilterInseamSpan.forEach(element => {
                element.classList.remove("active_inseam");
            })
            element.classList.add("active_inseam");
            //
            const filteredArrayByInseam = data.filter(item => item.inseam === element.innerHTML);
            contentContainer.innerHTML = "";
            filterBrandContent.innerHTML ="";
            prodCardBuild(filteredArrayByInseam);
            brandFilter(filteredArrayByInseam);
            activateChangingColor();
            activateModalCard(filteredArrayByInseam);
        })
    })
}

//



// Функуція фільтрації за розміром (size filter)

function sizeFilter(data) {
    // Побудова фільтру за розміром в лівій колонці фільтрів
    const sizeSortByNumber = data.sort((a, b) => parseFloat(a.size) - parseFloat(b.size));
    const allSizeVariants = new Set(sizeSortByNumber.map(item => item.size));
    const uniqueSizeVariants = new Set([...allSizeVariants].map(JSON.stringify));
    const uniqueSizeVariantsArray =  [...uniqueSizeVariants].map(JSON.parse);
    const uniqueSizes = [...new Set(uniqueSizeVariantsArray.flat())].map(size => [size]);

    uniqueSizes.sort(function(a, b) {
        const order = ['SML', 'MED', 'LRG', 'XL', 'XXL'];

        return order.indexOf(a[0]) - order.indexOf(b[0]);
    })
        
    const uniqueSizesHtml = uniqueSizes.map(size => {
        return `
            <div class="rectangle">${size}</div>
        `
    }).join("")

    document.querySelector(".filter_size__content").
        insertAdjacentHTML("afterbegin", uniqueSizesHtml);


    // Логіка фільтрації    
    const allRectangleFromSizeFilter = document.querySelectorAll(".rectangle");
    const contentContainer = document.querySelector(".content_container");
    const filterBrandContent = document.querySelector(".filter_brand__content");
    const filterInseamContent = document.querySelector(".filter_inseam__content");
    const filterSizeContent =  document.querySelector(".filter_size__content");
    
    allRectangleFromSizeFilter.forEach(rectangle => {
        rectangle.addEventListener("click", function (e) {
            contentContainer.innerHTML = "";
            filterBrandContent.innerHTML = "";
            filterInseamContent.innerHTML = "";
            const currentSize = e.target.innerHTML;

            // Додавння бордеру для виділення активного квадрату з розміром
            allRectangleFromSizeFilter.forEach(rectangle => {
                rectangle.classList.remove("active");
            })
            e.target.classList.add("active");
            //

            filteredDataAndHtmlCardBuild(currentSize);
            activateChangingColor();

            if (currentSize === "ALL") {
                contentContainer.innerHTML = "";
                filterBrandContent.innerHTML = "";
                filterInseamContent.innerHTML = "";

                const rectanglesToRemove = Array.from(allRectangleFromSizeFilter).filter(rectangle => rectangle.textContent != "ALL");

                rectanglesToRemove.forEach(rectangle => {
                    filterSizeContent.removeChild(rectangle)
                })

                catalogPageOnLoad(dataShorts);
                activateChangingColor();
            }
        })
    })  
}


//


// Ф У Н К Ц І Ї    М О Д А Л Ь Н О Г О   В І К Н А

const dotForPageChoice = (document.location.pathname === "/Sportif_USA/" || document.location.pathname === "/Sportif_USA/index.html") ? '' : '.';

// Функція відкриття модального вікна

function showModal() {
    const modalContainerBackground = document.querySelector(".modal_container__background");
    const modalContainer = document.querySelector(".modal_container");

    modalContainerBackground.style.display = "block"
    modalContainer.style.display = "block";
    document.body.style.overflow = "hidden";

}

//

// Функція закриття модального вікна

export function modalClose() {
    const modalContainerBackground = document.querySelector(".modal_container__background");
    const modalContainer = document.querySelector(".modal_container");

    modalContainerBackground.style.display = "none";
    modalContainer.style.display = "none"; 
    document.body.style.overflow = "auto";
    
}

//



// Функція побудови картки модального вікна


function modalCardBuildHtml(data, card) {
    const arrayById = data.filter((item) => item.id === card.id);
    const arrayByIdToHtml = arrayById.map(({prodImg, prodName, prodStars, prodPrice, colorsLine, size, typeOfProd}) => {

        const searchResultBackgroung = document.querySelector(".search_result__backgroung");
        const dotIfModalOnGlobalSearch = (document.location.pathname !== "/Sportif_USA/" && document.location.pathname !== "/Sportif_USA/index.html" && searchResultBackgroung.style.display === "flex") ? '.' : '';

        const sizeLineHTML = size.map(variant => `
            <div class="modal__rectangle">${variant}</div>
            `).join("");

        const colorLineHTML = colorsLine.map(variant => `
            <div class="modal__color_option" data-set="${variant.color}" title="${variant.color}">
                <img src="${dotIfModalOnGlobalSearch}${variant.src}" alt="${variant.color}">
            </div>
            `).join("");

            return `
                <div class="modal__img_container">
                    <div class="modal__zoom_container">
                        <img class="modal__product_image" src="${dotIfModalOnGlobalSearch}${prodImg}">
                    </div>
                </div>
                <div class="modal__content_container">
                    <div class="modal__title" id="${typeOfProd}">${prodName}</div>
                    <div class="modal__prod_stars">
                        <img src="${dotForPageChoice}${prodStars}">
                    </div>
                    <div class="modal__price">As low as<span>${prodPrice}</span></div>
                    <div class="modal__prod_colors">
                        <span>COLOR:</span>
                        <span class="modal__selected_color"></span>
                        <div class="modal__colors_line">${colorLineHTML}</div>
                    </div>
                    <div class="modal__prod_size">
                        <span>SIZE:</span>
                        <span class="modal__selected_size"></span>
                        <div class="modal__rectangle_line">${sizeLineHTML}</div>
                    </div>
                    <div class="modal__add_buttons">
                        <button class="modal__button_add_to_cart">
                            <a href="#"><img src="${dotForPageChoice}./img/ico/shopping_bag.svg" alt="shopping_bag">ADD TO CART</a>    
                        </button>
                        <button class="modal__add_to_wishlist">
                            <a href="#"><img src="${dotForPageChoice}./img/ico/like.png" alt="like">ADD TO WISHLIST</a>
                        </button>
                    </div>
                    <div class="modal__social_buttons">
                        <button>
                            <a href="https://www.facebook.com/" target="_blank"><img src="${dotForPageChoice}./img/ico/social/facebook.png" alt="facebook"></a>
                        </button>
                        <button>
                            <a href="https://twitter.com/" target="_blank"><img src="${dotForPageChoice}./img/ico/social/twitter-x-logo.png" alt="twitter"></a>
                        </button>
                        <button>
                            <a href="http://pinterest.co.uk" target="_blank"><img src="${dotForPageChoice}./img/ico/social/pinterest.png" alt="pinterest"></a>
                        </button>
                        <button>
                            <a href="/" target="_blank"><img src="${dotForPageChoice}./img/ico/social/link.png" alt="link"></a>
                        </button>
                    </div>
                    <div class="modal__footer"></div>
                </div>
            `    
    }).join("")

    const modalMenu = document.querySelector(".modal_menu");
    modalMenu.innerHTML = "";
    modalMenu.insertAdjacentHTML("beforeend", arrayByIdToHtml);

    

    modalChangeMainImg();
    modalSetActiveSize();
    zoomedModalImage();
}


// Фунуція активації модального вікна


function activateModalCard(data) {
    const allProdCards = document.querySelectorAll(".prodCard");

    allProdCards.forEach((card) => {
        card.addEventListener("click", (e) => {
            
            showModal();
            modalCardBuildHtml(data, card);
        }
    )}   
)}

        
        
       
// Функція зміни зображення продукту у модальному вікні за обраним кольором 


export function modalChangeMainImg() {
    const modalColorOption = document.querySelectorAll(".modal__color_option");
    modalColorOption.forEach(colorOption => {
        colorOption.addEventListener("click", (e) => {
            const color = e.target.alt;
            const pathToImgGroup = e.target.parentElement.parentElement.parentElement.parentElement.children[0].innerHTML;
            const currentImg = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[0];
            const modalSelectedColor = document.querySelector(".modal__selected_color");
            const folderName = e.target.parentElement.parentElement.parentElement.parentElement.children[0].id;
            
            // Виділення обраного кольору продукту
            modalSelectedColor.innerHTML = color;
            modalColorOption.forEach(colorOption => {       
                colorOption.classList.remove("active");
            })
            colorOption.classList.add("active");
            //

            
            changeMainImg(color, currentImg, pathToImgGroup, folderName);    
        })
    })
}

//


// Функція виділення обраного розміру продукту в модальному вікні

export function modalSetActiveSize() {
    const modalRectangles = document.querySelectorAll(".modal__rectangle");
    const modalSelectedSize = document.querySelector(".modal__selected_size");

    modalRectangles.forEach(rectangle => {
        rectangle.addEventListener("click", (e) => {
            modalSelectedSize.innerHTML = e.target.innerHTML;
            
            modalRectangles.forEach(rectangle => {
                rectangle.classList.remove("active");
            })
            rectangle.classList.add("active");
        })
    })
}

//



// Функуія зумування зображення продукту в модальному вікні 


function zoomedModalImage() {
    const mainImage = document.querySelector(".modal__product_image");
    const zoomContainer = document.querySelector(".modal__zoom_container");
    let isZoomed = false

    zoomContainer.addEventListener("mouseenter", () => {
      mainImage.classList.add("zoomed");
      isZoomed = true;
    })

    zoomContainer.addEventListener("mousemove", (e) => {
      if (!isZoomed) return;
    
      const zoomContainerRect = zoomContainer.getBoundingClientRect();          // Отримуємо розміри та положення контейнера на сторінці
      const x = e.clientX - zoomContainerRect.left;         // Отримуємо положення курсора в межах контейнера по горизонталі
      const y = e.clientY - zoomContainerRect.top;          // Отримуємо положення курсора в межах контейнера по вертикалі
    
      const translateX = (zoomContainer.clientWidth - mainImage.clientWidth) / 2;           //  Обчислюємо значення для зсуву зображення по горизонталі
      const translateY = (zoomContainer.clientHeight - mainImage.clientHeight) / 2;         //  Обчислюємо значення для зсуву зображення по вертикалі
    
      mainImage.style.transform = `translate(${translateX - x}px, ${translateY - y}px) scale(2)`;           // Задаємо стилі для головного зображення, які дозволяють переміщати його під час руху миші та збільшувати масштаб
    })

    zoomContainer.addEventListener("mouseleave", () => {
      if (!isZoomed) return;
    
      mainImage.style.transform = 'translate(0, 0) scale(1)';           // Повертаємо головне зображення в початкове положення та розмір
      mainImage.classList.remove("zoomed");
      isZoomed = false;
    });
}

//

//




// Функція побудови карток товару при використанні глобального пошуку 


export function searchResultCardBuild (data) {
    const searchResultContent = document.querySelector(".search_result__content");
    const htmlCardBuild = data.map(({prodImg, prodName, prodPrice, brand, id}) => {
         return`
            <div class="search_product__card" id="${id}">
                <div class="img_wrapper">
                    <img src="${dotForPageChoice}${prodImg}">
                </div>
                <div class="search_product__description">
                    <div class="search_product__title">${prodName}</div>
                    <div class="search_product__brand">${brand}</div>
                    <div class="search_product__price">${prodPrice}</div>
                </div>
            </div>
        `                
    }).join(""); 

    searchResultContent.insertAdjacentHTML("beforeend", htmlCardBuild);

    // 
    const searchProductCards = document.querySelectorAll(".search_product__card");

    searchProductCards.forEach(card => {
        card.addEventListener("click", () => {
            modalCardBuildHtml(data, card);
            showModal();
        })
    })
}


// Функція побудови карток брендів сторінки  BRANDS

function dataBrandsToHTML(data) {
    const brandsContainer = document.querySelector(".brands_container");

    const dataBrandsToHTML = data.map(({brandName, brandLogo}) => {
        return `
            <div class="brand_card">
                <div class="brand_logo">
                    <img src="${brandLogo}">
                </div>
                <div class="brand_title">${brandName}</div>
            </div>
        `
    }).join("");

    brandsContainer.insertAdjacentHTML("beforeend", dataBrandsToHTML);
}



// Перевірка поля вводу email 


export function emailInputCheck(){
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
}
