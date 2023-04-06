import { GameConfig, Position, Score, Ball, GameStatus, Paddle, Game } from "../../../@types";
import { Socket } from "socket.io-client";

export const move = (ball: Ball, onBall: (ball: Ball) => void, paddle1: Paddle, paddle2: Paddle, config: GameConfig) => {
    let ballTmp = detectCollision(ball, (ball.delta.x < 0)? paddle1 : paddle2, config);
    ballTmp.pos.x +=  ballTmp.delta.x;
    ballTmp.pos.y +=  ballTmp.delta.y;

    onBall(ballTmp);
};


export const launchBall = (ball: Ball, onBall: (ball: Ball) => void, onGameStatus: (status: GameStatus) => void) => {
	let ballTmp = ball;
    let dirX = randomNumber(0, 2);
    let dirY = randomNumber(0, 2);
    ballTmp.delta.x = randomNumber(0.8, 2);
    ballTmp.delta.y = randomNumber(0.8, 1);
    ballTmp.delta.x = ballTmp.delta.x * (dirX >= 1 ? -1 : 1);
    ballTmp.delta.y = ballTmp.delta.y * (dirY >= 1 ? -1 : 1);
	ballTmp.speed = 1.5;
	onBall(ballTmp);
	onGameStatus(GameStatus.MOVE_BALL);
};

function randomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export const detectScore = (ball: Ball, config: GameConfig) => {
    let posX =
        ball.pos.x + (ball.delta.x > 0 ? config.ballRayon : -config.ballRayon);
    if (posX >= config.boardWidth) {
        return true;
    } else if (posX <= 0) {
        return true;
	}
	return false;
};

const reset = (ball: Ball, config: GameConfig) => {
    ball.delta.x = 0;
    ball.delta.y = 0;
    ball.pos.x = config.boardWidth / 2;
    ball.pos.y = config.boardHeight / 2;
    ball.speed = 1.5;
    return ball;
};


function detectCollision(ball: Ball, paddle: Paddle, config: GameConfig) {
	
	let posX = ball.pos.x + (ball.delta.x > 0 ? config.ballRayon : -config.ballRayon);
	let posY = ball.pos.y + (ball.delta.y > 0 ? config.ballRayon : -config.ballRayon);
	let paddleX = paddle.x + (ball.delta.x < 0 ? 0 : config.paddleWidth);
	let ballTmp = ball;
	
  
	if (ball.delta.x > 0 && posX >= paddleX) {
	  if (touchPaddle(paddle.y, posY, config) === true) {
		console.log("posX", posX);
		console.log("posY", posY);
		ballTmp = bouncePaddle(ball, paddle, "right", config);
	  }
	} else if (ball.delta.x < 0 && posX <= paddleX) {
	  if (touchPaddle(paddle.y, posY, config) === true) {
		console.log("posX", posX);
		console.log("posY", posY);
		ballTmp = bouncePaddle(ball, paddle, "left", config);
	  }
	}
	if (posY >= config.boardHeight || posY <= 0) {
		ballTmp.delta.y = -ball.delta.y;
	}
  
	return ballTmp;
  }

    function touchPaddle(paddleY: number, posY: number, config: GameConfig): boolean {
        let paddleBottom = paddleY - config.paddleHeight;
        let paddleTop = paddleY + config.paddleHeight;

        return posY <= paddleTop && posY >= paddleBottom;
    }


	function bouncePaddle(ball: Ball, paddle: Paddle, side: string, config: GameConfig) {
		const collisionY = paddle.y - ball.pos.y;
		const normalizedCollisionY = collisionY / (config.paddleHeight / 2);
	  
		let ballTmp = ball;
	  
		if (side === "left") {
		  ballTmp.pos.x = paddle.x + config.paddleWidth + config.ballRayon;
		} else if (side === "right") {
		  ballTmp.pos.x = paddle.x - config.ballRayon;
		}
	  
		// Update the y-velocity based on where the ball hit the paddle
		ballTmp.delta.y = -ballTmp.speed * Math.abs(normalizedCollisionY);
	  
		// Update the x-velocity based on where the ball hit the paddle
		const relativeIntersectY = ball.pos.y - (paddle.y - config.paddleHeight / 2);
		const normalizedRelativeIntersectionY = relativeIntersectY / (config.paddleHeight / 2);
		const bounceAngle = normalizedRelativeIntersectionY * config.ballMaxBounceAngle;
		ballTmp.delta.x = ballTmp.speed * Math.cos(bounceAngle);
	  
		return ballTmp;
	  }
	  