"use client";

import React, { ReactNode } from "react";
import styles from "./MobileSlideMenu.module.scss";

interface MobileSlideMenuProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	title?: string;
	overlayColor?: string;
	backgroundColor?: string;
	zIndex?: number;
}

const MobileSlideMenu: React.FC<MobileSlideMenuProps> = ({
	isOpen,
	onClose,
	children,
	title,
	overlayColor = "rgba(0, 0, 0, 0.5)",
	backgroundColor = "var(--color-base-9)",
	zIndex = 1001,
}) => {
	if (!isOpen) return null;

	return (
		<div
			className={styles.overlay}
			onClick={onClose}
			style={{
				backgroundColor: overlayColor,
				zIndex: zIndex,
			}}
		>
			<div
				className={`${styles.slideContainer} ${isOpen ? styles.open : ""}`}
				onClick={(e) => e.stopPropagation()}
				style={{ backgroundColor: backgroundColor }}
			>
				{title && (
					<div className={styles.header}>
						<h2 className={styles.title}>{title}</h2>
						<button
							className={styles.closeButton}
							onClick={onClose}
							aria-label="메뉴 닫기"
						>
							×
						</button>
					</div>
				)}
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
};

export default MobileSlideMenu;
