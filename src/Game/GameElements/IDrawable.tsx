export interface IDrawable {
	update: (context: CanvasRenderingContext2D) => void;
	draw: (context: CanvasRenderingContext2D) => void;
}
