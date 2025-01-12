import Writer from "./js/writer.js";
import * as BoardModule from "./js/board.js";
import "./js/common.js";

var context = {};
context.currentTurn = "white";
var board = null;

var config = {
	draggable: true,
	dropOffBoard: "snapback",
	position: "start"
}

function updateTurnIndicator(currentTurn) {
    const turnElement = document.getElementById("currentTurn");
    if (currentTurn === "white") {
        turnElement.innerHTML = "&nbsp;WHITE&nbsp;";
        turnElement.style.color = "black";
        turnElement.style.backgroundColor = "white";
        turnElement.style.fontStyle = "italic";
    } else {
        turnElement.innerHTML = "&nbsp;BLACK&nbsp;";
        turnElement.style.color = "white";
        turnElement.style.backgroundColor = "black";
        turnElement.style.fontStyle = "italic";
    }

}

const memory = new WebAssembly.Memory({ initial: 1 });
WebAssembly.instantiateStreaming(fetch("module.wasm"), {
    env: {
        memory: memory,
        __stack_pointer: new WebAssembly.Global({ value: "i32", mutable: true }, 0),
        print: (textPtr) => {
            console.log(Common.cstrFromPtr(context.wasm, textPtr));
        },
        error: (textPtr) => {
            console.error(Common.cstrFromPtr(context.wasm, textPtr));
        },
    }
}).then((wasm) => {
    console.log("[INFO]: WASM module loaded");
    console.log(wasm);
    context.wasm = wasm;
    context.writer = new Writer(context.wasm.instance.exports.memory);
    context.board = new BoardModule.Board(context.writer);
    setupBoard();
    entryPoint();
});

function setupBoard() {
    board = ChessBoard("board", {
        draggable: true,
        onDragStart: (source, piece, position, orientation) => {
            if (piece === "wP") {
                const result = context.wasm.instance.exports.gen_wp_move(context.board, BoardModule.squareToBigUint64(source));
                const unsignedResult = BigInt.asUintN(64, result);
                console.log(unsignedResult.toString());
            }
            return ((!(context.currentTurn === "white" && piece.startsWith("b"))) &&
                    (!(context.currentTurn === "black" && piece.startsWith("w"))));
        },
        onDrop: (source, target, piece) => {
            if (source === target) return "snapback";
            context.currentTurn = (context.currentTurn === "white")? "black": "white";
            updateTurnIndicator(context.currentTurn);
        },
        onChange: (oldPos, newPos) => {
            context.board.setFen(board.fen());
        },
        position: "start"
    });
    updateTurnIndicator(context.currentTurn);
    context.board.setFen(board.fen());
}

function entryPoint() {
    context.wasm.instance.exports.test();
}
