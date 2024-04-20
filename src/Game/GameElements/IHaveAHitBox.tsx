export abstract class IHaveAHitBox {
	abstract getXLeft: () => number;
	abstract getWidth: () => number;
	abstract getYTop: () => number;
	abstract getHeight: () => number;

	public isCollidingWith(other: IHaveAHitBox) {
		const thisLeft = this.getXLeft();
		const thisRight = thisLeft + this.getWidth();
		const thisTop = this.getYTop();
		const thisBottom = thisTop + this.getHeight();

		const otherLeft = other.getXLeft();
		const otherRight = otherLeft + other.getWidth();
		const otherTop = other.getYTop();
		const otherBottom = otherTop + other.getHeight();

		return !(
			thisBottom < otherTop ||
			thisTop > otherBottom ||
			thisRight < otherLeft ||
			thisLeft > otherRight
		);
	}

	// public getCollisionPosition(other: IHaveAHitBox) {
	//     if(!this.isCollidingWith(other)) {
	//         return;
	//     }

	// 	const thisLeft = this.getXLeft();
	// 	const thisRight = thisLeft + this.getWidth();
	// 	const thisTop = this.getYTop();
	// 	const thisBottom = thisTop + this.getHeight();

	// 	const otherLeft = other.getXLeft();
	// 	const otherRight = otherLeft + other.getWidth();
	// 	const otherTop = other.getYTop();
	// 	const otherBottom = otherTop + other.getHeight();

	// 	return !(
	// 		thisBottom < otherTop ||
	// 		thisTop > otherBottom ||
	// 		thisRight < otherLeft ||
	// 		thisLeft > otherRight
	// 	);
	// }
}
