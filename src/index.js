import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

	buttonClicked = (e) => {
		this.props.clickHandler(e.target.id);
	}

	render() {
		// console.log(this.props.selected);

		if (this.props.selected.hasOwnProperty([this.props.index])) {
			return (
				<button onClick={this.buttonClicked} id={this.props.index}  className="square">
					{this.props.selected[this.props.index] ? 'X' : 'O'}
				</button>
			);

		} else {
			return (
				<button onClick={this.buttonClicked} id={this.props.index}  className="square">
					{''}
				</button>
			);
		}
	}
}

class Board extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			selected:{},
			turn: false,
			winner: '',
			draw: false
		}
	}

	calculateWinner () {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		const squares = this.state.selected;

		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (squares.hasOwnProperty(a) && squares.hasOwnProperty(b) && squares.hasOwnProperty(c)) {
				if(squares[a] === squares[b] && squares[a] === squares[c]) {
					this.setState({
						winner: squares[a] ? 'X' : 'O'
					});
					return;
				}
			}
		}

		if (Object.keys(squares).length === 9 && !this.state.winner) {
			console.log('drawn')
			this.setState({
				draw: true
			});
		}
	}

	squareClick = (e) => {
		let list = this.state.selected;
		let turn = this.state.turn;

		if(!this.state.winner && !this.state.selected.hasOwnProperty(`${parseInt(e)}`)) {
			list[`${parseInt(e)}`] = turn;
			this.setState({
				selected: list,
				turn: !turn
			});
			this.calculateWinner();
		}

	}

	renderSquare(i) {
		return (
			<Square
				index={i}
				selected={this.state.selected}
				clickHandler={this.squareClick}
			/>
		);
	}

	restartGame = () => {
		this.setState({
			selected:{},
			turn: false,
			winner: '',
			draw : false
		});
	}

	render() {
		const status = `Next player: ${this.state.turn ? 'X' : 'O' }`;
		const winner = `The game is over and the winner is ${this.state.winner}`;
		const draw = 'The match is drawn!';
		console.log(this.state.draw)
		return (
			<div>
				{this.state.draw ?
					<div className="status">{draw} </div> :
					<div className="status">{this.state.winner ? winner : status}</div>
				}
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>

				{this.state.winner || this.state.draw ? <button className="reset" onClick={this.restartGame}>Reset</button> : null}
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);
