// import sampleImage from './img/sample-1.jpg';
import * as images from './img/cardImages/*.webp';
// console.log(images)

const galary = document.getElementById('galary');
const arrayCards = [
  { id: 1, user: "Анастасия Иванова", caption: "Кот в коробке" },
  { id: 2, user: "Сергей Смирнов", caption: "Закат на море" },
  { id: 3, user: "Ольга Кузнецова", caption: "Лес в тумане" },
  { id: 4, user: "Алексей Попов", caption: "Цветущие яблони" },
  { id: 5, user: "Марина Лебедева", caption: "Зимняя ночь" },
  { id: 6, user: "Дмитрий Новиков", caption: "Река в горах" },
  { id: 7, user: "Кирилл Козлов", caption: "Небо в огне" },
  { id: 8, user: "Екатерина Васильева", caption: "Кошка на дереве" },
  { id: 9, user: "Андрей Петров", caption: "Осенний лес" },
  { id: 10, user: "Анна Сидорова", caption: "Горный пейзаж" },
];
const deskDogs = [];
const deskIce = [];
const deskElephants = [];



const createCard = (img, user, caption) => {
	const cardWrapper = document.createElement('div');
	const card = document.createElement('div');
	const cardImage = document.createElement('div');
	const image = document.createElement('img');
	const cardContent = document.createElement('div');
	const userName = document.createElement('span');
	const cardContentText = document.createElement('p');

	cardWrapper.append(card);
	cardWrapper.classList.add('card__wrapper');
	cardWrapper.classList.add('col');
	cardWrapper.classList.add('s6');
	cardWrapper.classList.add('m3');

	card.classList.add('card');
	card.append(cardImage, cardContent);

	cardImage.classList.add('card-image');
	image.src = img; 
	image.dataset.name = 'card'
	cardImage.append(image);

	cardContent.classList.add('card-content');
	cardContent.append(userName, cardContentText);
	userName.append(user);
	userName.classList.add('card-title');

	cardContentText.append(caption);

	return cardWrapper;
}

// const handlerCardHover = (event) => {
// 	console.log(event.target);
// 	if (event.target.dataset.name === 'card') { 
// 		console.log('yo');
// 	}
// }

arrayCards.forEach(item => {
	const card = createCard(images[item.id], item.user, item.caption);
	galary.append(card);
	// card.addEventListener('click', handlerCardHover);


});




