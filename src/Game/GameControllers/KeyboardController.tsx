import { Floopy } from "../GameElements/FlappyHimself/Floopy";

export class KeyboardController {
	private _paused: boolean = false;
	public get paused(): boolean {
		return this._paused;
	}
	public set paused(value: boolean) {
		this._paused = value;
	}
	constructor(private floopy: Floopy) {}

	register() {
		window.addEventListener("keydown", (event) => {
			if (event.key === " ") {
				this.floopy.flap();
			}

			//TODo: The time based calculations don't play nicely with this so, I'll do this later. Maybe.
			// if (event.key === "p") {
			// 	this.paused = !this.paused;
			// }
		});
	}
}
