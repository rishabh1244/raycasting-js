const canvas = document.getElementById('map-screen');
const ctx = canvas.getContext('2d');

canvas.height = 500;
canvas.width = 500;

const canvas2 = document.getElementById('game-screen');
const ctx2 = canvas2.getContext('2d');


canvas2.height = 2000;
canvas2.width = 2500;

const g = new game(150,200,map);

function Animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    draw_map(canvas,ctx);
    g.render(ctx,canvas,canvas2)
    requestAnimationFrame(Animate);
    
}
Animate();