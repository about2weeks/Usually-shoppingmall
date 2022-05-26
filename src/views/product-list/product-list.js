import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const productItemContainer = document.querySelector('#productItemContainer');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
    showProductList();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {}

// 입력으로 들어오는 주소로 이동
function newPage(productId) {
    window.location.href = `/product/${productId}`;
}

// 상품 목록
async function showProductList() {
    // const categoryId = location.pathname.split("/")[3];
    // try {
    //     const test = await Api.get('/product/category', categoryId);
    //     console.log(test);
    // } catch (err) {
    //     console.error(err.stack);
    //     alert(
    //         `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
    //     );
    // }

    const data = {
        shortId: '1',
        name: 'The Loop',
        price: 20000,
        description: 'The Loop ring',
        madeBy: 'company',
        categoryId: '000001',
        inventory: 10,
        sellCount: 0,
        src: '/ring.jpg',
    };

    const datas = [];
    datas.push({
        shortId: '2',
        name: 'The Cross',
        price: 22000,
        description: 'The Cross necklace',
        madeBy: 'company',
        categoryId: '000001',
        inventory: 10,
        sellCount: 0,
        src: '/necklace.jpg',
    });
    for (let i = 0; i < 10; i++) datas.push(data);

    productItemContainer.innerHTML = '';
    let tileAncestorTag;

    datas.forEach((data, index, array) => {
        if (index % 4 === 0) {
            tileAncestorTag = document.createElement('div');
            tileAncestorTag.classList.add('tile', 'is-ancestor');
            tileAncestorTag.innerHTML = '';
        }

        const tileParentTag = document.createElement('div');
        tileParentTag.classList.add('tile', 'is-parent');

        const tileChildTag = document.createElement('article');
        tileChildTag.classList.add('tile', 'is-child');
        tileChildTag.setAttribute('id', data.shortId);

        const imageTag = document.createElement('figure');
        imageTag.classList.add('image', 'is-square');
        imageTag.innerHTML = `<img src="${data.src}" alt="${data.name}">`;
        // 상품 클릭시 해당 상품 상세 페이지로 이동
        imageTag.addEventListener('click', () => newPage(data.shortId));

        const contentTag = document.createElement('div');
        contentTag.classList.add('content', 'has-text-centered');
        contentTag.innerHTML = 
        `<strong>${data.name}</strong>
        <p>${addCommas(data.price)}원</p>`;
        // 상품 클릭시 해당 상품 상세 페이지로 이동
        contentTag.addEventListener('click', () => newPage(data.shortId));

        tileChildTag.appendChild(imageTag);
        tileChildTag.appendChild(contentTag);

        tileParentTag.appendChild(tileChildTag);

        tileAncestorTag.appendChild(tileParentTag);

        if (index % 4 === 3) {
            productItemContainer.appendChild(tileAncestorTag);
        } else if (index === array.length - 1 && index % 4 !== 3) {
            // Bulma css tile로 구성하니까 한 줄에 4개 들어가도록 구성
            // 한 줄에 넣은 개수대로 1/n 로 한 줄을 채워서 4개 되도록 빈공간 삽입
            const emptyDivTag = document.createElement('div');
            emptyDivTag.classList.add('tile', 'is-parent');
            for (let i = index % 4; i < 3; i++) {
                tileAncestorTag.appendChild(emptyDivTag);
            }
            productItemContainer.appendChild(tileAncestorTag);
        }
    });
}
