import { IDrawable } from "../IDrawable";
import { IHaveAHitBox } from "../IHaveAHitBox";

export class Floopy extends IHaveAHitBox implements IDrawable {
	centerX: number;
	centerY: number;

	bodyRadius: number;
	eyeRadius: number;

	gravity: number;
	velocity: number;
	lastUpdated: number;
	constructor() {
		super();
		this.centerX = 200;
		this.centerY = 300;
		this.bodyRadius = 25;
		this.eyeRadius = 5;

		this.gravity = 1.1;
		this.lastUpdated = performance.now();
		this.velocity = 0;
	}

	getXLeft = () => this.centerX - this.bodyRadius / 2;
	getWidth = () => this.bodyRadius;
	getYTop = () => this.centerY - this.bodyRadius / 2;
	getHeight = () => this.bodyRadius;

	updatePosition() {
		const now = performance.now();
		const timeElapsed = now - this.lastUpdated;
		this.velocity = this.velocity + (this.gravity / 1000) * timeElapsed;

		const displacement = this.velocity * timeElapsed;

		this.centerY += displacement;
		this.lastUpdated = now;
	}

	private flapping = false;

	flap() {
		this.velocity = -0.5;

		this.flapping = true;
		setTimeout(() => {
			this.flapping = false;
		}, 200);
	}

	update() {
		this.updatePosition();
	}

	draw(context: CanvasRenderingContext2D) {
		context.beginPath();
		context.arc(this.centerX, this.centerY, this.bodyRadius, 0, Math.PI * 2);
		context.fillStyle = "yellow";
		context.fill();
		context.closePath();

		const eyeOffsetY = this.bodyRadius / 3;
		const eyeOffsetX = this.bodyRadius / 2;

		context.beginPath();
		context.arc(
			this.centerX + this.bodyRadius - eyeOffsetX,
			this.centerY - eyeOffsetY,
			this.eyeRadius,
			0,
			Math.PI * 2
		);
		context.fillStyle = "black";
		context.fill();
		context.closePath();

		const beakHeight = this.bodyRadius / 2;
		const beakLength = this.bodyRadius / 2;
		const beakOffsetX = this.bodyRadius - 2;

		context.beginPath();
		context.moveTo(this.centerX + beakOffsetX, this.centerY - beakHeight / 2);
		context.lineTo(this.centerX + beakOffsetX + beakLength, this.centerY);
		context.lineTo(this.centerX + beakOffsetX, this.centerY + beakHeight / 2);
		context.fillStyle = "orange";
		context.fill();
		context.closePath();

		const wingHeight = this.bodyRadius / 2;
		const wingWidth = this.bodyRadius / 2;
		const wingOffsetY = this.bodyRadius / 4;

		context.beginPath();
		context.moveTo(this.centerX - wingWidth / 2, this.centerY + wingOffsetY);

		if (this.flapping) {
			context.lineTo(this.centerX, this.centerY - (wingHeight + wingOffsetY));
		} else {
			context.lineTo(this.centerX, this.centerY + (wingHeight + wingOffsetY));
		}

		context.lineTo(this.centerX + wingWidth / 2, this.centerY + wingOffsetY);
		context.stroke();
	}
}
