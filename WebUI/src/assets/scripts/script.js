var width = 16;
var height = 16;
var row = 3;
var col = 3;
var gap = 1;
var picUrl = "url(https://cq.ru/storage/uploads/posts/1020636/4bada763f83c45653c9ffb4c8fa22091.jpg)";


function setParameters(w, h, r, c, g, p){
  width = w;
  height = h;
  row = r;
  col = c;
  gap = g;
  picUrl = p;
}

function setWidthHeight(w,h){
  width = w;
  height = h;
}

function setRowColumns(r,c){
  row = r;
  col = c;
}

function setGap(g){
  gap = g;
}

function setPicture(pic){
  picUrl = pic;
}

const shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };
  
  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
  
  class Puzzle {
    constructor(el) {
      this.el = el;
      this.fragments = el.children;
      this.width = width;
      this.height = height;
      this.row = row;
      this.col = col;
      this.gap = gap;
    }
  
    // create table of fragments
    create() {
      this.ids = [...Array(this.row * this.col).keys()];
      const puzzle = this.el;
      const fragments = this.fragments;
      if (fragments.length) {
        Array.from(fragments).forEach((item) => item.remove());
      }
      puzzle.style.setProperty("--puzzle-width", this.width + "rem");
      puzzle.style.setProperty("--puzzle-height", this.height + "rem");
      puzzle.style.setProperty("--puzzle-row", this.row);
      puzzle.style.setProperty("--puzzle-col", this.col);
      puzzle.style.setProperty("--puzzle-gap", this.gap + "px");
      puzzle.style.setProperty("--puzzle-img",picUrl);
      for (let i = 0; i < this.row; i++) {
        for (let j = 0; j < this.col; j++) {
          const fragment = document.createElement("div");
          fragment.className = "fragment";
          //add styles to fragment
          fragment.style.setProperty("--x-offset","calc(var(--x) * var(--puzzle-frag-width) * -1)");
          fragment.style.setProperty("--y-offset","calc(var(--y) * var(--puzzle-frag-height) * -1)")
          fragment.style.background ="var(--puzzle-img) var(--x-offset) var(--y-offset) / var(--puzzle-width) var(--puzzle-height) no-repeat"
          fragment.style.width = "var(--puzzle-frag-width)";
          fragment.style.height = "var(--puzzle-frag-height)";
          fragment.style.order = "var(--order)";
          fragment.style.margin = "var(--puzzle-gap)";
          //fragment.style.borderRadius = "10px";
          //set propeties
          fragment.style.setProperty("--x", j);
          fragment.style.setProperty("--y", i);
          fragment.style.setProperty("--i", j + i * this.col);
          puzzle.appendChild(fragment);
        }
      }
    }
  
    // give new id to element
    reorder(newIds) {
      const fragments = this.fragments;
      for (let id = 0; id < this.ids.length; id++) {
        fragments[id].style.setProperty("--order", newIds[id]);
      }
    }
  
    // shuffle elements
    shuffle() {
      const shuffledIds = shuffle(this.ids);
      this.reorder(shuffledIds);
    }
  }
  
  class Sortable {
    constructor(el, total) {
      let that = this;
      this.el = el;
      this.total = total;
      this.riseAnime = gsap.to(el, {
        boxShadow: "0 16px 32px rgba(0,0,0,0.3)",
        scale: 1.1,
        duration: 0.3,
        paused: true,
      });
      this.draggie = new Draggable(el, {
        onDragStart: function () {
          that.riseAnime.play();
        },
        onRelease: function () {
          that.riseAnime.reverse();
          const total = that.total;
          let hitTargets = [];
          for (const item of total) {
            if (this.hitTest(item, "70%")) {
              hitTargets.push(item);
            }
          }
          if (hitTargets.length === 1) {
            const target = this.target;
            const hitTarget = hitTargets[0];
            const targetOrder = target.style.getPropertyValue("--order");
            const hitTargetOrder = hitTarget.style.getPropertyValue("--order");
            target.style.setProperty("--order", hitTargetOrder);
            hitTarget.style.setProperty("--order", targetOrder);
            gsap.to(target, {
              x: 0,
              y: 0,
              duration: 0,
            });
          } else {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.3,
            });
          }
          const orders = Array.from(that.total).map((item) => item.style.getPropertyValue("--order"));
          const ids = Array.from(that.total).map((item) => item.style.getPropertyValue("--i"));
          if (orders.toString() === ids.toString()) {
            sleep(300).then(() => {
              winnerAnimation();
              document.getElementById('ok-btn').style.display = "block";
            });
          }
        },
      });
    }
  }

  var puzzle ="";
  function startGame(){
  setTimeout(() => {
    puzzle = new Puzzle(document.querySelector(".puzzle"));
    const start = () => {
      puzzle.create();
      puzzle.shuffle();
      const fragments = puzzle.fragments;
      const sortables = Array.from(fragments).map((item) => new Sortable(item, fragments));
    }; 
    //may be deleted later
    /*
    const gui = new dat.GUI();
    console.log(gui);
  gui.add(puzzle, "width", 1, 50)
    .step(1)
    .onChange((newValue) => start());
  gui
    .add(puzzle, "height", 1, 50)
    .step(1)
    .onChange((newValue) => start());
  gui
    .add(puzzle, "row", 1, 10)
    .step(1)
    .onChange((newValue) => start());
  gui
    .add(puzzle, "col", 1, 10)
    .step(1)
    .onChange((newValue) => start());
  gui
    .add(puzzle, "gap", 0, 100)
    .step(1)
    .onChange((newValue) => start());
  */
    start();    
  }, 100)
  
}

function winnerAnimation(){
  for (var i = 0; i < 250; i++) {
    create(i);
  }
  
  function create(i) {
    var width = Math.random() * 10;
    var height = width * 0.4;
    var colourIdx = Math.ceil(Math.random() * 3);
    var colour = "red";
    var bgColor = "#d13447";
    switch(colourIdx) {
      case 1:
        colour = "yellow";
        bgColor = "#ffbf00";
        break;
      case 2:
        colour = "blue";
        bgColor = "#263672";
        break;
      default:
        colour = "red";
        bgColor = "#d13447";
    }
    $('<div class="confetti-'+i+' '+colour+'"></div>').css({
      "position":"absolute",
      "background-color": bgColor,
      "width" : width+"px",
      "height" : height+"px",
      "top" : -Math.random()*20+"%",
      "left" : Math.random()*100+"%",
      "opacity" : Math.random()+0.5,
      "transform" : "rotate("+Math.random()*360+"deg)"
    }).appendTo('.wrapper');  
    
    drop(i);
  }
  
  function drop(x) {
    $('.confetti-'+x).animate({
      top: "100%",
      left: "+="+Math.random()*15+"%"
    }, Math.random()*2000 + 2000, function() {
      deleteConfetti(x);
    });
  }
  
  function deleteConfetti(x) {
    $('.confetti-'+x).remove();
  }
}
