# Leafy: a phaser.io game experiment

Leafy is a game about growing and exploring. You start in the middle of a field where you can go left or right.

### Controls
1. Left/Right arrow keys to move
2. Spacebar to jump
3. Collect leaves to plant new trees
4. "enter key" plants trees

## Install
```
git clone git@github.com:daverau/leafy.git
cd leafy
npm install
npm start
```

## Sketch
<img src="https://raw.githubusercontent.com/daverau/leafy/master/sketches/night.png">

## Done recently...
- retina issues mostly resolved
- add tree pngs
- expand world size
- kill player on world bound exit
- add UI text for distance
- weighted randomization for more interesting tree distribution (needs more refinement, perhaps with less overlap)
- add leaf pick-ups with sound and simple counter
- owl flys away on first collide
- quick trees in front with a second loop and tree.group
- owl comes back after time

## Todo
- start/end game states
- plant & grow trees with timers
- doorway sprite with collide event
- moon with subtle movement
- music
- draw inside of tree
- draw lady bug
- code dynamic trees (cool vue.js experiment with sliders)
- change leaf colors
- add player inventory