import {
    Position,
    RAYON,
    WIDTH,
    HEIGHT,
    TOP_WALL,
    BOTTOM_WALL,
    LEFT_WALL,
    RIGHT_WALL,
    MAXBOUNCEANGLE,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
} from "../../@types";

class BallBase {
    protected pos: Position;
    protected delta: Position;
    public scored: number;

    constructor() {
        this.pos = { x: 0, y: 0 };
        this.delta = { x: 2, y: 0 };
        this.scored = 0;
    }

    public get position() {
        return this.pos;
    }
}

export class BallData extends BallBase {
    public move(paddleLeft: Position, paddleRight: Position) {
        this.pos.x += this.delta.x;
        this.pos.y += this.delta.y;
        this.handleCollision(paddleLeft, paddleRight);
    }

    private handleCollision(paddleLeft: Position, paddleRight: Position) {
        let posX = this.pos.x + (this.delta.x > 0 ? RAYON : -RAYON);

        if (this.isCloseToPaddle(posX, paddleRight.x, paddleLeft.x) === true) {
            this.detectCollision(
                posX,
                this.delta.x > 0 ? paddleRight : paddleLeft
            );
        }
        this.detectCollision(posX);
    }

    private isCloseToPaddle(
        posX: number,
        leftX: number,
        rightX: number
    ): boolean {
        return posX >= rightX - PADDLE_WIDTH || posX <= leftX + PADDLE_WIDTH;
    }

    private detectCollision(posX: number, paddle?: Position) {
        let posY = this.pos.y + (this.delta.y > 0 ? RAYON : -RAYON);

        if (paddle !== undefined) {
            this.detectPaddle(paddle, posX, posY);
        } else {
            this.detectWall(posX, posY);
        }
    }

    private detectPaddle(
        paddle: Position,
        posX: number,
        posY: number
    ): boolean {
        let paddleX =
            paddle.x + (this.delta.x > 0 ? -PADDLE_WIDTH : PADDLE_WIDTH);

        if (this.delta.x > 0 && posX >= paddleX) {
            if (this.touchPaddle(paddle.y, posY) === true) {
                return this.bouncePaddle(paddle, "right");
            }
        } else if (this.delta.x < 0 && posX <= paddleX) {
            if (this.touchPaddle(paddle.y, posY) === true) {
                return this.bouncePaddle(paddle, "left");
            }
        }
        return false;
    }

    private touchPaddle(paddleY: number, posY: number): boolean {
        let paddleBottom = paddleY - PADDLE_HEIGHT;
        let paddleTop = paddleY + PADDLE_HEIGHT;

        return posY <= paddleTop && posY >= paddleBottom;
    }

    private bouncePaddle(paddle: Position, side: string): boolean {
        let collisionY = paddle.y - this.pos.y;
        let normalizedCollisionY = collisionY / (60 / 2);
        let bounceAngle = normalizedCollisionY * MAXBOUNCEANGLE;

        if (side === "left") {
            this.delta.x = 2 * Math.cos(bounceAngle);
            this.delta.y = 2 * -Math.sin(bounceAngle);
        } else if (side === "right") {
            this.delta.x = 2 * -Math.cos(bounceAngle);
            this.delta.y = 2 * -Math.sin(bounceAngle);
        }
        return true;
    }

    private detectWall(posX: number, posY: number) {
        if (posX >= RIGHT_WALL) {
            this.scored = 1;
        } else if (posX <= LEFT_WALL) {
            this.scored = -1;
        } else if (posY >= TOP_WALL || posY <= BOTTOM_WALL) {
            this.delta.y = -this.delta.y;
        }
    }

    reset() {
        this.delta.x = 0;
        this.delta.y = 0;
        this.pos.x = WIDTH / 2;
        this.pos.y = HEIGHT / 2;
    }

    launchBall() {
        let dirX = randomNumber(0, 2);
        let dirY = randomNumber(0, 2);
        this.delta.x = randomNumber(0.8, 2);
        this.delta.y = randomNumber(0.8, 2);
        this.delta.x = this.delta.x * (dirX >= 1 ? -1 : 1);
        this.delta.y = this.delta.y * (dirY >= 1 ? -1 : 1);
    }
}

function randomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}
