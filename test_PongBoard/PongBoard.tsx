// import logo from './logo.svg';
import React from 'react';
import style from './PongBoard.module.js';

const PADDLE_BOARD_SIZE = 3;
const PADDLE_EDGE_SPACE = 1;

const ROW_SIZE = 10;
const COL_SIZE = 20;
// const board = [...Array(ROW_SIZE * COL_SIZE)]

const PLAYER_UP   = 38  // up arrow
const PLAYER_DOWN = 40  // down arrow
const OPPONENT_UP    = 90; /* z */
const OPPONENT_DOWN    = 98; /* x */
const PAUSE = 32;

const style = {
  width: "250px",
  height: "250px",
  display: "grid",
  gridTemplate: `repeat(${ROW_SIZE}, 1fr) / repeat(${COL_SIZE}, 1fr)`
}
const InitialState = () => {
  const board = [...Array(PADDLE_BOARD_SIZE)].map((_, pos) => pos);

  return {
    player: board.map(x => (x * COL_SIZE) + PADDLE_EDGE_SPACE),
    opponent: board.map(x => ((x + 1) * COL_SIZE) - (PADDLE_EDGE_SPACE + 1)),
    ball: Math.round((ROW_SIZE * COL_SIZE) / 2) + ROW_SIZE,
    ballSpeed: 100,
    deltaY: -COL_SIZE,
    deltaX: -1,
    pause: true,
    playerScore: 0,
    opponentScore: 0, 
  }
}

function getStyle(val: number): style.  {
	if (val === BACKGROUND) {
		return {};
	} if (val === PLAYER){
		return playerStyle;
	} else {
		return ballStyle;
	}
}

const Box = (props) =>	<div style={backgroundStyle}>
							<div style={getStyle(props.name)} />
						</div>

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = InitialState();
  }

  resetGame = () => this.setState({
    ball: Math.round((ROW_SIZE * COL_SIZE) / 2) + ROW_SIZE,
  })

  moveBoard = (playerBoard, isUp) => {
    const playerEdge = isUp? playerBoard[0]: playerBoard[PADDLE_BOARD_SIZE-1];

    if (!this.touchingEdge(playerEdge)) {
        const deltaY =  (isUp ? -COL_SIZE : COL_SIZE);
        return playerBoard.map(x=> x + deltaY);
    }      

    return false
  }

  touchingEdge = (pos) => (0 <= pos && pos < COL_SIZE) || 
    (COL_SIZE * (ROW_SIZE - 1) <= pos && pos < COL_SIZE * ROW_SIZE)

  touchingPaddle = (pos) => {
    return (this.state.player.indexOf(pos) !== -1) ||
        (this.state.opponent.indexOf(pos) !== -1) ||
        this.state[(this.state.deltaX === -1) ? "player":"opponent"].indexOf(pos + this.state.deltaX) !== -1;
  }

  touchingPaddleEdge = (pos) => this.state.player[0] === pos ||
    this.state.player[PADDLE_BOARD_SIZE - 1] === pos ||
    this.state.opponent[0] === pos ||
    this.state.opponent[PADDLE_BOARD_SIZE - 1] === pos

  isScore = (pos) => (this.state.deltaX === -1 && pos % COL_SIZE === 0) || 
    (this.state.deltaX === 1 && (pos+1) % COL_SIZE === 0)

  bounceBall = () => {
    // new ball state
    const newState = this.state.ball + this.state.deltaY + this.state.deltaX;

   if (this.touchingEdge(newState)) {
        this.setState({deltaY: -this.state.deltaY})
    }

    if (this.touchingPaddleEdge(newState)) {
        this.setState({deltaY: -this.state.deltaY}) 
    }

    if (this.touchingPaddle(newState)) {
        this.setState({deltaX: -this.state.deltaX}) 
    }

    /* updating board */
    this.setState({ball: newState})

    /* checking if loss or won */
    if (this.isScore(newState)) {
        if (this.state.deltaX !== -1) {
            /* player won */ 
            this.setState({
                playerScore: this.state.playerScore + 1,
                ball: newState,
            })
        } else {
            /* opponent won */ 
            this.setState({
                opponentScore: this.state.opponentScore + 1,
                ball: newState,
            })
        }
        this.setState({pause: true})
        this.resetGame();
    }
  }

  componentDidMount() {
    /* moving the ball */
    setInterval(() => {
        if (!this.state.pause){
            this.bounceBall();
        }
    }, this.state.ballSpeed);
    document.onkeydown = this.keyInput;
  }

  keyInput = ({keyCode}) => {
    // const PLAYER_UP   = 38  // up arrow
    // const PLAYER_DOWN = 40  // down arrow
    // const OPPONENT_UP    = 90; /* z */
    // const OPPONENT_DOWN    = 98; /* x */
    console.log("key is " + keyCode);
    switch (keyCode) {
          case PLAYER_UP:
          case PLAYER_DOWN:
              const movedPlayer = this.moveBoard(this.state.player, keyCode===PLAYER_UP); 
              if (movedPlayer) {
                  this.setState({player: movedPlayer, pause: false})
              }
              break;
          case OPPONENT_UP:
          case OPPONENT_DOWN:
              const movedOpp = this.moveBoard(this.state.opponent, keyCode===OPPONENT_UP); 
              if (movedOpp) {
                  this.setState({opponent: movedOpp, pause: false})
              }
              break;
          case PAUSE:
              this.setState({pause: true})
              break;
    }
  }

  render() {
    const board = [...Array(ROW_SIZE * COL_SIZE)].map((_, pos) => {
      let val = BACKGROUND;
      if ((this.state.player.indexOf(pos) !== -1) || 
        (this.state.opponent.indexOf(pos) !== -1)) {
          val = PLAYER;
        } else if (this.state.ball === pos) {
          val = BALL;
        }
        return <Box key={pos} name={val}/>;
    })

    const divider = [...Array(ROW_SIZE/2+2)].map(_=> <div>{"|"}</div>);
    return (
      <div name="outer" style={outer}>
        <h1> {"[space]"} {this.state.pause? "PLAY/pause": "play/PAUSE"} </h1>
        <div name="inner" style={inner}>
          <div style={style}>{board}</div>
          <div style={score}>{this.state.playerScore}</div>
              <div style={dividerStyle}>  {divider} </div>
              <div style={dividerStyle}>{this.state.opponentScore}</div>
        </div>
        <h3> {"press up and down to move"} </h3>
      </div>
    )
  }
}




export default App;

