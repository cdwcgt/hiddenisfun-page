const imageList = [
  "static/assets/gacha/5/0.jpg",
  "static/assets/gacha/5/1.jpg",
  "static/assets/gacha/5/2.jpg",
];

const news = {
  news0522: {
    title: "Hidden is fun web is AWAKEN!!!!!!",
    message: `<p>
    最终，还是来到这一步了，大家对Hidden的喜爱还是太深了！为此，开发了这样的页面，没有什么技术含量，图一乐
    </p>
    <p>
    如果有问题，请联系cdwcgt（QQ: 1156794819）或者Alleyne（QQ: 1170672908）
    </p>
    <p>
    纯前端，随便做你喜欢的事：）
    </p>
    `,
    date: "2024/5/22",
  },
  news9999: {
    title: "Test #9999",
    message: `<p>
    Glad to see we are here.
    </p>`,
    date: "2099/9/99",
  },
};

function closeOpenNavbar() {
  document.getElementById("nav-check").checked = false;
}

function createImageLoop(containerId, images) {
  let container = document.getElementById(containerId);
  let currentImage = container.querySelector("img.active");
  let next = 1;
  setInterval(() => {
    currentImage.classList.remove("active");

    setTimeout(() => {
      if (next >= images.length) {
        next = 0;
      }
      currentImage.src = images[next];
    }, 1000);
    setTimeout(() => {
      currentImage.classList.add("active");
      next += 1;
    }, 1000);
  }, 3000);
}

function newsDetail(id) {
  let piece = news[id];
  let newsDetail = document.getElementById("news-detail");
  newsDetail.innerHTML = "";
  if (piece == undefined)
    throw new Error("This piece of news is not available");
  newsDetail.innerHTML = `<div class="news-title">${piece.title}</div>
  <div class="news-date">${piece.date}</div>
  <div class="news-message">${piece.message}</div>`;
  newsDetail.style.display = "block";
  document.getElementById("news-mask").style.display = "block";
}

function availableCards(star) {
  let temp = [];
  for (let i = 0; i < cards.cards[star - 1].length; i++) {
    if (cards.cards[star - 1][i].available) temp.push(cards.cards[star - 1][i]);
  }
  return temp;
}

function gacha() {
  let possibility = Math.floor(Math.random() * 10000);
  if (possibility < 25) return 5;
  else if (possibility < 1975) return 4;
  else if (possibility < 4000) return 3;
  else if (possibility < 6500) return 2;
  else return 1;
}

function getOneGacha() {
  let star = gacha();
  let cards = availableCards(star);
  let card = cards[Math.floor(Math.random() * cards.length)];
  return card;
}

function getTenGacha() {
  let temp = [];
  for (let i = 0; i < 10; i++) {
    temp.push(getOneGacha());
  }
  return temp;
}

function doOneGacha() {
  document.getElementById("gacha-actions").style.display = "block";
  let resultDiv = document.getElementById("gacha-result");
  let infoDiv = document.getElementById("gacha-info");
  let itemsDiv = document.getElementById("gacha-items");
  itemsDiv.innerHTML = "";
  let result = getOneGacha();
  let gacha = document.createElement("div");
  gacha.classList.add("gacha-item", "hidden");
  gacha.innerHTML = `<img src="${result.path}" alt="${result.path}" height="200px" width="auto" />`;
  itemsDiv.appendChild(gacha);
  setTimeout(infoDiv.classList.add("hidden"), 1000);
  setTimeout(resultDiv.classList.remove("hidden"), 1000);
}

function doTenGacha() {
  document.getElementById("gacha-actions").style.display = "block";
  let resultDiv = document.getElementById("gacha-result");
  let infoDiv = document.getElementById("gacha-info");
  let itemsDiv = document.getElementById("gacha-items");
  itemsDiv.innerHTML = "";
  let result = getTenGacha();
  for (let i = 0; i < result.length; i++) {
    let gacha = document.createElement("div");
    gacha.classList.add("gacha-item", "hidden");
    gacha.innerHTML = `<img src="${result[i].path}" alt="${result[i].path}" />`;
    itemsDiv.appendChild(gacha);
  }
  setTimeout(infoDiv.classList.add("hidden"), 1000);
  setTimeout(resultDiv.classList.remove("hidden"), 1000);
}

function continueOrSkipGacha(skip) {
  let items = document.getElementById("gacha-items");
  let actions = document.getElementById("gacha-actions");
  for (let i = 0; i < items.children.length; i++) {
    if (items.children[i].classList.contains("hidden")) {
      items.children[i].classList.remove("hidden");
      if (!skip) {
        if (i == 9) actions.style.display = "none";
        return;
      }
    }
  }
  actions.style.display = "none";
}

document.getElementById("nav-mask").addEventListener("click", closeOpenNavbar);
createImageLoop("showcase-container", imageList);
document.getElementById("one-gacha").addEventListener("click", doOneGacha);
document.getElementById("ten-gacha").addEventListener("click", doTenGacha);
document.getElementById("gacha-continue").addEventListener("click", () => {
  continueOrSkipGacha(false);
});
document.getElementById("gacha-skip").addEventListener("click", () => {
  continueOrSkipGacha(true);
});
Array.from(document.getElementsByClassName("news-item")).forEach((item) => {
  item.addEventListener("click", () => {
    newsDetail(item.id);
  });
});
document.getElementById("news-mask").style.display = "none";
document.getElementById("news-detail").style.display = "none";
document.getElementById("news-mask").addEventListener("click", () => {
  document.getElementById("news-mask").style.display = "none";
  document.getElementById("news-detail").style.display = "none";
});
