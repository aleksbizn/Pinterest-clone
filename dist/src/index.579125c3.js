// document.addEventListener('DOMContentLoaded', function() {
// 	// Получаем ссылку на элемент dropdown
// const dropdown = document.querySelector('.dropdown-trigger');
// // Создаем экземпляр класса Dropdown и передаем в него элемент dropdown
// const instance = M.Dropdown.init(dropdown, {
//   // Отключаем активацию по наведению, включаем по клику
//   hover: false
// });
// });
const galary = document.getElementById("galary");
const createCard = (img, user, caption)=>{
    const cardWrapper = document.createElement("div");
    const card = document.createElement("div");
    const cardImage = document.createElement("div");
    const image = document.createElement("img");
    const cardContent = document.createElement("div");
    const cardContentText = document.createElement("p");
    cardWrapper.append(card);
    cardWrapper.classList.add("card__wrapper");
    cardWrapper.classList.add("col");
    cardWrapper.classList.add("s6");
    cardWrapper.classList.add("m3");
    card.classList.add("card");
    card.append(cardImage, cardContent);
    cardImage.classList.add("card-image");
    image.src = `./img/sample-1.jpg`;
    cardImage.append(image);
    cardContent.append(cardContentText);
    cardContentText.append(caption);
    return cardWrapper;
};
galary.append(createCard(1, "a", "About picture"));
galary.append(createCard(1, "a", "About picture"));
galary.append(createCard(1, "a", "About picture"));
galary.append(createCard(1, "a", "About picture"));
galary.append(createCard(1, "a", "About picture"));
galary.append(createCard(1, "a", "About picture"));

//# sourceMappingURL=index.579125c3.js.map
