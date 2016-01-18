# Leafy: a phaser.io game experiment

Leafy is a game about growing and exploring. You start in the middle of a field where you can go left or right.

### Controls
1. Left/Right arrow keys to move
2. Spacebar to jump
3. Collect the blue leaves
4. Press enter key to plants trees

## Install
```
git clone git@github.com:daverau/leafy.git
cd leafy
npm install
npm start
```

## Sketch
<img src="https://raw.githubusercontent.com/daverau/leafy/master/sketches/night.png">

## Done
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
- draw add bee enemy
- crude plant trees working
- add flower pickups
- add gaps to require jumping
- add player inventory
- moon
- jump on trees you plant

## Todo
- bees drop honey
- draw bear
- doorway sprite with collide event
- bear near doorway
- draw inside of tree
- start/end game states
- music
- blue leaf jump boost
- background image for effect
- refine gaps
- move flowers, blueleaves and trees from gaps
- add touch controls
- wrap in phonegap
- submit to iOS app store

## Someday
- non-retina fixes?
- code dynamic trees (cool vue.js experiment with sliders)
- change leaf colors
- grow trees with timers (why?)