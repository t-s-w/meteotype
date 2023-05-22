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
A `Debris` object forms the most common unit of the game. It has the following properties:

* `id` (num): A unique identifier for Debris that no two Debris will share in one Game.
* `height` (num): Current height (from bottom of screen) of the meteor. If it reaches 0, it has collided and destroyed the planet (lose condition).
* `speed` (num): Higher speeds make faster-falling Debris.
* `word` (str): The word that the player must type to eliminate this meteor.
* `remaining` (arr): Initialised to be `word.split('')`. The remaining letters that need to be typed to destroy the Debris.
* `uiElement`, `uiLabel` (HTML Element): The DOM elements associated with the Debris for animation purposes.
* `collided` (bool): Whether the Debris has fallen to the bottom of the screen. Triggers the lose condition if `true`.
* `posX`, `endX`, `speedX` (num): x-axis movement of the debris. Randomised to provide variety (they don't all fall straight down) 
* `image` (str): Emoji that is used as sprite for the debris
* `type` (num): Type of the Debris; different types have different fall speeds and difficulty.

Debris methods include the following:
* UI control: `spawn` puts a Debris that exists in memory on to the page and actually makes it interactable. `fall` and `setPosition` are used to animate their falling.
* Interaction: `strike` is called if the player types the correct letter and progresses the destruction of the Debris by removing one letter.
* Destruction: `destroy` will remove the current Debris from the game's list of active meteors and play screen, while animating their destruction.
* `spawn` (func): Puts the Debris into play. Makes it active, falling, targetable while creating the DOM elements to make it visble to player.


### Game State - the Game Class

Upon starting the game, initiate a new `Game` and assign it to `window.gameState`. `gameState` provides the single source of truth for the current state of the game, which may include total points, meteors to be spawned, current spawn wave, etc. A `Game` has the following properties:

* `activeDebris`, `queuedDebris` (arr): Active Debris are those currently on screen and interactable. Queued debris will be spawned at regular intervals depending on current wave.
* `currentTarget` (Debris): Defines the current actively-target Debris, which will be highlighted. Targets cannot be changed; once a Debris is started to be hit, it must be destroyed before hitting any other Debris.
* `gameBoard` (HTML Element): The visual DOM element of the game.
* `debrisIndex` (num): An auto-increasing number that assigns index numbers to debris for reference.
* `gameTimeHandler` (num): The id for the `setInterval` that simulates time flow in the game.
* `systemMessageHandler` (num): The id for the `setTimeout` that displays messages on screen during the game (used to indicate wave starts, etc.)
* `systemMessageQueue` (arr): An array of queued messages to be shown on the game screen.
* `currentWave` (num): The wave # the player is currently on.

And the following methods:

* `keyHandler`, `shoot`, `acquireTarget`: `keyHandler` is the event listener call back for keyboard presses. If no Debris is currently being targeted, use `acquireTarget` to search through all active Debris to target. If one is already targeted, attempt to `shoot` it (which may miss if the player typos). Targets cannot be changed without destroying them.
* `displayMessage` displays messages on screen like wave beginnings, etc.
* `start`, `tick`, `stop`: `tick` is the time progress of the game, `start` and `stop` start and stop the time flow.
* `triggerWin` and `triggerFail` cause the game to end and display the corresponding screens.