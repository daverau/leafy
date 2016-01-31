# Leafy: a phaser.io game experiment

Leafy is a platform game about finding your sister. You start at the edge of the woods where you can go right.

### Controls
1. Left/Right arrow keys to move
2. Spacebar/Up to jump over gaps and earn points
3. Collect the blue leaves to jump farther/higher
4. Avoid the bees until you have flowers

## Sketch
My original concept was inspired by a gamejam theme about "growing"
<img src="https://raw.githubusercontent.com/daverau/leafy/master/sketches/night.png">

## Todo
- platform gaps scale with jump boost for difficulty
- score UI animate
- endgame with doorway and friend
- move flowers, blueleaves and trees from gaps
- music
- instructions overlay
- background stars, clouds, gradient
- bees drop honey for bonus points/boost
- fix performance on resume (what is wrong?)

## Changelog

### v1.4.1
- allow leafy to jump just after falling off gaps
- tighter typography
- button hover and click sounds
- short/long jumps based on button press duration

### v1.4
- fall off screen to gameover/score/highscore/restart
- start + end screens
- ~~rain on timer~~ removed particle emitter for rain and increased fps to ~60! horray!
- sad face on death
- animate gameover

### v1.3
- GA basic (event tracking)[https://github.com/danwilson/google-analytics-plugin]
- refactor objects for reposition vs destroy&recreate (better fps ~40-52)
- rework wrapping/camera follow `game.camera.bounds.setTo(null,null);` and `game.camera.bounds.height = game.height;` did the trick
- refine jump boost gain on leaf pickup with max value
- earn points for gap jumps
- refactor gap generation (increase mobile framerate from ~12fps to ~40fps)
- optimize world for mobile
- reduce world size from 50,000 pixels to 3x screen width

### V1.2
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

### v1.1
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
