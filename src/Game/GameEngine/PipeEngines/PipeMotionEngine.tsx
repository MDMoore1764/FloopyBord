import { Pipe } from "../../GameElements/Pipe/Pipe";

export class PipeMotionEngine {
	private pipeTimeMap: Map<Pipe, number> = new Map<Pipe, number>();

	/**Rate is in pixels per millisecond. */
	constructor(private width: number = 1000, private rate: number = 1) {}

	addPipe(pipe: Pipe) {
		pipe.setX(this.width);
		this.pipeTimeMap.set(pipe, performance.now());
	}

	listPipes() {
		this.updatePipes();
		return this.pipeTimeMap.keys();
	}

	private updatePipes() {
		const now = performance.now();
		const pipesToRemove: Pipe[] = [];
		for (const [pipe, createdMS] of this.pipeTimeMap) {
			const pipeX = pipe.getX();

			if (pipeX + Pipe.PIPE_WIDTH / 2 === 0) {
				pipesToRemove.push(pipe);
				continue;
			}

			pipe.setX(pipe.getX() - this.rate * (now - createdMS));
			this.pipeTimeMap.set(pipe, now);
		}

		for (const pipe of pipesToRemove) {
			this.pipeTimeMap.delete(pipe);
		}
	}
}
