import { useEffect, useRef, useState } from "react";
import "./GameDisplay.css";
import {
	GameDetailTitle,
	GameDetailWrapper,
	GameDetailWrapperLarge,
	GameWrapper
} from "./GameDisplay.Styled";
import { IDrawable } from "../GameElements/IDrawable";
import { KeyboardController } from "../GameControllers/KeyboardController";
import { GameplayEngine } from "../GameEngine/GameplayEngine/GameplayEngine";
import { GameState } from "../GameEngine/GameplayEngine/GameState";

const REFRESH_TIME_MS = 1000 / 144.0;

type TGameEngineProps = {
	loadElements: () => IDrawable[];
	gameWidth: number;
	gameHeight: number;
	controller: KeyboardController; //TODO: Extract to IGameController
	gameEngine: GameplayEngine;
};

function GameDisplay(props: TGameEngineProps) {
	const [state, setState] = useState(false);

	// const fpsCounterRef = useRef<FPSCounter>(new FPSCounter());
	const canvasRef = useRef<HTMLCanvasElement>(null);

	//Create render updater!
	useEffect(() => {
		setInterval(() => {
			setState((prev) => !prev);
		}, REFRESH_TIME_MS);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!canvasRef.current) return;
		const context = canvasRef.current!.getContext("2d");
		if (!context) return;

		if (props.controller.paused) return;

		requestAnimationFrame(() => {
			context.clearRect(0, 0, props.gameWidth, props.gameHeight);
			for (const drawableElement of props.loadElements()) {
				drawableElement.update(context);
				drawableElement.draw(context);
			}

			props.gameEngine.update(context);

			if (props.gameEngine.gameState === GameState.GameOver) {
				props.controller.paused = true;

				context.font = "bold 96px Arial";
				context.fillStyle = "red";
				context.textAlign = "center";
				context.textBaseline = "middle";

				context.fillText(
					"Game Over",
					props.gameWidth / 2,
					props.gameHeight / 2
				);
				context.closePath();
			}
		});

		// fpsCounterRef.current!.update();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state, props.controller.paused]);

	return (
		<GameWrapper>
			<GameDetailTitle>Floopy Bord</GameDetailTitle>
			<GameDetailWrapperLarge>
				Level: {props.gameEngine.level}
			</GameDetailWrapperLarge>
			<GameDetailWrapper>Points: {props.gameEngine.points}</GameDetailWrapper>
			<canvas
				height={props.gameHeight}
				width={props.gameWidth}
				id="display"
				ref={canvasRef}
			></canvas>
			{/* {fpsCounterRef.current!.getFPS()} */}
		</GameWrapper>
	);
}

export default GameDisplay;
