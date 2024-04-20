import { Pipe } from "../../GameElements/Pipe/Pipe";

type TPipeFunction = (pipe: Pipe) => unknown;
export class PipeGenerationEngine {
	public get gapHeight(): number {
		return this._gapHeight;
	}
	public set gapHeight(value: number) {
		this._gapHeight = value;
	}
	private interval: number | undefined = undefined;
	private listeners: ((pipe: Pipe) => void)[] = [];

	public pipesGenerated = 0;

	constructor(
		private frequency: number,
		private gameHeight: number,
		private _gapHeight: number
	) {}

	public getFrequency(): number {
		return this.frequency;
	}
	public setFrequency(value: number) {
		this.frequency = value;
	}

	public onPipeGenerated(listener: TPipeFunction) {
		this.listeners.push(listener);
	}

	public offPipeGenerated(listener: TPipeFunction) {
		this.listeners = this.listeners.filter((l) => l !== listener);
	}

	private generatePipe() {
		this.pipesGenerated++;
		const gapCenter =
			this.gapHeight / 2 +
			Math.floor(Math.random() * (this.gameHeight - this.gapHeight));

		return new Pipe(gapCenter, this.gapHeight);
	}

	start() {
		this.interval = setInterval(() => {
			const pipe = this.generatePipe();
			this.listeners.forEach((l) => l(pipe));
		}, this.frequency);
	}

	stop() {
		if (!this.interval) return;

		clearInterval(this.interval);
	}
}
