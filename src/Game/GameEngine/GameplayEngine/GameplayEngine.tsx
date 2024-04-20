import { Floopy } from "../../GameElements/FlappyHimself/Floopy";
import { Pipe } from "../../GameElements/Pipe/Pipe";
import { BlankPipeSegment } from "../../GameElements/Pipe/PipeSegment/BlankPipeSegment";
import { PipeSegment } from "../../GameElements/Pipe/PipeSegment/PipeSegment";
import { PipeGenerationEngine } from "../PipeEngines/PipeGenerationEngine";
import { PipeMotionEngine } from "../PipeEngines/PipeMotionEngine";
import { GameState } from "./GameState";

export class GameplayEngine {
	private static readonly LEVEL_BREAK_DURATION = 3000;
	private _gameState: GameState = GameState.Running;
	public get gameState(): GameState {
		return this._gameState;
	}
	private set gameState(value: GameState) {
		this._gameState = value;
	}

	public points: number;
	public level: number;
	private pointMultiplier: number = 1000;

	private pipeMotionEngine: PipeMotionEngine;
	private pipeGenerator: PipeGenerationEngine;
	constructor(private floopy: Floopy, gameWidth: number, gameHeight: number) {
		this.level = 1;
		this.points = 0;

		this.pipeMotionEngine = new PipeMotionEngine(gameWidth, 0.4);
		this.pipeGenerator = new PipeGenerationEngine(1500, gameHeight, 400);
		this.pipeGenerator.onPipeGenerated(this.handlePipeGenerated.bind(this));

		this.pipeGenerator.start();
	}

	private getNumberOfPipesAtLevel() {
		return 5 + 2 * this.level;
	}
	private handlePipeGenerated(pipe: Pipe) {
		if (this.gameState === GameState.GameOver) {
			return;
		}

		this.pipeMotionEngine.addPipe(pipe);

		if (this.pipeGenerator.pipesGenerated >= this.getNumberOfPipesAtLevel()) {
			this.pipeGenerator.stop();

			this.pipeGenerator.setFrequency(this.pipeGenerator.getFrequency() - 40);
			this.pipeGenerator.gapHeight -= 50;
			this.pipeGenerator.pipesGenerated = 0;

			setTimeout(() => {
				this.pipeGenerator.start();
			}, GameplayEngine.LEVEL_BREAK_DURATION);
		}
	}

	public listDrawables() {
		return [this.floopy, ...this.pipeMotionEngine.listPipes()];
	}

	/**The function that basically runs the game: performs checks to determine the game staet. */
	public update(context: CanvasRenderingContext2D) {
		const floopyLeft = this.floopy.getXLeft();
		const floopyRight = floopyLeft + this.floopy.getWidth();
		const floopyTop = this.floopy.getYTop();
		const floopyBottom = floopyTop + this.floopy.getHeight();

		if (
			floopyLeft < 0 ||
			floopyRight > context.canvas.width ||
			floopyTop < 0 ||
			floopyBottom > context.canvas.height
		) {
			this.gameState = GameState.GameOver;
			return;
		}

		for (const pipe of this.pipeMotionEngine.listPipes()) {
			const pipeSegments = pipe.listSegments(context);
			for (const segment of pipeSegments) {
				if (this.handleFloopyPipeInteraction(this.floopy, segment)) {
					return;
				}
			}
		}
	}

	private pipesHit: number = 0;
	private handleFloopyPipeInteraction(floopy: Floopy, segment: PipeSegment) {
		try {
			if (floopy.isCollidingWith(segment) && !segment.collided) {
				this.pipesHit++;
				segment.collided = true;
				if (segment instanceof BlankPipeSegment) {
					this.points += Math.abs(
						Math.floor(
							floopy.velocity * this.pointMultiplier * 2 ** (this.level - 1)
						)
					);
				} else {
					this.gameState = GameState.GameOver;
					return true;
				}
			}
		} finally {
			if (this.pipesHit >= this.getNumberOfPipesAtLevel()) {
				this.level++;
				this.pipesHit = 0;
			}
		}

		return false;
	}
}
