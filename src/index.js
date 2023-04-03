const galary = document.getElementById('galary');

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
		console.log(pin);
		const card = createCard(pin.id, pin.image, pin.name, pin.avatar, pin.caption);
		galary.append(card);
	})
  // Do something with the list of tasks
}).catch(error => {
  // handle error
})

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
	cardWrapper.append(modalTrigger);
	
	modalTrigger.classList.add('modal-trigger');
	modalTrigger.href = '#modal_clickCard';
	modalTrigger.append(card);


	card.classList.add('card');
	card.id = id;
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

// const handlerCardHover = (event) => {
// 	console.log(event.target);
// 	if (event.target.dataset.name === 'card') { 
// 		console.log('yo');
// 	}
// }

