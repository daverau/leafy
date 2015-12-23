# Leafy: a phaser.io game experiment

My first game.

### Controls
1. Left/Right arrow keys to move
2. Spacebar to jump
3. Nothing else, uneventful so far.

## Install
```
git clone git@github.com:daverau/leafy.git
cd leafy
npm install
node server.js
```

## Sketch
<img src="https://raw.githubusercontent.com/daverau/leafy/master/sketches/night.png">

## Done recently...
- retina issues mostly resolved
- add tree pngs
- expand world size
- kill player on world bound exit
- add UI text for distance
- weighted randomization for more interesting tree distribution (needs more refinement)

## Todo
- start/end game states
- sound!
- doorway sprite with collide event
- implement owl
- draw inside of tree
- explore timers for speed boost
- add leaf power-ups
- draw lady bug
- change leaf colors
- add player inventory
- plant & grow trees with timers
- night time timer triggers moon and darker colors
- draw dynamic trees (cool vue.js experiment with sliders)
- play with trees in front with `game.world.bringToTop(this.sprite)`