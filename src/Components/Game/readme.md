#Game
Board - this is essentially the brain of the app. It ties the GameMap together with the Canvas to update the screen as the player is moving around on the map.
it also keeps track of the interactions between the player and the world.
Canvas - has no awareness of anything, solely used to draw
GameMap - An array of arrays that contain the location of everything (player, items, boss, tiles)
