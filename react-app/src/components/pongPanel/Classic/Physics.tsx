import { GameConfig, Ball, GameStatus, Paddle, Position } from "@customTypes";

// Function to move the ball
export const move = (
    ball: Ball,
    onBall: (ball: Ball) => void,
    paddle1: Paddle,
    paddle2: Paddle,
    config: GameConfig
) => {
    // Detect collision with a paddle
    let ballTmp = detectCollision(ball, ball.delta.x < 0 ? paddle1 : paddle2, config);
    // Update ball position based on its delta
    ballTmp.pos.x += ballTmp.delta.x;
    ballTmp.pos.y += ballTmp.delta.y;
    ballTmp.delta = clampVector(ballTmp.delta, ball.speed, ball.speed);
    // Call the onBall function with the updated ball
    onBall(ballTmp);
};

// Function to launch the ball
export const launchBall = (
    onBall: (ball: Ball) => void,
    onGameStatus: (status: GameStatus) => void,
    config: GameConfig
) => {
    let ballTmp = {
        pos: { x: config.boardWidth / 2, y: config.boardHeight / 2 },
        delta: { x: 0, y: 0 },
        speed: 0,
    };
    // Randomly set the initial direction of the ball
    let dirX = randomNumber(0, 2);
    let dirY = randomNumber(0, 2);
    // Set the initial velocity of the ball
    ballTmp.delta.x = randomNumber(0.8, 2);
    ballTmp.delta.y = randomNumber(0.8, 1);
    // Invert the direction of the velocity if dirX or dirY is 1
    ballTmp.delta.x = ballTmp.delta.x * (dirX >= 1 ? -1 : 1);
    ballTmp.delta.y = ballTmp.delta.y * (dirY >= 1 ? -1 : 1);
    ballTmp.speed = 0.7;
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
    let posX = ball.pos.x + (ball.delta.x > 0 ? config.ballRayon : -config.ballRayon);
    if (posX >= config.boardWidth) {
        return true;
    } else if (posX <= 0) {
        return true;
    }
    return false;
};

function detectCollision(ball: Ball, paddle: Paddle, config: GameConfig) {
    // Calculate the positions of the ball and paddle based on their deltas and radius/width
    let posX = ball.pos.x + (ball.delta.x > 0 ? config.ballRayon : -config.ballRayon);
    let posY = ball.pos.y + (ball.delta.y > 0 ? config.ballRayon : -config.ballRayon);
    let paddleX = paddle.x + (ball.delta.x < 0 ? config.paddleWidth : -config.paddleWidth);

    // Create a copy of the ball object to update
    let ballTmp = ball;

    // Check for collision with the paddle and update the ball object accordingly
    if (ball.delta.x > 0 && posX >= paddleX) {
        if (touchPaddle(paddle.y, posY, config) === true) {
            ballTmp = bouncePaddle(ball, paddle, "right", config);
        }
    } else if (ball.delta.x < 0 && posX <= paddleX) {
        if (touchPaddle(paddle.y, posY, config) === true) {
            ballTmp = bouncePaddle(ball, paddle, "left", config);
        }
    }

    // Check for collision with the top or bottom of the board and update the ball object accordingly
    if (posY >= config.boardHeight || posY <= 0) {
        ballTmp.delta.y = -ball.delta.y;
    }

    // Return the updated ball object
    return ballTmp;
}

function touchPaddle(paddleY: number, posY: number, config: GameConfig): boolean {
    // Calculate the top and bottom y positions of the paddle
    let paddleBottom = paddleY - config.paddleHeight;
    let paddleTop = paddleY;

    // Check if the ball is between the top and bottom of the paddle
    return posY <= paddleTop && posY >= paddleBottom;
}

function bouncePaddle(ball: Ball, paddle: Paddle, side: string, config: GameConfig) {
    // Calculate the distance between the paddle's center and the ball's center
    const collisionY = paddle.y - ball.pos.y;

    // Normalize the collision distance by dividing it by half the paddle's height
    const normalizedCollisionY = collisionY / (config.paddleHeight / 2);

    // Create a temporary ball object to update its velocity
    let ballTmp = ball;

    // Update the y-velocity based on where the ball hit the paddle
    ballTmp.delta.y = -ball.speed * Math.abs(normalizedCollisionY);

    // Update the x-velocity based on where the ball hit the paddle
    const relativeIntersectY = ball.pos.y - (paddle.y - config.paddleHeight / 2);
    const normalizedRelativeIntersectionY = relativeIntersectY / (config.paddleHeight / 2);
    const bounceAngle = normalizedRelativeIntersectionY * config.ballMaxBounceAngle;
    ballTmp.delta.x = ballTmp.speed * Math.cos(bounceAngle);

    // If the ball hit the left side of the left paddle, or the right side of the right paddle, reverse the x-velocity
    if (side === "left" && ballTmp.delta.x < 0) {
        ballTmp.delta.x *= -1;
    } else if (side === "right" && ballTmp.delta.x > 0) {
        ballTmp.delta.x *= -1;
    }
    ballTmp.speed += 0.2;

    // Ensure the ball's speed is at least the minimum speed limit
    // const minSpeedLimit = 3;
    // const speed = Math.sqrt(ballTmp.delta.x ** 2 + ballTmp.delta.y ** 2);
    // if (speed < minSpeedLimit) {
    //     const angle = Math.atan2(ballTmp.delta.y, ballTmp.delta.x);
    //     ballTmp.delta.x = minSpeedLimit * Math.cos(angle);
    //     ballTmp.delta.y = minSpeedLimit * Math.sin(angle);
    // }
    return ballTmp;
}

function clampVector(vector: Position, minSpeed: number, maxSpeed: number) {
    const speed = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    const clampedSpeed = Math.max(minSpeed, Math.min(maxSpeed, speed));
    const clampedVector = {
        x: (vector.x / speed) * clampedSpeed,
        y: (vector.y / speed) * clampedSpeed,
    };
    return clampedVector;
}
