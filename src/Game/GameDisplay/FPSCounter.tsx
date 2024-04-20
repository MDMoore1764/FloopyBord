export class FPSCounter {
	frameTimeStart: number = 0;
	fps: number = 0;
	framesThisSecond: number = 0;

	update() {
		const now = performance.now();
		if (now > this.frameTimeStart + 1000) {
			this.frameTimeStart = now;
			this.framesThisSecond = 1;
		}

		this.framesThisSecond++;
	}
	getFPS() {
		return this.fps;
	}
	getLastFrameTime() {
		// return this.lastFrameTime;
	}
}
