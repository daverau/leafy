# Leafy: a phaser.io game experiment

Leafy is a platform game about finding your sister. You start at the edge of the woods where you can go right.

### Install locally
1. `git clone https://github.com/daverau/leafy && cd leafy`
2. `npm install -g`

### Controls
1. Touch screen or up arrow to jump
2. Collect the blue acorns for upgrades
3. Jump on bees until you have flowers

## Gameplay
<img src="https://raw.githubusercontent.com/daverau/leafy/master/sketches/gameplay.gif">

## Todo
- [feature] endgame with doorway and friend
- [polish] scale trees as you go higher in levels
- [polish] background stars, clouds, day/night shift
- [polish] music
- [polish] instructions overlay
- [optimize] reduce garbage collection, look into platform lastX checking
- [optimize] custom phaser build `grunt custom --exclude gamepad,retrofont,video,rope,net,ninja,creature,p2,tilemaps`

## Changelog

### unreleased
- 

### v1.7
- platform gaps scale with jump boost for difficulty
- adjust small platform frequency
- level animation
- reduce trees to 9 for better performance
- replaced blueleaves with acorns
- added random acorn platforms
- [feature] pause: https://github.com/presidenten/phaser-examples/blob/7c0befd068b99bc653a492c61519a46ce532a188/examples/misc/pause%20menu.js

### v1.6
- background water could be better; color refinements to world
- score UI animate; keep blue leaves and flowers after falling
- arrange blue leaves a pattern, move from gaps
- jump sound should fire only once (doesn't loop the whole time you're jumping due to `update()`)
- double jump sound fixed with `allowMultiple = true`
- [bug] fix performance on resume (`requestAnimationFrame` wasn't pausing)
- jump on bees, 1-way movement, fewer bees
- [bug] fix leafy jump animation

### v1.5
- short/long jumps based on button press duration
- allow leafy to jump just after falling off gaps
- tighter typography
- button hover and click sounds
- runmode: always run to the right
- double jump! much more fun for jumping overbees

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

## Sketch
My original concept sketch was inspired by a gamejam theme about "growing"
<img src="https://raw.githubusercontent.com/daverau/leafy/master/sketches/night.png">
