# Leafy: a phaser.io game experiment

Leafy is a game about growing and exploring. You start in the middle of a field where you can go left or right.

### Controls
1. Left/Right arrow keys to move
2. Spacebar/Up to jump over gaps and earn points
3. Collect the blue leaves to jump farther/higher
4. Avoid the bees until you have flowers
5. Find your sister!

## Sketch
<img src="https://raw.githubusercontent.com/daverau/leafy/master/sketches/night.png">

## Done
- refactor objects for reposition vs destroy&recreate
- rework wrapping/camera follow `game.camera.bounds.setTo(null,null);` and `game.camera.bounds.height = game.height;` did the trick
- earn points for gap jumps
- refactor gap generation (increase mobile framerate from ~12fps to ~40fps)
- optimize world for mobile
- reduce world size from 50,000 pixels to 3x screen width
- refine gaps (only a dozen vs 500 before)
- add gulp uglify, and rsync tasks
- submit to iOS app store (testflight beta)
- wrap in phonegap
- add touch controls
- add game structure for start/end states
- blue leaf jump boost (removed)
- jump on trees you plant (removed)
- moon and rain
- add player inventory
- add gaps to require jumping
- add flower pickups
- crude plant trees working (removed)
- draw add bee enemy
- owl comes back after time
- quick trees in front with a second loop and tree.group
- owl flys away on first collide
- add leaf pick-ups with sound and simple counter
- weighted randomization for more interesting tree distribution (needs more refinement, perhaps with less overlap)
- add UI text for distance
- kill player on world bound exit
- expand world size
- add tree pngs
- retina issues mostly resolved using `* vars.ratio`

## Todo
- fall off screen to gameover/score/highscore/restart
- move flowers, blueleaves and trees from gaps
- doorway and sister leaf endgame
- design start/end screens
- music
- refine gain jump boost on leaf pickup with max value, gapmax scales with this, gain difficulty
- bees drop honey for bonus points or boost
- background stars, clouds, gradient
- rain on timer
