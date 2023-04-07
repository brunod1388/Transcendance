import { GameConfig, GameStatus } from "../game.types";

// Rayon of the ball
const RAYON = 5;

// Width of the board
const WIDTH = 480;

// Height of the board
const HEIGHT = 640;

// Max angle of the ball after colliding with a paddle
const MAXBOUNCEANGLE = 1.0472; // ~ 60 degrés

// Width of the paddle
const PADDLE_WIDTH = 50;

// Height of the paddle
const PADDLE_HEIGHT = 50;

// Distance between the border of the board and the paddles
const WALL_TO_PADDLE = 10;


export const pingpongConfig: GameConfig = {
	room: "",
	status: GameStatus.LOADING,
	ballRayon: RAYON,
	boardWidth: WIDTH,
	boardHeight: HEIGHT,
	ballMaxBounceAngle: MAXBOUNCEANGLE,
    paddleWidth: PADDLE_WIDTH,
    paddleHeight: PADDLE_HEIGHT,
	initialBall: {
        pos: { x: WIDTH / 2, y: HEIGHT / 2 },
        delta: { x: 0, y: 0 },
        speed: 0,
    },
    initialPaddle1: { x: WIDTH/2 + PADDLE_WIDTH/2 , y: WALL_TO_PADDLE },
    initialPaddle2: { x: WIDTH/2  + PADDLE_WIDTH/2, y: HEIGHT - WALL_TO_PADDLE },
	// initialPaddle1: { x: WALL_TO_PADDLE, y: HEIGHT/2 + PADDLE_HEIGHT/2 },
    // initialPaddle2: { x: WIDTH - WALL_TO_PADDLE, y: HEIGHT/2  + PADDLE_HEIGHT/2 },
};