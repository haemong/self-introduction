'use strict';

const frame = document.getElementById('frame');
const card = document.getElementById('card');
const light = document.getElementById('light');

let { x, y, width, height } = frame.getBoundingClientRect();
/* 엘리먼트의 크기와 뷰포트에 상대적인 위치 정보를 제공하는 DOMReac 객체를 반환  */

function mouseMove(e) {
    const left = e.clientX - x;
    const top = e.clientY - y;
    const centerX = left - width / 2; // 기울기를 구하기 위한 좌표
    const centerY = top - height / 2; // centerX centerY
    const d = Math.sqrt(centerX**2 + centerY**2);
    // Math.sqrt = 루트, d = 기울기, 가로제곱 + 세로제곱 = 기울기제곱 (삼각형 피타고라스 정의)
    
    card.style.boxShadow = `${centerX / 5}px ${centerY / 10}px 10px rgba(0, 0, 0, 0.2)`;
    // 그림자 만들기

    card.style.transform = `rotate3d(${-centerY / 100}, ${centerX / 100}, 0, ${d / 10}deg)`;
    // card 기울기

    light.style.backgroundImage = `radial-gradient(circle at ${left}px ${top}px, #00000040, transparent, #ffffff99)`;
    // left top(mouse center) 기준점으로 가까운곳 어둡게, 중간위치 무색, 먼 곳은 밝게
}

frame.addEventListener('mouseenter', () => {
    frame.addEventListener('mousemove', mouseMove);
})
// mouseenter시 mousemove

frame.addEventListener('mouseleave', () => {
    frame.removeEventListener('mousemove', mouseMove);
    card.style.boxShadow = '';
    card.style.transform = '';
    light.style.backgroundImage = '';
})
// mouseleave시 mousemove 그리고 초기화

window.addEventListener('resize', () => {
    rect = frame.getBoundingClientRect();
    x = rect.x;
    y = rect.y;
    width = rect.width;
    height = rect.height;
})
// window size 변화 시 x, y, width, height 값 맞춰서 보정

function changeImage() { 

    const images = [
        'url("jhm1.jpeg")',
        'url("jhm2.jpeg")',
        'url("jhm3.jpeg")',
        'url("jhm4.jpeg")',
        'url("jhm5.jpeg")'
    ]

    const img = images[Math.floor(Math.random() * images.length)];
    card.style.backgroundImage = img;
}

setInterval(changeImage, 1500);

// random으로 image 사진 바꾸기