import { IDrawable } from "../IDrawable";
import { BlankPipeSegment } from "./PipeSegment/BlankPipeSegment";
import { CollidablePipeSegment } from "./PipeSegment/CollidablePipeSegment";
import { PipeSegment } from "./PipeSegment/PipeSegment";

export class Pipe implements IDrawable {
	static readonly PIPE_WIDTH = 50;
	private x: number = 0;
	public getX(): number {
		return this.x;
	}
	public setX(value: number) {
		this.x = value;
	}

	constructor(
		private gapCenter: number = 500,
		private gapHeight: number = 100
	) {}

	update() {}

	private firstPipeSegment: PipeSegment | undefined;
	private secondPipeSegment: PipeSegment | undefined;
	private blankPipeSegment: PipeSegment | undefined;

	listSegments(context: CanvasRenderingContext2D): PipeSegment[] {
		if (
			!this.firstPipeSegment ||
			!this.secondPipeSegment ||
			!this.blankPipeSegment
		) {
			const firstSegmentHeight = this.gapCenter - this.gapHeight / 2;
			const secondSegmentStart = firstSegmentHeight + this.gapHeight;
			const secondSegmentHeight = context.canvas.height - secondSegmentStart;

			this.firstPipeSegment = new CollidablePipeSegment(
				this.getX(),
				0,
				Pipe.PIPE_WIDTH,
				firstSegmentHeight
			);
			this.secondPipeSegment = new CollidablePipeSegment(
				this.getX(),
				secondSegmentStart,
				Pipe.PIPE_WIDTH,
				secondSegmentHeight
			);

			this.blankPipeSegment = new BlankPipeSegment(
				this.getX(),
				firstSegmentHeight,
				Pipe.PIPE_WIDTH,
				this.gapHeight
			);
		} else {
			this.firstPipeSegment.setX(this.getX());
			this.secondPipeSegment.setX(this.getX());
			this.blankPipeSegment.setX(this.getX());
		}

		return [
			this.firstPipeSegment,
			this.blankPipeSegment,
			this.secondPipeSegment
		];
	}

	draw(context: CanvasRenderingContext2D) {
		for (const segment of this.listSegments(context)) {
			segment.draw(context);
		}
	}
}
