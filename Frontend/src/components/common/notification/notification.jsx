
import React from 'react';
import styles from './Notification.module.css';

export default function Notification({ message, color }) {
	return (
		<div
			className={styles.notificationBox}
			style={{ backgroundColor: color || 'green' }}
		>
			{message}
		</div>
	);
}
