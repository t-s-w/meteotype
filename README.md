# Browser Game - meteotype

A shower of meteors is headed right toward Earth and threatening world destruction! Grab your keyboard-controlled weirdly powerful laser and destroy the pieces before they land!

## Tech Stack

* TypeScript (Javascript) - Used to control majority of the game.
    - Game data: Game state stored in a Game Class, the meteors to be destroyed are all Debris classes.
    - DOM Manipulation: Provides the visual animations in the game.
* HTML & CSS - It's a browser game after all! HTML provides the structure of the document objects on the screen, CSS is used to make them look good!
* Vite - development environment used to code the game.

## Wireframe - Development notes

### The Debris Class - basic unit of the game
A `Debris` object forms the most common unit of the game. It has the following properties and methods:

* `id` (num): A unique identifier for Debris that no two Debris will share in one Game.
* `height` (num): Current height (from bottom of screen) of the meteor. If it reaches 0, it has collided and destroyed the planet (lose condition).
* `speed` (num): Higher speeds make faster-falling Debris.
* `word` (str): The word that the player must type to eliminate this meteor.
* `remaining` (arr): Initialised to be `word.split('')`. The remaining letters that need to be typed to destroy the Debris.
* `fall` (func): Calling this method will cause the `height` to decrease according to `speed` and lower the position of the corresponding DOM element. If `height` reaches 0, call the Game's `collide` method.
* `strike` (func): Calling this method will remove the front letter of `remaining`. Event handler for when player types the correct next letter of a word.
* `destroy` (func): Calling this method will remove the current Debris from the game's list of active meteors and play screen. Hopefully also play an animation?
* `spawn` (func): Puts the Debris into play. Makes it active, falling, targetable while creating the DOM elements to make it visble to player.


### Game State - the Game Class

* Upon starting the game, initiate a new `Game` and assign it to `gameState`.
* `gameState` provides the single source of truth for the current state of the game, which may include total points, meteors to be spawned, current difficulty level, etc.
* A `Game` has the following properties and methods:
    - `difficulty` (num): Current difficulty level. Thee game will last up to 5 minutes, and the difficulty level will increase automatically every 30 seconds. Higher difficulties will spawn more targets, spawn more difficult targets, and increase their falling speed.
    - `meteorQueue` (arr): An array containing a queue of meteors to be spawned.
    - `meteorActive` (arr): An array containing the current active (on-screen, falling, targetable) meteors.
