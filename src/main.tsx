import ReactDOM from "react-dom/client";
import GameDisplay from "./Game/GameDisplay/GameDisplay.tsx";
import "./index.css";
import { Floopy } from "./Game/GameElements/FlappyHimself/Floopy.tsx";
import { KeyboardController } from "./Game/GameControllers/KeyboardController.tsx";
import { GameplayEngine } from "./Game/GameEngine/GameplayEngine/GameplayEngine.tsx";

const gameWidth = 1400;
const gameHeight = (9 / 16) * gameWidth;

const floopy = new Floopy();
const controller = new KeyboardController(floopy);

const gameEngine = new GameplayEngine(floopy, gameWidth, gameHeight);

controller.register();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<GameDisplay
		gameEngine={gameEngine}
		controller={controller}
		gameWidth={gameWidth}
		gameHeight={gameHeight}
		loadElements={gameEngine.listDrawables.bind(gameEngine)}
	/>
);
