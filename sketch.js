let Cartones = [];
let Carton = [];
let Plastico = [];
let Agua = [];
let Botellas = [];
let Botella = [];
let timer;
let timerInterval;
let score = 0;
let gravity = 0.2;
let bounceFactor = 0.7;
let floorY;
const maxObjetos = 4;
const squareSize = 100;
let squareX = width / 2;
let squareY = height / 2;
let halfSquareSize = squareSize / 2;

function preload() {
  Carton.push(loadImage("https://i.ibb.co/mVspVw1H/carton.webp"));
  Carton.push(loadImage("https://i.ibb.co/TMNm3BP6/papel.png"));
  Carton.push(loadImage("https://i.ibb.co/FbjZ0FKr/leche.png"));
  Agua.push(loadImage("https://i.ibb.co/5XQzqzYN/agua.png"));
  Agua.push(loadImage("https://i.ibb.co/9kNjm8pG/vaso.png"));
  Agua.push(loadImage("https://i.ibb.co/6JwtkCGV/bolsa.png"));
  Botella.push(loadImage("https://i.ibb.co/VpVCZnXz/botella.png"));
  Botella.push(loadImage("https://i.ibb.co/6cHbyvzT/copa-rota.png"));
}

function setup() {
  timer = 30;
  createCanvas(windowWidth, windowHeight);
  floorY = height - 500;

  if (!document.getElementById("score")) {
    const scoreDiv = document.createElement("div");
    scoreDiv.id = "score";
    document.body.appendChild(scoreDiv);
  }

  let intervalId = setInterval(() => {
    if (
      Cartones.length >= maxObjetos ||
      Plastico.length >= maxObjetos ||
      Botellas.length >= maxObjetos
    ) {
      clearInterval(intervalId);
    } else {
      createCarton();
      createAgua();
      createBotella();
    }
  }, 300);

  timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function draw() {
  if (timer <= 0) {
    // Limpiamos solo el canvas
    clear();
    noLoop();
    
    // Aseguramos que el fondo rojo cubra toda la pantalla
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = "red";
    document.body.style.transition = "background-color 0.5s";
    
    // Ocultamos los elementos del juego
    const scoreElement = document.getElementById("score");
    const timerElement = document.getElementById("timer");
    const titleElement = document.getElementById("gameTitle");
    if (scoreElement) scoreElement.style.display = "none";
    if (timerElement) timerElement.style.display = "none";
    if (titleElement) {
      titleElement.textContent = `¡Has conseguido ${score} puntos!`;
      titleElement.style.fontSize = '48px';
      titleElement.style.marginTop = '20px';
    }

    let img = createImg(
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWY4anM4bXk3anVqNm55Z3ZvMWtocjAwNWF3NDduemV5cjRnbHZ2NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eJ4j2VnYOZU8qJU3Py/giphy.gif"
    );
    img.position(windowWidth/2 - 200, windowHeight/2 - 200);
    img.size(400, 400);
    img.style('z-index', '1000');
    img.show();

    const button = createButton('Volver a jugar');
    button.position(windowWidth/2 - 70, windowHeight/2 + 220);
    button.style('padding', '10px 20px');
    button.style('fontSize', '16px');
    button.style('cursor', 'pointer');
    button.style('z-index', '1000');
    button.mousePressed(() => window.location.reload());

    return;
  }

  if (score >= 120) {
    // Limpiamos solo el canvas
    clear();
    noLoop();
    
    // Aseguramos que el fondo azul cubra toda la pantalla
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = "#13B8FF";
    document.body.style.transition = "background-color 0.5s";
    
    // Ocultamos los elementos del juego
    const scoreElement = document.getElementById("score");
    const timerElement = document.getElementById("timer");
    const titleElement = document.getElementById("gameTitle");
    if (scoreElement) scoreElement.style.display = "none";
    if (timerElement) timerElement.style.display = "none";
    if (titleElement) {
      titleElement.textContent = `¡Felicidades! ¡Has conseguido ${score} puntos!`;
      titleElement.style.fontSize = '48px';
      titleElement.style.marginTop = '20px';
    }

    let img = createImg(
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExanNqNmlia2x3M24yM3U4c2hmMWY1OHR0bXlrdHpnMXgxcDNwbms0cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uRAhwxlVBP6ied6EgB/giphy.gif"
    );
    img.position(windowWidth/2 - 200, windowHeight/2 - 200);
    img.size(400, 400);
    img.style('z-index', '1000');
    img.show();

    const button = createButton('Volver a jugar');
    button.position(windowWidth/2 - 70, windowHeight/2 + 220);
    button.style('padding', '10px 20px');
    button.style('fontSize', '16px');
    button.style('cursor', 'pointer');
    button.style('z-index', '1000');
    button.mousePressed(() => window.location.reload());

    return;
  }

  clear();
  background("rgba(255,255,255, 0)");

  for (let deshecho of Cartones) {
    if (!deshecho.dragging) {
      deshecho.velocityY += gravity;
      deshecho.y += deshecho.velocityY;

      if (deshecho.y + deshecho.height > floorY) {
        deshecho.y = floorY - deshecho.height;
        deshecho.velocityY *= -bounceFactor;
        deshecho.angularVelocity = random(-0.1, 0.1);

        if (abs(deshecho.velocityY) < 0.5) {
          deshecho.velocityY = 0;
          deshecho.angularVelocity = 0;
        }
      }

      deshecho.angle += deshecho.angularVelocity;
    }

    push();
    translate(
      deshecho.x + deshecho.width / 2,
      deshecho.y + deshecho.height / 2
    );
    rotate(deshecho.angle);
    imageMode(CENTER);
    image(deshecho.image, 0, 0, deshecho.width, deshecho.height);
    pop();
  }
  for (let deshecho of Plastico) {
    if (!deshecho.dragging) {
      deshecho.velocityY += gravity;
      deshecho.y += deshecho.velocityY;

      if (deshecho.y + deshecho.height > floorY) {
        deshecho.y = floorY - deshecho.height;
        deshecho.velocityY *= -bounceFactor;
        deshecho.angularVelocity = random(-0.1, 0.1);

        if (abs(deshecho.velocityY) < 0.5) {
          deshecho.velocityY = 0;
          deshecho.angularVelocity = 0;
        }
      }

      deshecho.angle += deshecho.angularVelocity;
    }

    push();
    translate(
      deshecho.x + deshecho.width / 2,
      deshecho.y + deshecho.height / 2
    );
    rotate(deshecho.angle);
    imageMode(CENTER);
    image(deshecho.image, 0, 0, deshecho.width, deshecho.height);
    pop();
  }
  for (let deshecho of Botellas) {
    if (!deshecho.dragging) {
      deshecho.velocityY += gravity;
      deshecho.y += deshecho.velocityY;

      if (deshecho.y + deshecho.height > floorY) {
        deshecho.y = floorY - deshecho.height;
        deshecho.velocityY *= -bounceFactor;
        deshecho.angularVelocity = random(-0.1, 0.1);

        if (abs(deshecho.velocityY) < 0.5) {
          deshecho.velocityY = 0;
          deshecho.angularVelocity = 0;
        }
      }

      deshecho.angle += deshecho.angularVelocity;
    }

    push();
    translate(
      deshecho.x + deshecho.width / 2,
      deshecho.y + deshecho.height / 2
    );
    rotate(deshecho.angle);
    imageMode(CENTER);
    image(deshecho.image, 0, 0, deshecho.width, deshecho.height);
    pop();
  }

  // cuadrado amarillo
  fill(255, 255, 0, 150);
  noStroke();
  rectMode(CENTER);
  rect(width / 2 + 80, height - 270, 230, 100);

  // Dibujar un cuadrado verde
  fill(0, 255, 0, 150);
  rect(width / 4 + 40, height - 260, 100, 100);

  // Dibujar un cuadrado azul
  fill(0, 0, 255, 150);
  rect((3 * width) / 4 + 185, height - 260, 210, 100);

  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.innerText = "Score: " + score;
  }

  const timerElement = document.getElementById("timer");
  if (timerElement) {
    timerElement.innerText = "Tiempo: " + timer;
  }
}

function createCarton() {
  let deshecho = {
    x: random(50, width - 50),
    y: -100,
    width: 128,
    height: 128,
    velocityY: 5,
    angle: 0,
    angularVelocity: 0,
    dragging: false,
    image: random(Carton),
  };
  Cartones.push(deshecho);
}
function createAgua() {
  let deshecho = {
    x: random(50, width - 50),
    y: -100,
    width: 128,
    height: 128,
    velocityY: 5,
    angle: 0,
    angularVelocity: 0,
    dragging: false,
    image: random(Agua),
  };
  Plastico.push(deshecho);
}
function createBotella() {
  let deshecho = {
    x: random(50, width - 50),
    y: -100,
    width: 128,
    height: 128,
    velocityY: 5,
    angle: 0,
    angularVelocity: 0,
    dragging: false,
    image: random(Botella),
  };
  Botellas.push(deshecho);
}

function mousePressed() {
  for (let i = Cartones.length - 1; i >= 0; i--) {
    let deshecho = Cartones[i];
    if (
      mouseX > deshecho.x &&
      mouseX < deshecho.x + deshecho.width &&
      mouseY > deshecho.y &&
      mouseY < deshecho.y + deshecho.height
    ) {
      deshecho.dragging = true;
      deshecho.offsetX = mouseX - deshecho.x;
      deshecho.offsetY = mouseY - deshecho.y;
      deshecho.velocityY = 0;
      deshecho.angularVelocity = 0;
      break;
    }
  }
  for (let i = Botellas.length - 1; i >= 0; i--) {
    let deshecho = Botellas[i];
    if (
      mouseX > deshecho.x &&
      mouseX < deshecho.x + deshecho.width &&
      mouseY > deshecho.y &&
      mouseY < deshecho.y + deshecho.height
    ) {
      deshecho.dragging = true;
      deshecho.offsetX = mouseX - deshecho.x;
      deshecho.offsetY = mouseY - deshecho.y;
      deshecho.velocityY = 0;
      deshecho.angularVelocity = 0;
      break;
    }
  }
  for (let i = Plastico.length - 1; i >= 0; i--) {
    let deshecho = Plastico[i];
    if (
      mouseX > deshecho.x &&
      mouseX < deshecho.x + deshecho.width &&
      mouseY > deshecho.y &&
      mouseY < deshecho.y + deshecho.height
    ) {
      deshecho.dragging = true;
      deshecho.offsetX = mouseX - deshecho.x;
      deshecho.offsetY = mouseY - deshecho.y;
      deshecho.velocityY = 0;
      deshecho.angularVelocity = 0;
      break;
    }
  }
}

function mouseDragged() {
  let squareX = width / 2;
  let squareY = height / 2;
  let halfSquareSize = 50;

  for (let i = Cartones.length - 1; i >= 0; i--) {
    let deshecho = Cartones[i];
    if (deshecho.dragging) {
      deshecho.x = mouseX - deshecho.offsetX;
      deshecho.y = mouseY - deshecho.offsetY;

      let deshechoCenterX = deshecho.x + deshecho.width / 2;
      let deshechoCenterY = deshecho.y + deshecho.height / 2;

      // Verifica si el objeto está dentro del cuadrado azul
      if (
        deshechoCenterX > (3 * width) / 4 + 140 - halfSquareSize &&
        deshechoCenterX < (3 * width) / 4 + 140 + halfSquareSize &&
        deshechoCenterY > height - 260 - halfSquareSize &&
        deshechoCenterY < height - 260 + halfSquareSize
      ) {
        Cartones.splice(i, 1);
        score += 10;
        break;
      }
    }
  }
  for (let i = Plastico.length - 1; i >= 0; i--) {
    let deshecho = Plastico[i];
    if (deshecho.dragging) {
      deshecho.x = mouseX - deshecho.offsetX;
      deshecho.y = mouseY - deshecho.offsetY;

      let deshechoCenterX = deshecho.x + deshecho.width / 2;
      let deshechoCenterY = deshecho.y + deshecho.height / 2;

      // Verifica si el objeto está dentro del cuadrado amarillo
      if (
        deshechoCenterX > width / 2 + 80 - halfSquareSize &&
        deshechoCenterX < width / 2 + 80 + halfSquareSize &&
        deshechoCenterY > height - 270 - halfSquareSize &&
        deshechoCenterY < height - 270 + halfSquareSize
      ) {
        Plastico.splice(i, 1);
        score += 10;
        break;
      }
    }
  }
  for (let i = Botellas.length - 1; i >= 0; i--) {
    let deshecho = Botellas[i];
    if (deshecho.dragging) {
      deshecho.x = mouseX - deshecho.offsetX;
      deshecho.y = mouseY - deshecho.offsetY;

      let deshechoCenterX = deshecho.x + deshecho.width / 2;
      let deshechoCenterY = deshecho.y + deshecho.height / 2;

      // Verifica si el centro está dentro del cuadrado verde
      if (
        deshechoCenterX > width / 4 - halfSquareSize &&
        deshechoCenterX < width / 4 + 10 + halfSquareSize &&
        deshechoCenterY > height - 270 - halfSquareSize &&
        deshechoCenterY < height - 270 + halfSquareSize
      ) {
        Botellas.splice(i, 1);
        score += 10;
        break;
      }
    }
  }
}

function mouseReleased() {
  for (let deshecho of Botellas) {
    deshecho.dragging = false;
  }
  for (let deshecho of Plastico) {
    deshecho.dragging = false;
  }
  for (let deshecho of Cartones) {
    deshecho.dragging = false;
  }
}
