import {
    GameConfig,
    Ball,
    GameStatus,
    Paddle,
    Range,
    Position,
} from "../../../@types";

// Function to move the ball
export const move = (
    ball: Ball,
    onBall: (ball: Ball) => void,
    paddle1: Paddle,
    paddle2: Paddle,
    config: GameConfig,
    myMovement: Position,
    yourMovement: Position,
    lastHit: number,
    onLastHit: (nb: number) => void
) => {
    // Detect collision with a paddle
    let ballTmp = detectCollision(
        ball,
        lastHit,
        onLastHit,
        ball.pos.y < config.boardHeight / 2 ? paddle1 : paddle2,
        config,
        ball.pos.y < config.boardHeight / 2 ? myMovement : yourMovement
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

function detectCollision(
    ball: Ball,
    lastHit: number,
    onLastHit: (nb: number) => void,
    paddle: Paddle,
    config: GameConfig,
    movement: Position
) {
    // Calculate the positions of the ball and paddle based on their deltas and radius/width
    let posX = ball.pos.x;
    let posY = ball.pos.y;
    let paddleX: Range =
        ball.pos.y < config.boardHeight / 2
            ? { min: paddle.x, max: paddle.x + config.paddleWidth }
            : { min: paddle.x - config.paddleWidth, max: paddle.x };
    let paddleY: Range = { min: paddle.y - config.paddleHeight, max: paddle.y };

    // Create a copy of the ball object to update
    let ballTmp = ball;

    if (
        paddleX.min < posX &&
        paddleX.max > posX &&
        paddleY.min < posY &&
        paddleY.max > posY
    ) {
        if (
            lastHit === 0 ||
            (lastHit > config.boardHeight / 2 &&
                ball.pos.y < config.boardHeight / 2) ||
            (lastHit < config.boardHeight / 2 &&
                ball.pos.y > config.boardHeight / 2)
        ) {
            onLastHit(ballTmp.pos.y);
            ballTmp = bouncePaddle(ball, paddle, config, movement);
        }
    }

    // Check for collision with the top or bottom of the board and update the ball object accordingly
    if (posX >= config.boardWidth || posX <= 0) {
        console.log(ballTmp.delta);
        ballTmp.delta.x = -ball.delta.x;
    }

    // Return the updated ball object
    return ballTmp;
}
function bouncePaddle(
    ball: Ball,
    paddle: Paddle,
    config: GameConfig,
    movement: Position
) {
    let ballTmp = ball;

    if (ball.pos.y < config.boardHeight / 2) {
        movement.y *= -1;
    }

    // Calculate the angle between the vectors
    const dotProduct = ball.delta.x * movement.x + ball.delta.y * movement.y;
    const ballMagnitude = Math.sqrt(ball.delta.x ** 2 + ball.delta.y ** 2);
    const paddleMagnitude = Math.sqrt(movement.x ** 2 + movement.y ** 2);
    let angle = Math.acos(dotProduct / (ballMagnitude * paddleMagnitude));

    // Check for NaN and negative denominator
    if (isNaN(angle) || dotProduct / (ballMagnitude * paddleMagnitude) < -1) {
        angle = Math.PI;
    }

    // Check if angle is greater than maxAngle
    if (angle > config.ballMaxBounceAngle) {
        angle = config.ballMaxBounceAngle;
    }

    // Adjust the ball's velocity vector based on the angle
    const velocityMagnitude = Math.sqrt(
        ballMagnitude ** 2 + paddleMagnitude ** 2
    );
    const velocityAngle = Math.atan2(ball.delta.y, ball.delta.x) + angle;
    const velocity: Position = {
        x: velocityMagnitude * Math.cos(velocityAngle),
        y: velocityMagnitude * Math.sin(velocityAngle),
    };
    ballTmp.delta.x = velocity.x;
    ballTmp.delta.y = velocity.y;

    if (Math.abs(ballTmp.delta.y) < 0.1) {
        ballTmp.delta.y = ball.pos.y < config.boardHeight / 2 ? 1 : -1;
    }

    if (ballTmp.pos.y < config.boardHeight / 2 && ballTmp.delta.y < 0) {
        ballTmp.delta.y *= -1;
    } else if (ballTmp.pos.y > config.boardHeight / 2 && ballTmp.delta.y > 0) {
        ballTmp.delta.y *= -1;
    }

    ballTmp.delta = clampVector(ballTmp.delta, 2, 5);
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
