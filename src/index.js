const galary = document.getElementById('galary');
const dropdownChooseDesk = document.getElementById('dropdown2');//rename
const dropdownMenu = document.getElementById('dropdown1');//rename


const cardClickIdArray = [];
const desks = [{
	idDesk : 1,
	nameDesk : 'Desk1',
	itemsDesk : [],
},{
	idDesk : 2,
	nameDesk : 'Desk2',
	itemsDesk : [],
},{
	idDesk : 3,
	nameDesk : 'Desk3',
	itemsDesk : [],
}];

const getCards = () => new Promise((resolve, reject) => {
	fetch ('https://642a8589b11efeb7599b4947.mockapi.io/cards').then(response => {
		if (response.ok) {
			resolve(response.json());
		}

		reject(new Error('Response is not Ok!'));
	})
})

getCards().then(pins => {
	console.log(pins);
	pins.forEach(pin => {
		const card = createCard(pin.id, pin.image + '?random=' + pin.id, pin.name, pin.avatar, pin.caption); // + '?random=' + pin.id
		galary.append(card);
		card.addEventListener('click', handleCard);
	})
}).catch(error => {
  console.log(error)
})


const handleCard = event => {
	const idClickCard = event.target.closest('.card__wrapper').id;
	cardClickIdArray.push(idClickCard);
	// console.log(cardClickIdArray)
}

const createCard = (id, img, user, avatarImg, caption) => {
	const cardWrapper = document.createElement('div');
	const modalTrigger = document.createElement('a');
	const card = document.createElement('div');
	const cardImage = document.createElement('div');
	const image = document.createElement('img');
	const cardContent = document.createElement('div');
	const userBlock = document.createElement('div');
	const avatar = document.createElement('img');
	const userName = document.createElement('span');
	const cardContentText = document.createElement('p');

	cardWrapper.classList.add('card__wrapper');
	cardWrapper.classList.add('col');
	cardWrapper.classList.add('s6');
	cardWrapper.classList.add('m3');
	cardWrapper.id = id;

	cardWrapper.append(modalTrigger);
	
	modalTrigger.classList.add('modal-trigger');
	modalTrigger.href = '#modal_clickCard';
	modalTrigger.append(card);

	card.classList.add('card');
	card.append(cardImage, cardContent);

	cardImage.classList.add('card-image');
	image.src = img; 
	image.dataset.name = 'card';
	cardImage.append(image);

	cardContent.classList.add('card-content');
	cardContent.append(userBlock, cardContentText);

	userBlock.classList.add('flex');
	userBlock.append(avatar, userName);

	avatar.src = avatarImg;
	avatar.classList.add('avatar');

	userName.append(user);
	userName.classList.add('card-title');

	cardContentText.append(caption);

	return cardWrapper;
}

const hideCards  = arr => {
	const allCards = document.querySelectorAll('.card__wrapper');
	console.log(allCards)
	allCards.forEach(card => {
		if (!arr.includes(card.id)) card.classList.add('hide');
	})
}

const showAllCards = () => {
	const allCards = document.querySelectorAll('.card__wrapper');
	allCards.forEach(card => {
		card.classList.remove('hide');
	})
}


const handleClickChooseDesk = event => {
	const choosenDeskId = event.target.getAttribute('data-idDropdownItem');

	if (!desks[choosenDeskId-1].itemsDesk.includes(cardClickIdArray.at(-1))) {
				desks[choosenDeskId-1].itemsDesk.push(cardClickIdArray.at(-1));
			}

	console.log(desks);

}

const handleClickMenuItem = event => {
	const choosenDeskId = event.target.getAttribute('data-idDropdownItem');
	console.log(desks[choosenDeskId-1]);
	console.log(choosenDeskId === '4')
	if (choosenDeskId === '4') {
		showAllCards();
	} else hideCards(desks[choosenDeskId-1].itemsDesk);


}

dropdownChooseDesk.addEventListener('click', handleClickChooseDesk);
dropdownMenu.addEventListener('click', handleClickMenuItem);
