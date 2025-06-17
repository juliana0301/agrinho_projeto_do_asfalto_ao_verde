// Tema: Conexão positiva entre cidade e campo

let chapter = 0;
let nextButton;
let progress = 0;
let maxProgress = 100;
let lights = [];
let effects = [];
let characters = [];
let showTutorial = true;
let restartButtonShown = false;

function setup() {
  createCanvas(900, 500);
  textFont("Georgia");
  nextButton = createButton("Próximo Capítulo ▶");
  nextButton.position(20, height + 20);
  nextButton.mousePressed(nextChapter);

  characters.push(new Character(150, height - 130, "Morador do campo", [
    "Será que um dia a cidade vai nos notar?",
    "Vivemos bem, mas falta energia, internet..."
  ]));
  characters.push(new Character(120, height - 220, "Engenheira da cidade", [
    "Vamos levar luz e tecnologia para todos!",
    "O campo também é o futuro."
  ]));
}

function draw() {
  background(30, 40, 80);
  
  switch(chapter) {
    case 0:
      drawIntro(); break;
    case 1:
      drawCityApproach(); break;
    case 2:
      drawConnection(); break;
    case 3:
      drawGame(); break;
    case 4:
      drawCelebration(); break;
  }
}

function drawIntro() {
  drawFieldSprite();
  characters[0].display();
  drawSpeechBubble(characters[0].x + 50, characters[0].y - 30, characters[0].lines[0]);

  fill(255);
  textSize(28);
  text("Capítulo 1: O Campo", 100, 80);
  textSize(16);
  text("O campo é bonito, mas sente falta de conexões modernas...", 100, 110);
}

function drawCityApproach() {
  drawFieldSprite();
  drawCitySprite();
  characters[1].display();
  drawSpeechBubble(characters[1].x + 40, characters[1].y - 40, characters[1].lines[0]);

  fill(255);
  textSize(28);
  text("Capítulo 2: A Cidade se Move", 100, 80);
  textSize(16);
  text("Alguém da cidade está chegando com soluções!", 100, 110);
}

function drawConnection() {
  drawFieldSprite();
  drawCitySprite();

  fill(255);
  textSize(24);
  text("Capítulo 3: Conectando os Laços", 100, 40);
  textSize(16);
  text("Arraste para enviar a luz até a torre do campo!", 100, 70);

  if (mouseIsPressed) lights.push(new Light(mouseX, mouseY));

  for (let l of lights) {
    l.update();
    l.display();
    if (l.x > width * 0.7 && progress < 20) progress += 0.5;
  }

  fill(200);
  rect(width * 0.7, height - 160, 40, 60);

  if (progress >= 20) {
    fill(255);
    text("Conexão Estabelecida!", 100, 100);
  }
}

function drawGame() {
  drawCitySprite();
  drawFieldSprite();

  // Instruções fixas no topo enquanto no capítulo do jogo
  fill(255, 230);
  rect(150, 30, 600, 80, 15);
  fill(0);
  textSize(18);
  textAlign(CENTER);
  text("Clique e arraste o mouse para enviar luz e progresso da cidade ao campo!", width / 2, 60);
  text("Quanto mais luz enviar, mais rápido o progresso avança.", width / 2, 85);
  textAlign(LEFT);

  if (mouseIsPressed) {
    lights.push(new Light(mouseX, mouseY));
    progress += 0.3;
    if (random(1) < 0.1) effects.push(new Effect(mouseX, mouseY));
  }

  for (let l of lights) l.display();
  for (let e of effects) { e.update(); e.display(); }
  effects = effects.filter(e => !e.done);

  drawHUD();

  if (progress >= maxProgress) chapter = 4;
}

function drawCelebration() {
  background(20, 10, 50);
  textAlign(CENTER);
  fill(255);
  textSize(28);
  text("Agora o campo e a cidade brilham juntos!", width / 2, height / 2);
  text("Luz, conhecimento e conexão chegaram para ficar.", width / 2, height / 2 + 40);

  for (let i = 0; i < 150; i++) {
    stroke(255, 255, 200, random(100, 255));
    point(random(width), random(height / 2));
  }

  if (!restartButtonShown) {
    let btn = createButton("🔁 Recomeçar");
    btn.position(width / 2 - 50, height - 50);
    btn.mousePressed(() => {
      chapter = 0;
      progress = 0;
      lights = [];
      effects = [];
      showTutorial = true;
      btn.remove();
      restartButtonShown = false;
    });
    restartButtonShown = true;
  }
}

function drawCitySprite() {
  fill(50);
  rect(0, height - 100, width / 2, 100);
  for (let i = 0; i < width / 2; i += 50) {
    fill(100);
    rect(i + 10, height - 100, 30, -random(50, 100));
    fill(255, 255, 100);
    for (let j = 0; j < 3; j++) {
      rect(i + 15, height - 110 - j * 20, 10, 10);
    }
  }
  fill(255);
  text("Cidade", 20, height - 110);
}

function drawFieldSprite() {
  fill(60, 180, 75);
  rect(width / 2, height - 100, width / 2, 100);
  for (let i = width / 2 + 20; i < width - 20; i += 80) {
    fill(139, 69, 19);
    rect(i, height - 100, 10, -30);
    fill(34, 139, 34);
    ellipse(i + 5, height - 130, 40, 40);
  }
  if (progress > 20) {
    fill(200);
    ellipse(width * 0.7, height - 120, 30, 30);
    text("Tecnologia", width * 0.7 - 20, height - 140);
  }
  if (progress > 50) {
    fill(255, 204, 0);
    rect(width * 0.65, height - 100, 40, -30);
    text("Educação", width * 0.65 - 10, height - 110);
  }
  if (progress > 80) {
    fill(150);
    ellipse(width * 0.75, height - 110, 60, 20);
    text("Energia limpa", width * 0.75 - 20, height - 130);
  }
  fill(255);
  text("Campo", width - 80, height - 110);
}

function drawHUD() {
  fill(255);
  textSize(14);
  text("Progresso: " + progress.toFixed(1) + "%", 10, 20);
}

function nextChapter() {
  if (chapter < 4) chapter++;
}

function drawSpeechBubble(x, y, msg) {
  let padding = 10;
  let maxWidth = 200;
  textSize(14);
  textAlign(LEFT, TOP);

  let words = msg.split(" ");
  let lines = [];
  let currentLine = "";
  for (let w of words) {
    let testLine = currentLine + w + " ";
    if (textWidth(testLine) > maxWidth - 2 * padding) {
      lines.push(currentLine);
      currentLine = w + " ";
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);

  let bubbleHeight = lines.length * 18 + padding * 2;

  fill(255);
  rect(x, y, maxWidth, bubbleHeight, 10);
  fill(0);
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], x + padding, y + padding + i * 18);
  }
  textAlign(LEFT, BASELINE);
}

class Light {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alpha = 200;
  }
  update() {
    this.alpha -= 4;
  }
  display() {
    noStroke();
    fill(255, 255, 150, this.alpha);
    ellipse(this.x, this.y, 30);
  }
}

class Effect {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.alpha = 255;
    this.done = false;
  }
  update() {
    this.r += 2;
    this.alpha -= 5;
    if (this.alpha <= 0) this.done = true;
  }
  display() {
    noFill();
    stroke(255, this.alpha);
    ellipse(this.x, this.y, this.r);
  }
}

class Character {
  constructor(x, y, name, lines) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.lines = lines;
  }
  display() {
    fill(255, 224, 189);
    ellipse(this.x, this.y, 30);
    fill(100);
    rect(this.x - 10, this.y + 10, 20, 30);
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text(this.name, this.x, this.y + 50);
    textAlign(LEFT);
  }
}
