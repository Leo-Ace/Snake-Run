const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const log = console.log.bind(document);
const listColor = ['red', 'rgb(255, 149, 0)', 'blue', 'white', 'black', 'green', 'violet', 'orange', 'gray', 'rgb(128, 255, 0)', 'rgb(0, 229, 255)', 'rgb(255, 0, 183)'];
let i = 0;

function handleColorAndSpeed() {
  const listSpeeds = $$('.speed>div button');
  const arrowLeft = $('.arrow_left');
  const arrowRight = $('.arrow_right');
  const listKhoi = $$('.khoi');
  
  arrowRight.onclick = ()=> {
    if(i>=11) {
      i = 0;
      [...listKhoi].forEach(item=> item.style.backgroundColor = listColor[i]);
    } else {
      i++;
      [...listKhoi].forEach(item=> item.style.backgroundColor = listColor[i]);
    }
  }
  arrowLeft.onclick = ()=> {
    if(i<=0) {
      i = 11;
      [...listKhoi].forEach(item=> item.style.backgroundColor = listColor[i]);
    } else {
      i--;
      [...listKhoi].forEach(item=> item.style.backgroundColor = listColor[i]);
    }
  }

  [...listSpeeds].forEach(item=> {
    item.onclick = ()=> {
      [...listSpeeds].forEach(item=> item.classList.remove('active'));
      item.classList.add('active');
    }
  })
}
handleColorAndSpeed();

function handleClickPlay() {
  const formSelect = $('.form-select');
  const btnStart = $$('.btnStart');
  const btnBacks = $$('.back');
  const boxGames = $('.box_games>.game');
  const formMessage = $('.form-message');
  const listSpoint = $$('.spoint');
  const spointMax = $('.spoint-max>b');
  let checkplay = false;

  [...btnStart].forEach(item=> {
    item.onclick = ()=> {
      formSelect.style.display = 'none';
      formMessage.style.display = 'none';
      boxGames.style.display = 'block';
      listSpoint[0].innerHTML = '0';
      listSpoint[1].querySelector('b').innerHTML = '0';
      checkplay = true;
      startGame();
    }
  });

  [...btnBacks].forEach(item=> {
    item.onclick = ()=> {
      formSelect.style.display = 'block';
      formMessage.style.display = 'none';
      boxGames.style.display = 'none';
      checkplay = false;
    }
  })

  function startGame() {
    const _mycanvas = document.getElementById('mycanvas');
    const ctx = _mycanvas.getContext('2d');
    let snakeX = 100, snakeY = 100, snakeDx = 20, snakeDy = 0, appleX = 700, appleY = 200, cound = 4, spoint = 0;
    let listCubes = [];
    const colorSnake = listColor[i];
    let speed = Number($('.speed>div .active').value);

    function handleSnake() {
      if(!checkplay) return;
      if(speed < 0 ) {
        speed = Number($('.speed>div .active').value);
        ctx.clearRect(0, 0, _mycanvas.width, _mycanvas.height)
        snakeX += snakeDx;
        snakeY += snakeDy;

        if(snakeX >= _mycanvas.width) snakeX = 0;
        else if(snakeX < 0) snakeX = _mycanvas.width - 20;
        if(snakeY < 0) snakeY = _mycanvas.height - 20;
        else if(snakeY >= _mycanvas.height) snakeY = 0;

        listCubes.unshift({x: snakeX, y: snakeY});
        if(listCubes.length > cound) {
          listCubes.pop()
        }
        // ctx.strokeStyle = colorSnake;
        // ctx.arc(appleX, appleY, 10, 0, 2 * Math.PI);
        // ctx.stroke()
        ctx.fillStyle = colorSnake;
        ctx.fillRect(appleX, appleY, 19, 19);
        listCubes.forEach((item, index)=> {
          ctx.fillRect(item.x, item.y, 20-1, 20-1);

          if(item.x === appleX && item.y === appleY) {
            cound++;
            appleX = Math.floor(Math.random()*50)*20;
            appleY = Math.floor(Math.random()*25)*20;
            listSpoint[0].innerHTML = Number(listSpoint[0].innerHTML) + 1;
            listSpoint[1].querySelector('b').innerHTML = Number(listSpoint[1].querySelector('b').innerHTML) + 1;
          }

          for(var i = index + 1; i < listCubes.length; i++) {
            if(item.x === listCubes[i].x && item.y === listCubes[i].y) {
              formMessage.style.display = 'block';
              if(Number(listSpoint[0].innerHTML) > Number(spointMax.innerHTML)) {
                spointMax.innerHTML = listSpoint[0].innerHTML;
              }
              checkplay = false;
              return;
            }
          }
        })
      } else speed--;
      requestAnimationFrame(handleSnake);
    }
    requestAnimationFrame(handleSnake);

    document.addEventListener('keydown', (e)=> {
      if(e.key === 'ArrowRight' && snakeDx == 0) {
        snakeDx = 20;
        snakeDy = 0;
      } else if(e.key === 'ArrowUp' && snakeDy == 0) {
        snakeDx = 0;
        snakeDy = -20;
      } else if(e.key === 'ArrowLeft' && snakeDx == 0) {
        snakeDx = -20;
        snakeDy = 0;
      } else if(e.key === 'ArrowDown' && snakeDy == 0) {
        snakeDx = 0;
        snakeDy = 20;
      } 
    })
  }

}
handleClickPlay();