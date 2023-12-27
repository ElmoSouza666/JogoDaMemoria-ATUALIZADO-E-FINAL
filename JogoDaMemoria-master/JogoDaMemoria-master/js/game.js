const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


const characters = [
    'douma',
    'inosuke',
    'mitsuri',
    'nezuko',
    'obanai',
    'shinobu',
    'tanjiro',
    'tokito',
    'tomioka',
    'zenitsu',

];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
} 

let firstCard = '';
let secondCard = '';


const checkEndGame = () =>{
    const desativarCards = document.querySelectorAll('.desativarCard')

    if(desativarCards.length == 20){
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`)
    }
}

const checkCards = () =>{
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter == secondCharacter){
        firstCard.firstChild.classList.add('desativarCard');
        secondCard.firstChild.classList.add('desativarCard');

        
        firstCard = '';
        secondCard = '';

        checkEndGame();

    }else{
        setTimeout(() => {
            
            firstCard.classList.remove('revelar');
            secondCard.classList.remove('revelar');

            firstCard = '';
            secondCard = '';
        }, 500);

    }
}

const revelar = ({target}) =>{
    //IF PARA AO CLICAR NA CARTA, REVELAR
    if(target.parentNode.className.includes('revelar')){
        return;
    }

    if(firstCard == ''){
        target.parentNode.classList.add('revelar');
        firstCard = target.parentNode;
    
    }else if(secondCard == ''){
        target.parentNode.classList.add('revelar');
        secondCard = target.parentNode;

        checkCards();

    }
    
}

//CRIAR CARTA
const createCard = (character) =>{
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');


    front.style.backgroundImage = `url('../imagens/${character}.jfif')`;

    //acrescentar um filho na div
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revelar);
    card.setAttribute('data-character', character)

    return card;

}

//CARREGAR O JOGO

const loadGame = () =>{

    const duplicar = [ ...characters, ...characters ];

    //embaralhar
    const shuffledArray = duplicar.sort( () => Math.random() - 0.5);

    

    shuffledArray.forEach((character) =>{


        const card = createCard(character);
        grid.appendChild(card);

    }); 


    
}


const startTimer = () =>{
    this.loop = setInterval(() => {

        const tempoAtual =  Number(timer.innerHTML);
        timer.innerHTML = tempoAtual + 1;

    }, 1000);
}


window.onload = () => {
   spanPlayer.innerHTML =  localStorage.getItem('player');
   startTimer();

   loadGame();
}

console.log(this);

