import './sass/main.scss';
import * as basicLightbox from 'basiclightbox'

const submitRef = document.querySelector('#submit');
const loadMoreBtnRef = document.querySelector('#load-more-button');
const contentContainer = document.querySelector('.content__gallery');

import template from './handlebars/template.hbs';

// console.log(template({}));
import ImagesApiService from './js/apiService.js';
const imagesApiService = new ImagesApiService();

// inputRef.addEventListener('input', debounce((e) => {
//     //     const test = e.target.value
//     // console.log(test);

//     // console.log(apiService.then(data => console.log(data)));
//     // apiService.fetchArticles()
// }, 500)
// )
loadMoreBtnRef.style.display = 'none'
submitRef.addEventListener('click', (e) => {
    e.preventDefault()
    contentContainer.innerHTML = '';
    //чищу контейнер если пользователь поменяет запрос
    const inputValue = e.currentTarget.parentNode.elements.query.value;

    imagesApiService.req = inputValue;
    imagesApiService.resetPage()
    imagesApiService.fetchArticles().then(appendArticlesMarkup)
    // imagesApiService.fetchArticles().then(data => console.log(data))

    setTimeout(() => {
        const element = document.querySelector('.content__gallery');
        element.scrollIntoView({
        behavior: 'smooth',
        block: 'end'});
    }, 1000);
    
    //снизу вешаю слушатель на кнопку 
    loadMoreBtnRef.style.display = 'block'
    loadMoreBtnRef.addEventListener('click', (e) => {
        e.preventDefault()
        imagesApiService.fetchArticles().then(appendArticlesMarkup)

        setTimeout(() => {
            const element = document.querySelector('.content__gallery');
            element.scrollIntoView({
            behavior: 'smooth',
            block: 'end'});
        }, 1000);

    })
})



function appendArticlesMarkup(articles) {
    contentContainer.insertAdjacentHTML('beforeend', template(articles))

}

contentContainer.addEventListener('click', ((e) => {
    if (e.target.tagName == 'IMG') {
        const instance = basicLightbox.create(`<img class="lightbox-img" src="${e.target.getAttribute('largeimg')}">`)
        instance.show()
    }
}))