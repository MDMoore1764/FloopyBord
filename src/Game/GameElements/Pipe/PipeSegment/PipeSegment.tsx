import { IDrawable } from "../../IDrawable";
import { IHaveAHitBox } from "../../IHaveAHitBox";

export abstract class PipeSegment extends IHaveAHitBox implements IDrawable {
	public getX(): number {
		return this.x;
	}
	public setX(value: number) {
		this.x = value;
	}
	constructor(
		private x: number,
		private y: number,
		private width: number,
		private height: number
	) {
		super();
	}

	abstract draw: (context: CanvasRenderingContext2D) => void;
	update() {}

	public collided: boolean = false;

	getXLeft = () => this.x;
	getWidth = () => this.width;
	getYTop = () => this.y;
	getHeight = () => this.height;
}
