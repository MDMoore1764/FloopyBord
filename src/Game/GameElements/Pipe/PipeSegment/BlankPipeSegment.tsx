import { PipeSegment } from "./PipeSegment";

export class BlankPipeSegment extends PipeSegment {
	draw = (context: CanvasRenderingContext2D) => {
		context.fillStyle = "white";
		context.fillRect(
			this.getXLeft(),
			this.getYTop(),
			this.getWidth(),
			this.getHeight()
		);
	};
}
