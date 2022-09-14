document.addEventListener('DOMContentLoaded', () => {
  let isGameOver = false
    let platformCount = 5
    let platforms = []
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeftSpace = 50
    let startPoint = 150
    let doodlerBottomSpace = startPoint
    let upTimerId
    let upDownId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId
    let score = 0
    
    function createDoodler() {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeftSpace = platforms[0].left
        doodler.style.left= doodlerLeftSpace +'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
        

    }

class Platform {
    constructor(newPlatBottom) {
      this.left = Math.random() * 315
      this.bottom = newPlatBottom
      this.visual = document.createElement('div')

      const visual = this.visual
      visual.classList.add('platform')
      visual.style.left = this.left + 'px'
      visual.style.bottom = this.bottom + 'px'
      grid.appendChild(visual)
    }
  }


  function createPlatforms() {
    console.log('creatplatforms');
    for(let i =0; i < platformCount; i++) {
      let platGap = 600 / platformCount
      let newPlatBottom = 100 + i * platGap
      let newPlatform = new Platform (newPlatBottom)
      platforms.push(newPlatform)
      console.log(platforms)
    }
  }

  function movingPlatform(){
    if (doodlerBottomSpace > 200) {
      platforms.forEach(platform => {
        platform.bottom -= 4
        let visual = platform.visual
        visual.style.bottom = platform.bottom + 'px'

        if(platform.bottom < 10) {
          let firstPlatform = platforms[0].visual
          firstPlatform.classList.remove('platform')
          platforms.shift()
          score++
          var newPlatform = new Platform(600)
          platforms.push(newPlatform)
        }
    }) 
  }
  
  }

  function jump(){
    clearInterval(upDownId)
    isJumping = true
    upTimerId = setInterval(function (){
      doodlerBottomSpace += 20
      doodler.style.bottom = doodlerBottomSpace + 'px'
      if(doodlerBottomSpace > startPoint + 200){
        fall();
      }

    },20)
  }

function fall(){
  clearInterval(upTimerId)
  isJumping = false
  upDownId = setInterval(function(){
    doodlerBottomSpace -= 5
    doodler.style.bottom = doodlerBottomSpace + 'px'
    if( doodlerBottomSpace <= 0){
      game0ver();
    }

    platforms.forEach(platform => {
      if (
        (doodlerBottomSpace >= platform.bottom) &&
        (doodlerBottomSpace <= (platform.bottom + 15)) &&
        ((doodlerLeftSpace + 60) >= platform.left) && 
        (doodlerLeftSpace <= (platform.left + 85)) &&
        !isJumping
        ) {
          console.log('tick')
          startPoint = doodlerBottomSpace
          jump()
          console.log('start', startPoint)
          isJumping = true
        }
    })

  },20)
}

function control(e) {
  doodler.style.bottom = doodlerBottomSpace + 'px'
  if(e.key === 'ArrowLeft') {
    moveLeft()
  } else if (e.key === 'ArrowRight') {
    moveRight()
  } else if (e.key === 'ArrowUp') {
    moveStraight()
  }
}

function moveLeft(){
  isGoingLeft = true
  clearInterval(rightTimerId)
  leftTimerId = setInterval(function(){
    if(doodlerLeftSpace >= 0){
     doodlerLeftSpace -= 5
     doodler.style.left = doodlerLeftSpace + 'px'
    } else moveRight()
  },20)
}

function moveRight(){
  isGoingRight = true
  clearInterval(leftTimerId)
  rightTimerId = setInterval(function(){
    if(doodlerLeftSpace <= 340){
     doodlerLeftSpace += 5
     doodler.style.left = doodlerLeftSpace + 'px'
    } else moveLeft()
  },20)
}


function moveStraight() {
  isGoingLeft = false
  isGoingRight = false
  clearInterval(leftTimerId)
  clearInterval(rightTimerId)
}

function game0ver(){
console.log('game over papi');
isGameOver = true
while (grid.firstChild) {
  console.log('remove')
  grid.removeChild(grid.firstChild)
}
grid.innerHTML = score
clearInterval(upDownId)
clearInterval(upDownId)
clearInterval(leftTimerId)
clearInterval(rightTimerId)

}

function start(){
    if (!isGameOver){
      createPlatforms()
      createDoodler();
setInterval(movingPlatform, 30)
jump()
document.addEventListener('keyup', control)


    }
    
}
start();
});