board = document.getElementById("chessBoard");

blackSquareColor = "#b38775";
whiteSquareColor = "#FFE5CC";
blackSquareColorSelection = "#d4b9a7";
whiteSquareColorSelection = "#fffaf0";
legalSquareColor = "#ea8089";

function isIn(arr, el) {
	for(var i=0; i<arr.length; i++){
		// console.log(typeof(arr[i]))
		if(typeof(arr[i]) === 'object'){
			for(var j=0; j<arr[i].length; j++){
				if(arr[i][j]===el){
					return true;
				}
			}	
		}else{
			if(arr[i]===el){
				return true;
			}
		}
	}
	return false;
}

function idToAlgebraicNotation(ch){
	var i = parseInt(ch.charAt(0));
	var j = parseInt(ch.charAt(1));
	row = (8-i).toString();
	col = String.fromCharCode(j+97)
	return col+row;
}

function num2Sq(x,y){
	return ''+x+y;
}

function sq2Num(sq){
	return [sq.charAt(0), sq.charAt(1)];
}

function getColorFromId(ch) {
	var i = parseInt(ch.charAt(0));
	var j = parseInt(ch.charAt(1));
	return boardList[i][j].charAt(0);
}
function getTypeFromId(ch){
	var i = parseInt(ch.charAt(0));
	var j = parseInt(ch.charAt(1));
	return boardList[i][j].charAt(1);
}

function validIndex(i,j){
	return (i>=0 && i < 8 && j>= 0 && j<8);
}

function moveTakeNothing(i,j){
	var color2 = getColorFromId(''+i+j);
	if(boardList[i][j]===''){
		return true;
	}else if(getColorFromId(pieceSelected)!=color2){
		eliminatedPiece.push(boardList[i][j]);
		return true;
	}else{
		return false;
	}
}

function blankBoard(){
	var tab = new Array(8);
	for (var i = 0; i < 8; i++) {
  		tab[i] = new Array(8);
  		for(var j=0; j<8; j++){
			tab[i][j]='';
		}
	}
	return tab
}

function testBoard(){
	tab = new Array(8);
	for (var i = 0; i < 8; i++) {
  		tab[i] = new Array(8);
  		for(var j=0; j<8; j++){
			tab[i][j]='';
		}
	}
	tab[7][4] = 'wk.png';
	tab[7][7] = 'wr.png';
	tab[7][0] = 'wr.png';
	tab[0][0] = 'bb.png';
	return tab
}

function initializeBoard() {
	tab = new Array(8);
	for (var i = 0; i < 8; i++) {
  		tab[i] = new Array(8);
  		for(var j=0; j<8; j++){
			tab[i][j]='';
		}
	}
	for(var i=0; i<8; i++){
		tab[1][i] = 'bp.png';
	}
	tab[0][0] = 'br.png';
	tab[0][7] = 'br.png';
	tab[0][1] = 'bn.png';
	tab[0][6] = 'bn.png';
	tab[0][2] = 'bb.png';
	tab[0][5] = 'bb.png';
	tab[0][3] = 'bq.png';
	tab[0][4] = 'bk.png';
	for(var i=0; i<8; i++){
		tab[6][i] = 'wp.png';
	}
	tab[7][0] = 'wr.png';
	tab[7][7] = 'wr.png';
	tab[7][1] = 'wn.png';
	tab[7][6] = 'wn.png';
	tab[7][2] = 'wb.png';
	tab[7][5] = 'wb.png';
	tab[7][3] = 'wq.png';
	tab[7][4] = 'wk.png';
	whiteKingId = '74';
	blackKingId = '04';
	return tab
}

function displayImage(imageName, size) {
	if(imageName){
		var img = document.createElement('IMG');
		img.src = 'assets/'+ imageName;
		img.className = 'piece';
		img.style.width = size+ "px";
		return img
	}else{
		return document.createElement('div');
	}
}

function bishopMove(piece){
	var x1 = piece.x;
	var y1 = piece.y;
	var bishop = [];
	var i=1;
	while(x1-i>=0||y1-i>=0){
		if(validIndex(x1-i,y1-i) && moveTakeNothing(x1-i,y1-i)){
			bishop.push(num2Sq(x1-i, y1-i));
			i++;
		}else{
			break;
		}
	}
	var i=1;
	while(x1+i<8||y1-i>=0){
		if(validIndex(x1+i,y1-i) && moveTakeNothing(x1+i,y1-i)){
			bishop.push(num2Sq(x1+i, y1-i));
			i++;
		}else{
			break;
		}
	}
	var i=1;
	while(x1-i>=0||y1+i<8){
		if(validIndex(x1-i,y1+i) && moveTakeNothing(x1-i,y1+i)){
			bishop.push(num2Sq(x1-i, y1+i));
			i++;
		}else{
			break;
		}
	}
	var i=1;
	while(x1+i<8||y1+i<8){
		if(validIndex(x1+i,y1+i) && moveTakeNothing(x1+i,y1+i)){
			bishop.push(num2Sq(x1+i, y1+i));
			i++;
		}else{
			break;
		}
	}
	return bishop
}

function pawnMove(piece) {
	var pawn = [];
	var x1 = piece.x;
	var y1 = piece.y;

	var pieceColor = boardList[x1][y1].charAt(0);
	if(pieceColor==='w'){
		if(moveTakeNothing(x1-1,y1)){
			pawn.push(num2Sq(x1-1,y1));
			if(x1 === 6){
				if(moveTakeNothing(x1-2,y1)){
					pawn.push(num2Sq(x1-2,y1));	
				}
			}
		}	
		if(validIndex(x1-1, y1-1)){
			if(getColorFromId(num2Sq(x1-1,y1-1))==='b'){
				pawn.push(num2Sq(x1-1, y1-1))
			}
		}
		if(validIndex(x1-1, y1+1)){
			if(getColorFromId(num2Sq(x1-1,y1+1))==='b'){
				pawn.push(num2Sq(x1-1, y1+1))
			}
		}
	}else{
		if(moveTakeNothing(x1+1,y1)){
			pawn.push(num2Sq(x1+1,y1));
			if(x1 === 1){
				if(moveTakeNothing(x1+2,y1)){
					pawn.push(num2Sq(x1+2,y1));	
				}
			}
		}
		if(validIndex(x1+1, y1-1)){
			if(getColorFromId(num2Sq(x1+1,y1-1))==='w'){
				pawn.push(num2Sq(x1+1, y1-1))
			}
		}
		if(validIndex(x1+1, y1+1)){
			if(getColorFromId(num2Sq(x1+1,y1+1))==='w'){
				pawn.push(num2Sq(x1+1, y1+1))
			}
		}
	}

	return pawn
}

function kingMove(piece) {
	var king = [];
	for(var i = -1; i<2; i++){
		for(var j = -1; j<2; j++){
			// console.log(i,j)
			if(!(j===0 && i===0) && validIndex(piece.x+i, piece.y+j)){
				// console.log('piece: ',boardList[piece.x+i][piece.y+j])
				if(moveTakeNothing(piece.x+i,piece.y+j)){
					king.push(num2Sq(piece.x+i, piece.y+j));
				}
			}
		}
	}
	color = getColorFromId(''+piece.x+piece.y)
	if((color === 'w' && whiteCanLilCastle) || (color === 'b' && blackCanLilCastle)){
		if(boardList[piece.x][piece.y+1]==='' && boardList[piece.x][piece.y+2]===''){
			king.push(num2Sq(piece.x, piece.y+2))
		}
	}
	
	if((color === 'w' && whiteCanBigCastle) || (color === 'b' && blackCanBigCastle)){
		if(boardList[piece.x][piece.y-1]==='' && boardList[piece.x][piece.y-2]==='' && boardList[piece.x][piece.y-3]===''){
			king.push(num2Sq(piece.x, piece.y-3))
		}
	}
	return king
}

function queenMove(piece) {
	return rookMove(piece).concat(bishopMove(piece))
}

function knightMove(piece) {
	var knight = []
	for(var i=0; i<2; i++){
		if(validIndex(piece.x+2, piece.y-1)){
			if(moveTakeNothing(piece.x+2,piece.y-1)){
				knight.push(num2Sq(piece.x+2,piece.y-1))
			}
		}
		if(validIndex(piece.x+2, piece.y+1)){
			if(moveTakeNothing(piece.x+2,piece.y+1)){
				knight.push(num2Sq(piece.x+2,piece.y+1))
			}
		}
	}
	for(var i=0; i<2; i++){
		if(validIndex(piece.x-2, piece.y+1)){
			if(moveTakeNothing(piece.x-2,piece.y+1)){
				knight.push(num2Sq(piece.x-2,piece.y+1))
			}
		}
		if(validIndex(piece.x-2, piece.y-1)){
			if(moveTakeNothing(piece.x-2,piece.y-1)){
				knight.push(num2Sq(piece.x-2,piece.y-1))
			}
		}
	}
	for(var i=0; i<2; i++){
		if(validIndex(piece.x+1, piece.y+2)){
			if(moveTakeNothing(piece.x+1,piece.y+2)){
				knight.push(num2Sq(piece.x+1,piece.y+2))
			}
		}
		if(validIndex(piece.x-1, piece.y+2)){
			if(moveTakeNothing(piece.x-1,piece.y+2)){
				knight.push(num2Sq(piece.x-1,piece.y+2))
			}
		}
	}
	for(var i=0; i<2; i++){
		if(validIndex(piece.x+1, piece.y-2)){
			if(moveTakeNothing(piece.x+1,piece.y-2)){
				knight.push(num2Sq(piece.x+1,piece.y-2))
			}
		}
		if(validIndex(piece.x-1, piece.y-2)){
			if(moveTakeNothing(piece.x-1,piece.y-2)){
				knight.push(num2Sq(piece.x-1,piece.y-2))
			}
		}
	}	
	return knight
}

function rookMove(piece) {
	var x1 = piece.x;
	var y1 = piece.y;
	var rook = [];
	var i=1;
	while(x1-i>=0){
		if(validIndex(x1-i,y1) && moveTakeNothing(x1-i,y1)){
			rook.push(num2Sq(x1-i, y1));
			i++;
		}else{
			break;
		}
	}
	var i=1;
	while(x1+i<8){
		if(validIndex(x1+i,y1) && moveTakeNothing(x1+i,y1)){
			rook.push(num2Sq(x1+i, y1));
			i++;
		}else{
			break;
		}
	}
	var i=1;
	while(y1+i<8){
		if(validIndex(x1,y1+i) && moveTakeNothing(x1,y1+i)){
			rook.push(num2Sq(x1, y1+i));
			i++;
		}else{
			break;
		}
	}
	var i=1;
	while(y1-i>=0){
		if(validIndex(x1,y1-i) && moveTakeNothing(x1,y1-i)){
			rook.push(num2Sq(x1, y1-i));
			i++;
		}else{
			break;
		}
	}
	return rook
}

function kingInCheck(color, virtualBoard){
	tempBoard = boardList.slice()
	// boardList = blankBoard();
	if(color==='w'){
		[x,y] = sq2Num(whiteKingId);
		king = {
			x:x,
			y:y,
			color:getColorFromId(whiteKingId),
			type:'k'
		}
		boardList = blankBoard();
		knight = knightMove(king);
		boardList = tempBoard;
		for(var i = 0; i<knight.length; i++){
			if(getTypeFromId(knight[i])==='n' && getColorFromId(knight[i])==='b'){
				return 'true, '+knight[i];
			}
		}
		boardList = blankBoard();
		rook = rookMove(king);
		boardList=tempBoard;
		for(var i = 0; i<rook.length; i++){
			if((getTypeFromId(rook[i])==='r' || getTypeFromId(rook[i])==='q' || getTypeFromId(rook[i])==='b') && getColorFromId(rook[i])==='b'){
				return 'true, '+getColorFromId(rook[i])+rook[i];
			}
		}
		boardList = blankBoard();
		bishop = bishopMove(king);
		boardList=tempBoard;
		for(var i = 0; i<bishop.length; i++){
			if((getTypeFromId(bishop[i])==='r' || getTypeFromId(bishop[i])==='q' || getTypeFromId(bishop[i])==='b') && getColorFromId(bishop[i])==='b'){
				return 'true, '+getColorFromId(bishop[i])+bishop[i];
			}
		}
	}
	boardList = tempBoard;
	return false;
}

function legal(prevSquare) {
	var x = parseInt(prevSquare.charAt(0));
	var y = parseInt(prevSquare.charAt(1));
	var pieceType = boardList[x][y].charAt(1);
	var pieceColor = boardList[x][y].charAt(0);
	var piece = {
		color: boardList[x][y].charAt(0),
		x:x,
		y:y,
		type:boardList[x][y].charAt(1)
	}

	var move = [];
	switch(pieceType){
		case 'p':
			// console.log('pawn moved')
			move = pawnMove(piece)
			break;
		case 'k':
			// console.log('king moved')
			move = kingMove(piece)
			break;
		case 'n':
			// console.log('knight moved')
			move = knightMove(piece)
			break;
		case 'b':
			// console.log('bishop moved')
			move = bishopMove(piece)
			break;
		case 'r':
			// console.log('rook moved')
			move = rookMove(piece)
			break;
		case 'q':
			// console.log('queen moved')
			move = queenMove(piece)
			break;
	}
	return move
}

function movePiece(prevSquare, nextSquare) {
	var x1 = parseInt(prevSquare.charAt(0));
	var y1 = parseInt(prevSquare.charAt(1));
	var x2 = parseInt(nextSquare.charAt(0));
	var y2 = parseInt(nextSquare.charAt(1));
	if(x1!==x2 || y1!==y2){
		if(getTypeFromId(prevSquare)==='k'){
			if(y2===6){
				castling=true;
				movePiece(num2Sq(x1,7),num2Sq(x1,5))
				castling = false;
			}
			if(y2===1){
				castling=true;
				movePiece(num2Sq(x1,0),num2Sq(x1,2))
				castling = false;
			}
			if(getColorFromId(prevSquare)==='w'){
				whiteCanBigCastle=false;
				whiteCanLilCastle=false;
			}
			if(getColorFromId(prevSquare)==='b'){
				blackCanBigCastle=false;
				blackCanLilCastle=false;
			}
		}
		if(getTypeFromId(prevSquare)==='r'){
			if(getColorFromId(prevSquare)==='w'){
				if(prevSquare==='70'){
					whiteCanBigCastle=false
				}
				if(prevSquare==='77'){
					whiteCanLilCastle=false
				}
			}
			if(getColorFromId(prevSquare)==='b'){
				if(prevSquare==='00'){
					whiteCanBigCastle=false
				}
				if(prevSquare==='07'){
					whiteCanLilCastle=false
				}
			}
		}
		boardList[x2][y2] = boardList[x1][y1];
		boardList[x1][y1] = "";
		pieceSelected = null;
		if(!castling){
			moveCounter++;
			if(whiteToMove){
				algebraicMove = getTypeFromId(prevSquare)==='p' ? moveCounter+'.'+idToAlgebraicNotation(nextSquare):moveCounter+'.'+getTypeFromId(prevSquare).toUpperCase()+idToAlgebraicNotation(nextSquare)
			}else{
				algebraicMove = getTypeFromId(prevSquare)==='p' ? idToAlgebraicNotation(nextSquare):getTypeFromId(prevSquare).toUpperCase()+idToAlgebraicNotation(nextSquare)
			}
			console.log(algebraicMove)
			whiteToMove = !whiteToMove;
		}
		legalMove = [];
	}
}

function squareClick(e) {
	// console.log(e.originalTarget.id,e.target.parentNode.id)

	// -------------- A PIECE IS SELECTED ----------------
	if(pieceSelected != null){
		var color = getColorFromId(pieceSelected);
		nextSquare = e.target.parentNode.id === 'chessBoard' ? e.originalTarget.id : e.target.parentNode.id;
		var nextSquareColor = getColorFromId(nextSquare);
		// console.log('nextSquare:', nextSquare);
		if(((whiteToMove && color==='w') || (!whiteToMove && color==='b')) && isIn(legalMove, nextSquare)) {
			movePiece(pieceSelected, nextSquare);
		}else if(nextSquareColor === color && nextSquare !== pieceSelected){
			pieceSelected = nextSquare;
			legalMove = legal(pieceSelected);
		}


	// --------------- NO PIECE IS SELECTED ---------------
	}else{
		if(e.target.parentNode.id != 'chessBoard'){
			if((whiteToMove && getColorFromId(e.target.parentNode.id)==='w') || (!whiteToMove && getColorFromId(e.target.parentNode.id)==='b')){
				pieceSelected = e.target.parentNode.id;
				legalMove = legal(pieceSelected);
			}
		}

	}
	// console.log('piece selected:', pieceSelected);
	turnToPlay = whiteToMove ? 'White to play':'Black to play'
	// console.log(turnToPlay);
	renderBoard();
}

function squareRightClick(e) {
	e.preventDefault();
	var squareID = e.target.parentNode.id === 'chessBoard' ? e.originalTarget.id : e.target.parentNode.id;
	document.getElementById(squareID).style.background = '#eecafa';
	return false;
}

function renderBoard(){
	var board = document.getElementById('chessBoard');
	board.innerHTML = '';
	document.getElementById('subtitle').innerHTML = turnToPlay;
	for(var i=0; i<8; i++){
		for(var j=0; j<8; j++){
			var square = document.createElement('div')
			// console.log(''+i+j, pieceSelected)
			var ij = ''+i+j;
			if(getTypeFromId(ij)==='k'){
				if(getColorFromId(ij)==='w'){
					whiteKingId=ij;
				}else{
					blackKingId=ij;
				}
			}
			if(isIn(legalMove, ij)){
				square.style.background = legalSquareColor
			}else{
				if(pieceSelected===''+i+j){
					square.style.background = (i+j)%2===0? whiteSquareColorSelection : blackSquareColorSelection;
				}else{
					square.style.background = (i+j)%2===0? whiteSquareColor : blackSquareColor;
				}
			}
			square.innerHTML = ''+i+j;
			square.id = i.toString() + j.toString();
			square.className = "square";
				img = displayImage(boardList[i][j], 70);
				// img.onclick = function() {}
				square.appendChild(img);

			square.onclick = function (e) {squareClick(e)};
			square.oncontextmenu = function(e) {squareRightClick(e)}
			board.appendChild(square);
		}
	}
	console.log(kingInCheck('w', boardList));
	// console.log(kingInCheck('b', boardList));
	
	// console.log('legalMove=',legalMove);
}

function formatHour(clock){
	var hour = clock.hour.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
	var minute = clock.minute.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
	var second = clock.second.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
	if(clock.hour != 0){
		return `${hour}:${minute}:${second}`
	}else{
		return `${minute}:${second}`
	}
}

function initializeClock(h,m,s) {
	wc = new Clock(h,m,s);
	bc = new Clock(h,m,s);
	whiteClock.innerHTML = formatHour(wc);
	blackClock.innerHTML = formatHour(bc);
	clock = setInterval(()=>{renderClock(wc,bc)}, 100);
}

function renderClock(wc,bc){
	if(whiteToMove){
		wc.millisecond-=100;
		if(wc.millisecond<0){
			wc.millisecond=900;
			wc.second-=1;
			if(wc.second<0){
				wc.second=59;
				wc.minute-=1;
				if(wc.minute<0){
					wc.minute=59;
					wc.hour-=1;
					if(wc.hour<0){
						wc.reset();
						console.log('partie terminée')
						clearInterval(clock);
					}
				}
			}
		}
	}else{
		bc.millisecond-=100;
		if(bc.millisecond<0){
			bc.millisecond=900;
			bc.second-=1;
			if(bc.second<0){
				bc.second=59;
				bc.minute-=1;
				if(bc.minute<0){
					bc.minute=59;
					bc.hour-=1;
					if(bc.hour<0){
						bc.reset();
						console.log('partie terminée')
						clearInterval(clock);
					}
				}
			}
		}
	}
	whiteClock.innerHTML = formatHour(wc);
	blackClock.innerHTML = formatHour(bc);
}

var boardSquare = new Array(8);
for (var i = 0; i < 8; i++) {
	boardSquare[i] = new Array(8);
	for(var j = 0; j<8; j++){
		boardSquare[i][j] = ''+i+j;
	}
}

var boardList = initializeBoard();
var pieceSelected = null;
var moveCounter = 0;
var whiteToMove = true;
var turnToPlay = 'First move always for white !'
var legalMove = [];
var whiteKingId = null;
var blackKingId = null;

var whiteCanBigCastle = true;
var blackCanBigCastle = true;
var whiteCanLilCastle = true;
var blackCanLilCastle = true;
var castling = false;

var blackPiece = []
var whitePiece = []
var eliminatedPiece = [];
var chessBoard = document.createElement('div');
chessBoard.id='chessBoard';
var chessClock = document.createElement('div');
chessClock.id = 'chess-clock';
var blackClock = document.createElement('div');
blackClock.id = 'black-clock';
blackClock.innerHTML = 'black clock';
var whiteClock = document.createElement('div');
whiteClock.id = 'white-clock';
whiteClock.innerHTML = 'white clock';
// var history = document.createElement('div');
// history.id = 'history';
// history.innerHTML = 'this is the history';
var clock = null;

class Clock {
	constructor(h,m,s){
		this.hour=h;
		this.minute=m;
		this.second=s;
		this.millisecond=1000
	}
	reset(){
		this.hour=0;
		this.minute=0;
		this.second=0;
		this.millisecond=0
	}
}

function start(){
	document.getElementById('corps').innerHTML = ''
	document.getElementById('corps').appendChild(chessBoard);
	document.getElementById('corps').appendChild(chessClock);
	document.getElementById('chess-clock').appendChild(blackClock);
	document.getElementById('chess-clock').appendChild(whiteClock);
	document.getElementById('subtitle').innerHTML = turnToPlay;
	renderBoard();
	initializeClock(0,1,5);
}

var startButton = document.getElementById('start-button');
startButton.onclick = start;