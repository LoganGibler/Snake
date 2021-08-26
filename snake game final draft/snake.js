let direction = {x:0 , y: 0}
let speed = 2.4
let lastRefresh = 0
let snake = [{x: 10, y: 10}]
let apple = {x: 5, y: 7}
let gameBackground = document.getElementById("gamebackground")
let scoreTag = document.getElementById("score")
let score = 0

function gameRefresh(tick){
    window.requestAnimationFrame(gameRefresh)
    if((tick - lastRefresh)/1000 < 1/speed){
        return
    }
    lastRefresh = tick
    game()
}

function game(){
    gameBackground.innerHTML = "";
    snake.forEach((element, i)=>{
        let snakeBody = document.createElement("div")
        snakeBody.style.gridRowStart = element.y
        snakeBody.style.gridColumnStart = element.x
        if(i === 0){
            snakeBody.classList.add("front")
        } else{
            snakeBody.classList.add("snake")
        }
        gameBackground.append(snakeBody)  
    });
    let foodSquare = document.createElement("div")
    foodSquare.style.gridRowStart = apple.y
    foodSquare.style.gridColumnStart = apple.x
    foodSquare.classList.add("apple")
    gameBackground.append(foodSquare)
        

    if(gameOver(snake)){
        direction = {x:0 , y: 0}
        snake = [{x: 10, y: 10}]
        score = 0
        scoreTag.innerHTML = "Score: 0"
    }

    
    for(let i = snake.length - 2; i >= 0; i--){
        snake[i+1] = {...snake[i]};
    }

    snake[0].x += direction.x
    snake[0].y += direction.y

    if (snake[0].x === apple.x && snake[0].y === apple.y){
        snake.unshift({x: snake[0].x + direction.x, y: snake[0].y + direction.y})
        let a = 2
        let b = 16
        apple = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        score = score + 1 
        scoreTag.innerHTML = "Score: " + score;
        
    }

}
function gameOver(snake){
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true
        }
    }

    if(snake[0].x >= 17 || snake[0].x <=0 || snake[0].y >= 17 || snake[0].y <=0){
    return true;
    }
        
    return false;
}



window.addEventListener("keydown", element => {
    switch (element.key){
        case "w":
            direction.x = 0
            direction.y = -1
            break
        case "s":
            direction.x = 0
            direction.y = 1
            break
        case "d":
            direction.x = 1
            direction.y = 0
            break
        case "a":
            direction.x = -1
            direction.y = 0
            break
    }
})

gameRefresh()


