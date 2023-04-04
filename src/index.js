const galary = document.getElementById('galary');
const dropdownChooseDesk = document.getElementById('dropdown2');

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


fetch('https://642a8589b11efeb7599b4947.mockapi.io/cards', {
  method: 'GET',
  headers: {'content-type':'application/json'},
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(pins => {
	console.log(pins);
	pins.forEach(pin => {
		const card = createCard(pin.id, pin.image + '?random=' + pin.id, pin.name, pin.avatar, pin.caption);
		galary.append(card);
		card.addEventListener('click', handleCard);

	})
  // Do something with the list of tasks
}).catch(error => {
  // handle error
})

const handleCard = event => {
	const idClickCard = event.target.closest('.card__wrapper').id;
	cardClickIdArray.push(idClickCard)
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
	image.dataset.name = 'card'
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

const handleClickChooseDesk = event => {
	const choosenDeskId = event.target.getAttribute('data-idDropdownItem');

	if (!desks[choosenDeskId-1].itemsDesk.includes(cardClickIdArray.at(-1))) {
				desks[choosenDeskId-1].itemsDesk.push(cardClickIdArray.at(-1));
			}

	// console.log(desks);

}

dropdownChooseDesk.addEventListener('click', handleClickChooseDesk);
