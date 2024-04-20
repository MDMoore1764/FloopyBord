import { PipeSegment } from "./PipeSegment";

export class CollidablePipeSegment extends PipeSegment {
	draw = (context: CanvasRenderingContext2D) => {
		context.fillStyle = this.collided ? "red" : "green";
		context.fillRect(
			this.getXLeft(),
			this.getYTop(),
			this.getWidth(),
			this.getHeight()
		);
	};
}
