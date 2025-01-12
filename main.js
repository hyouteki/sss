import Writer from "./js/writer.js";
import Board from "./js/board.js";
import "./js/common.js";

var context = {};
context.currentTurn = "white";

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

var board = ChessBoard("board", {
    draggable: true,
    onDragStart: (source, piece, position, orientation) => {
        return ((!(context.currentTurn === "white" && piece.startsWith("b"))) &&
                (!(context.currentTurn === "black" && piece.startsWith("w"))));
    },
    onDrop: (source, target, piece) => {
        if (source === target) return "snapback";
        context.currentTurn = (context.currentTurn === "white")? "black": "white";
        updateTurnIndicator(context.currentTurn);
    },
    position: "start"
});
updateTurnIndicator(context.currentTurn);

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
    context.board = new Board(context.writer);
    entry_point();
});

function entry_point() {
    context.wasm.instance.exports.test();
}
