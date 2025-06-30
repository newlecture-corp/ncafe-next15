"use client";

import styles from "../page.module.scss";

const { like } = styles;

const LikeButton = () => {
	return (
		<div className={like}>
			<label className="n-icon n-icon:favorite">
				좋아요
				<input className="d:none" type="checkbox" defaultValue={1} />
			</label>
			<span>12</span>
		</div>
	);
};

export default LikeButton;
