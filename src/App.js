import React from 'react';
import './App.css';
class Square extends React.Component {
	render() {
		return ( <button className="but" disabled={this.props.clicked} onClick={() => this.props.onClick()}>
			{this.props.value}
		</button> );
	}
}

class App extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			section: "play",
			vsComputer: null,
			value: "",
			squares: Array( 9 ).fill( null ),
			clicked: Array( 9 ).fill( false ),
			scorex: 0,
			scoreo: 0,
			winner: null,
			turn: true,
			sira: false
		};
	}

	handleClick( i ) {
		let squares = this
			.state
			.squares
			.slice();
		let value = this.state.value;
		let cvalue = this.state.cvalue;
		let vsComputer = this.state.vsComputer;
		let clicked = this
			.state
			.clicked
			.slice();
		let winner = this.state.winner;
		squares[ i ] = value;
		clicked[ i ] = true;

		const lines = [
			[
				0, 1, 2
			],
			[
				3, 4, 5
			],
			[
				6, 7, 8
			],
			[
				0, 3, 6
			],
			[
				1, 4, 7
			],
			[
				2, 5, 8
			],
			[
				0, 4, 8
			],
			[
				2, 4, 6
			]
		];
		let turn = this.state.turn;
		if ( vsComputer === false ) {
			if ( value === "X" ) {
				value = "O";
			} else {
				value = "X";
			}
		}

		this.setState( { squares: squares, value: value, clicked: clicked, turn: true } );

		if ( vsComputer === true && turn === true ) {
			for ( let f in lines ) {
				const [a, b, c] = lines[ f ];
				if ( squares[ a ] === null && squares[ b ] === cvalue && squares[ c ] === cvalue && turn === true ) {
					squares[ a ] = cvalue;
					clicked[ a ] = true;
					turn = false;
				}
				if ( squares[ b ] === null && squares[ a ] === cvalue && squares[ c ] === cvalue && turn === true ) {
					squares[ b ] = cvalue;
					clicked[ b ] = true;
					turn = false;
				}
				if ( squares[ c ] === null && squares[ a ] === cvalue && squares[ b ] === cvalue && turn === true ) {
					squares[ c ] = cvalue;
					clicked[ c ] = true;
					turn = false;
				}
			}
			for ( let y in lines ) {
				const [a, b, c] = lines[ y ];
				if ( squares[ b ] === value && squares[ c ] === value && squares[ a ] === null && turn === true ) {
					squares[ a ] = cvalue;
					clicked[ a ] = true;
					turn = false;
				}
				if ( squares[ a ] === value && squares[ b ] === null && squares[ c ] === value && turn === true ) {
					squares[ b ] = cvalue;
					clicked[ b ] = true;
					turn = false;
				}

				if ( squares[ a ] === value && squares[ b ] === value && squares[ c ] === null && turn === true ) {
					squares[ c ] = cvalue;
					clicked[ c ] = true;
					turn = false;
				}
			}

			for ( let u in lines ) {
				const [a, b, c] = lines[ u ];

				if ( squares[ a ] === cvalue && squares[ b ] === null && squares[ c ] === null && turn === true ) {
					squares[ b ] = cvalue;
					clicked[ b ] = true;
					turn = false;
				}
				if ( squares[ b ] === cvalue && squares[ a ] === null && squares[ c ] === null && turn === true ) {
					squares[ a ] = cvalue;
					clicked[ a ] = true;
					turn = false;
				}
				if ( squares[ c ] === cvalue && squares[ b ] === null && squares[ a ] === null && turn === true ) {
					squares[ b ] = cvalue;
					clicked[ b ] = true;
					turn = false;
				}
			}
			if ( squares[ 4 ] === null && turn === true ) {
				clicked[ 4 ] = true;
				squares[ 4 ] = cvalue;
				turn = false;
			}
			if ( squares.indexOf( null ) > -1 && turn === true ) {
				clicked[ squares.indexOf( null ) ] = true;
				squares[ squares.indexOf( null ) ] = cvalue;
				turn = false;
			}
		}

		this.setState( { squares: squares, value: value, clicked: clicked } );
		for ( let j in lines ) {
			const [a, b, c] = lines[ j ];
			if ( squares[ a ] && squares[ a ] === squares[ b ] && squares[ a ] === squares[ c ] ) {
				winner = squares[ a ];
			}
		}
		if ( winner === null && squares.indexOf( null ) === -1 ) {
			winner = "Draw";
		}
		if ( winner != null ) {
			if ( winner === "X" ) {
				this.setState( {
					scorex: this.state.scorex + 1
				} );
			}
			if ( winner === "O" ) {
				this.setState( {
					scoreo: this.state.scoreo + 1
				} );
			}
			this.setState( { clicked: Array( 9 ).fill( true ), winner: winner } );
			setTimeout( () => {
				this.setState( {
					squares: Array( 9 ).fill( null ),
					clicked: Array( 9 ).fill( false ),
					winner: null,
					sira: this.state.sira === false
						? true
						: false
				} );
				if ( this.state.sira === true && vsComputer === true ) {
					const deneme = this.state.squares;
					const clicked = this.state.clicked;
					clicked[ 4 ] = true;
					deneme[ 4 ] = cvalue;
					this.setState( { squares: deneme, clicked: clicked } );
				}
			}, 3000 );
		}
	}
	renderSquare( i ) {
		return ( <Square value={this
				.state
				.squares[ i ]} onClick={() => this.handleClick( i )} clicked={this
				.state
				.clicked[ i ]}/> );
	}

	section() {
		if ( this.state.section === "play" ) {
			return ( <div className="container">
				<div/>
				<div/>
				<div/>
				<div/>

				<h1>PLAY</h1>
				<div/>
				<button className="but2" onClick={() => this.setState( { vsComputer: true, section: "choose" } )
}>
					Computer
				</button>
				<h2>VS</h2>
				<button className="but2" onClick={() => this.setState( { vsComputer: false, section: "choose" } )
}>
					Player
				</button>
				<div/>
				<div/>
				<div/>
			</div> );
		}
		if ( this.state.section === "choose" ) {
			return ( <div className="container">
				<div/>
				<div/>
				<div/>
				<div/>
				<h1>Chose
				</h1>
				<div/>
				<button className="but2" onClick={() => this.setState( { value: "X", section: "xox", cvalue: "O" } )
}>
					X
				</button>
				<h2>OR</h2>
				<button className="but2" onClick={() => this.setState( { value: "O", section: "xox", cvalue: "X" } )
}>
					O
				</button>
				<div/>
				<div/>
				<div/>
			</div> );
		} else {
			return ( <div className="container">
				<h3>{
						this.state.winner != null
							? "WINNER"
							: "TURN"
					}</h3>
				<h3>=</h3>
				<h3>
					{
						this.state.winner != null
							? this.state.winner
							: this.state.value
					}
				</h3>

				{this.renderSquare( 0 )}
				{this.renderSquare( 1 )}
				{this.renderSquare( 2 )}
				{this.renderSquare( 3 )}
				{this.renderSquare( 4 )}
				{this.renderSquare( 5 )}
				{this.renderSquare( 6 )}
				{this.renderSquare( 7 )}
				{this.renderSquare( 8 )}

				<h3>X = {this.state.scorex}</h3>
				<h3>SCORE</h3>
				<h3>O = {this.state.scoreo}</h3>
				<button className="menu but2" onClick={() => this.setState( {
						section: "play",
						vsComputer: null,
						value: "",
						squares: Array( 9 ).fill( null ),
						clicked: Array( 9 ).fill( false ),
						scorex: 0,
						scoreo: 0,
						winner: null,
						turn: true,
						sira: false
					} )
}>
					MENU
				</button>
			</div> );
		}
	}
	render() {
		return this.section();
	}
}

export default App;
