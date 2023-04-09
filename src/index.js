const galary = document.getElementById('galary');
const dropdownChooseDesk = document.getElementById('dropdown2');//rename
const dropdownMenu = document.getElementById('dropdown1');//rename
const search = document.getElementById('search');

const imagesUrlArr = [];
const cardClickIdArray = [];
const desksTemplate = [{
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
const desksFromStorage = localStorage.getItem('desks');
const desks = desksFromStorage ? JSON.parse(desksFromStorage) : desksTemplate;

const storageRefresh = (arrDesks) => {
  localStorage.setItem('desks', JSON.stringify(arrDesks));
}

const getCards = () => new Promise((resolve, reject) => {
	fetch ('https://642a8589b11efeb7599b4947.mockapi.io/cards').then(response => {
		if (response.ok) {
			resolve(response.json());
		}

		reject(new Error('Response is not Ok!'));
	})
})

const getImages = () => new Promise((resolve, reject) => {
	fetch ('https://pixabay.com/api/?key=35227121-472e421ffe50edef9849f302f&q=flowers&image_type=photo&per_page=30&min_width=340&min_height=640&image_type=photo&orientation=vertical').then(response => {
		if (response.ok) {
			resolve(response.json());
		}

		reject(new Error('Response is not Ok!'));
	})
})

getImages().then(images => {
	console.log(images.hits);
	images.hits.forEach(img => {
		// console.log(img.webformatURL);
		imagesUrlArr.push(img.webformatURL);
	})
}).catch(error => {
  console.log(error)
})

getCards().then(pins => {
	console.log(pins);
	pins.forEach(pin => {
		const card = createCard(pin.id, imagesUrlArr[pin.id - 1], pin.name, pin.avatar, pin.caption); //pin.image + '?random=' + pin.id
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
	cardWrapper.classList.add('hoverable');
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

	cardContentText.classList.add('card__caption');

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
				storageRefresh(desks);
			}
	console.log(desks);
}

const handleClickMenuItem = event => {
	const choosenDeskId = event.target.getAttribute('data-idDropdownItem');
	// console.log(desks[choosenDeskId-1]);
	// console.log(choosenDeskId === '4')

	if (choosenDeskId === '4') {
		showAllCards();
	} else {
		showAllCards();
		hideCards(desks[choosenDeskId-1].itemsDesk);
	}
}

const handleSearch = ({target: { value }}) => {
	const allCards = document.querySelectorAll('.card__wrapper');
	console.log(allCards)
	
	if (!allCards) {
		return;
	}

	allCards.forEach(card => {
    const captionText = card.querySelector('.card__caption').textContent;

		if (!captionText.includes(value)) {
      card.classList.add('filter');
    } else {
      card.classList.remove('filter');
    }
	})
}

dropdownChooseDesk.addEventListener('click', handleClickChooseDesk);
dropdownMenu.addEventListener('click', handleClickMenuItem);
search.addEventListener('input', handleSearch);
