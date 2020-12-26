const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

$('.carousel .dots').onclick = function (e) {
    if (e.target.tagName !== 'SPAN') return
    let index = Array.from($$('.carousel .dots span')).indexOf(e.target)

    $$('.carousel .dots span').forEach(dot => dot.classList.remove('active'))
    $$('.carousel .dots span')[index].classList.add('active')

    $$('.carousel .panels a').forEach(panel => panel.style.zIndex = 1)
    $$('.carousel .panels a')[index].style.zIndex = 10
}

$('.pre').onclick = function (e) {
    let index = Array.from($$('.carousel .dots span')).indexOf($('.carousel .dots .active'))

    if (index === 0) {
        index = Array.from($$('.carousel .dots span')).length - 1
    } else {
        index = index - 1
    }

    setDots(index)
    setPanels(index)
}

$('.next').onclick = function (e) {
    let index = Array.from($$('.carousel .dots span')).indexOf($('.carousel .dots .active'))

    if (index === Array.from($$('.carousel .dots span')).length - 1) {
        index = 0
    } else {
        index = index + 1
    }

    setDots(index)
    setPanels(index)
}

function setDots(index) {
    $$('.carousel .dots span').forEach(dot => dot.classList.remove('active'))
    $$('.carousel .dots span')[index].classList.add('active')
}

function setPanels(index) {
    $$('.carousel .panels a').forEach(panel => panel.style.zIndex = 1)
    $$('.carousel .panels a')[index].style.zIndex = 10
}