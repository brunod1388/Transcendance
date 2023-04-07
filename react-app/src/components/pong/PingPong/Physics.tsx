import {
    GameConfig,
    Ball,
    GameStatus,
    Paddle,
	Range
} from "../../../@types";

// Function to move the ball
export const move = (
    ball: Ball,
    onBall: (ball: Ball) => void,
    paddle1: Paddle,
    paddle2: Paddle,
    config: GameConfig,
) => {
    // Detect collision with a paddle
    let ballTmp = detectCollision(
        ball,
        ball.pos.y < config.boardHeight / 2 ? paddle1 : paddle2,
        config
    );
    // Update ball position based on its delta
    ballTmp.pos.x += ballTmp.delta.x;
    ballTmp.pos.y += ballTmp.delta.y;

    // Call the onBall function with the updated ball
    onBall(ballTmp);
};

// Function to launch the ball
export const launchBall = (
    ball: Ball,
    onBall: (ball: Ball) => void,
    onGameStatus: (status: GameStatus) => void
) => {
    let ballTmp = ball;
    // Randomly set the initial direction of the ball
    let dirX = randomNumber(0, 2);
    let dirY = randomNumber(0, 2);
    // Set the initial velocity of the ball
    ballTmp.delta.x = randomNumber(0.8, 1);
    ballTmp.delta.y = randomNumber(0.8, 2);
    // Invert the direction of the velocity if dirX or dirY is 1
    ballTmp.delta.x = ballTmp.delta.x * (dirX >= 1 ? -1 : 1);
    ballTmp.delta.y = ballTmp.delta.y * (dirY >= 1 ? -1 : 1);
    ballTmp.speed = 1.5;

    // Call the onBall function with the updated ball
    onBall(ballTmp);
    // Call the onGameStatus function with MOVE_BALL status
    onGameStatus(GameStatus.MOVE_BALL);
};

// Function to generate a random number between min and max
function randomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

// Function to detect if the ball scores
export const detectScore = (ball: Ball, config: GameConfig) => {
    let posY =
        ball.pos.y + (ball.delta.y > 0 ? -config.ballRayon : config.ballRayon);
    if (posY >= config.boardHeight) {
        return true;
    } else if (posY <= 0) {
        return true;
    }
    return false;
};

function detectCollision(ball: Ball, paddle: Paddle, config: GameConfig) {
    // Calculate the positions of the ball and paddle based on their deltas and radius/width
    let posX =
        ball.pos.x;
    let posY =
        ball.pos.y;
		let paddleX: Range = ( ball.pos.y < config.boardHeight / 2)? {min: paddle.x , max: paddle.x + config.paddleWidth} : {min: paddle.x - config.paddleWidth, max: paddle.x};
		let paddleY: Range = {min: paddle.y - config.paddleHeight, max: paddle.y};
		
    // Create a copy of the ball object to update
    let ballTmp = ball;

	if (paddleX.min < posX && paddleX.max > posX && paddleY.min < posY && paddleY.max > posY)
	{
		console.log('bounce');
		console.log("paddleY", paddleY);
		console.log("paddleX", paddleX);
		console.log("ballY", posY);
		console.log("ballX", posX);
		ballTmp.delta.y = -ball.delta.y;
	}
	

    // Check for collision with the top or bottom of the board and update the ball object accordingly
    if (posX >= config.boardWidth || posX <= 0) {
        ballTmp.delta.x = -ball.delta.x;
    }

    // Return the updated ball object
    return ballTmp;
}

function bouncePaddle(
    ball: Ball,
    paddle: Paddle,
    side: string,
    config: GameConfig
) {
	console.log('bounce');
    // Calculate the distance between the paddle's center and the ball's center
    // const collisionX = paddle.x - ball.pos.x;

    // // Normalize the collision distance by dividing it by half the paddle's height
    // const normalizedCollisionX = collisionX / (config.paddleWidth / 2);

    // // Create a temporary ball object to update its velocity
    let ballTmp = ball;

    // // Update the y-velocity based on where the ball hit the paddle
    // ballTmp.delta.x = -ballTmp.speed * Math.abs(normalizedCollisionX);

    // // Update the x-velocity based on where the ball hit the paddle
    // const relativeIntersectX =
    //     ball.pos.x - (paddle.x - config.paddleWidth / 2);
    // const normalizedRelativeIntersectionX =
    //     relativeIntersectX / (config.paddleWidth / 2);
    // const bounceAngle =
    //     normalizedRelativeIntersectionX * config.ballMaxBounceAngle;
    // ballTmp.delta.y = ballTmp.speed * Math.cos(bounceAngle);

    // // If the ball hit the left side of the left paddle, or the right side of the right paddle, reverse the x-velocity
    // if (side === "left" && ballTmp.delta.y < 0) {
    //     ballTmp.delta.y *= -1;
    // } else if (side === "right" && ballTmp.delta.y > 0) {
    //     ballTmp.delta.y *= -1;
    // }

    // // Ensure the ball's speed is at least the minimum speed limit
    // const minSpeedLimit = 3;
    // const speed = Math.sqrt(ballTmp.delta.y ** 2 + ballTmp.delta.y ** 2);
    // if (speed < minSpeedLimit) {
    //     const angle = Math.atan2(ballTmp.delta.x, ballTmp.delta.y);
    //     ballTmp.delta.y = minSpeedLimit * Math.cos(angle);
    //     ballTmp.delta.x = minSpeedLimit * Math.sin(angle);
    // }

    return ballTmp;
}
