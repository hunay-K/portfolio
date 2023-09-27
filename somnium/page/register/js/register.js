const colors = ['orange','orangered','darkorange', 'gold', 'tomato', 'goldenrod','yellow'],
      fire_spread = 15 // best range 10-20

function addParticle() {
    var bg = document.querySelector('div.bg');
    var fs = document.createElement('div'),
      skew = Math.random() < .5 ? Math.random()*fire_spread : -Math.random()*fire_spread
    fs.className = 'fire_shaft'
    fs.style.height = Math.random()*50 + 25 + 'vh'
    fs.style.transform = 'skew('+skew+'deg)'
    fs.style.left = Math.random()*100 + '%'
    var p = document.createElement('div')
    p.className = 'particle'
    p.style.background = colors[Math.floor(Math.random()*colors.length)]
    p.onanimationend = function() { this.remove() }  
    bg.appendChild(fs).appendChild(p)
    }

setInterval(addParticle,1000/60);