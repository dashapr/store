const items = [{
        title: "Кулон",
        description: "Аметист",
        tags: ["pendant"],
        price: 500,
        img: "./img/1.jpg",
    },
    {
        title: "Подвеска",
        description: "Pearl",
        tags: ["pendant"],
        price: 900,
        img: "./img/2.jpeg",
    },
    {
        title: "Кольцо",
        description: "Beaded breakfast",
        tags: ["ring"],
        price: 300,
        img: "./img/3.jpg",
    },
    {
        title: "Браслет",
        description: "Soul sisters",
        tags: ["bracelet"],
        price: 660,
        img: "./img/4.jpg",
    },
    {
        title: "Кольцо",
        description: "Лимонад",
        tags: ["ring"],
        price: 400,
        img: "./img/5.jpg",
    },
    {
        title: "Моносерёжка",
        description: "Розовый жемчуг",
        tags: ["earring"],
        price: 200,
        img: "./img/6.jpg",
    },
    {
        title: "Серьги",
        description: "Сердце",
        tags: ["earring"],
        price: 300,
        img: "./img/7.jpg",
    },
    {
        title: "Браслет",
        description: "С волнами",
        tags: ["bracelet"],
        price: 500,
        img: "./img/8.jpg",
    },
    {
        title: "Сережки",
        description: "С маленькими ласточками",
        tags: ["earring"],
        price: 1500,
        img: "./img/9.jpg",
    },
    {
        title: "Серьги",
        description: "С жемчугом",
        tags: ["earring"],
        price: 800,
        img: "./img/10.jpg",
    },
    {
        title: "Кольцо",
        description: "Коала",
        tags: ["ring"],
        price: 3500,
        img: "./img/11.jpg",
    },
    {
        title: "Кольцо",
        description: "Из бисера",
        tags: ["ring"],
        price: 800,
        img: "./img/12.jpeg",
    },
];



const itemTemplate = document.querySelector('#item-template');
const itemsContainer = document.querySelector('#shop-items');


function prepareShopItem(shopItem) {
    // Деструктурируем свойства объекта
    const { title, description, tags, img, price } = shopItem;

    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}P`;



    // Находим шаблон для тегов
    const tagsHolder = item.querySelector(".tags");

    // Отрисовываем теги для товара
    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });

    return item;
}


items.forEach((item) => {
    itemsContainer.append(prepareShopItem(item));
});

// Инпут для поиска
const searchInput = document.querySelector("#search-input");
// Кнопка
const searchButton = document.querySelector("#search-btn");

// Функция для поиска по товарам (сбрасывает фильтры)
function applySearch() {
    // Взяли значение инпута и "причесали" его
    // Привели к нижнему регистру, чтобы написание не мешало поиску
    const searchString = searchInput.value.trim().toLowerCase();

    // Нашли все товары, в title которых есть searchString
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    // Отсортировали их по алфавиту
    currentState.sort((a, b) => sortByAlphabet(a, b));
    // Отрисовали результаты поиска
    renderItems(currentState);
    // По умолчанию сортировка "по алфавиту"
    sortControl.selectedIndex = 0;
}

// Обработчик при клике на кнопку поиска
searchButton.addEventListener("click", applySearch);
// Обработчик события поиска при взаимодействии с инпутом
searchInput.addEventListener("search", applySearch);





// Товары после применения поиска / фильтров
// которые мы будем показывать пользователю
let currentState = [...items];

// Текст, если ничего не найдено
const nothingFound = document.querySelector("#nothing-found");

// Функция для отрисовки
// В качестве параметра — товары, которые нужно отрисовать
function renderItems(arr) {
    // Сбрасываем текст "Ничего не найдено" после предыдущего поиска
    nothingFound.textContent = "";
    // И чистим контейнер с товарами на случай, если там что-то было
    itemsContainer.innerHTML = "";
    // Отрисовываем товары из переданного параметра arr
    arr.forEach((item) => {
        // Вызываем prepareShopItem для каждого товара
        // И подставляем результат в верстку
        itemsContainer.append(prepareShopItem(item));
    });
    // Если массив товаров пустой, отображаем текст, что ничего не нашлось
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

// Функция-хелпер для сортировки товаров по алфавиту
function sortByAlphabet(a, b) {
    // Смотрим на свойство title
    // Если title первого товара алфавитно больше второго...
    if (a.title > b.title) {
        return 1;
    }
    // Если title второго товара больше
    if (a.title < b.title) {
        return -1;
    }
    // Если они равны
    return 0;
}

// Вызываем функцию для отрисовки в самом начале
// И тут же сортируем по алфавиту
renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));