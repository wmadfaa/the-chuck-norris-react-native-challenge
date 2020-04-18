import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated from 'react-native-reanimated';

export interface Profile {
	id: string;
	name: string;
	age: number;
}

export interface SwiperCardProps {
	profile: Profile;
	likeOpacity?: Animated.Node<number> | number;
	nopeOpacity?: Animated.Node<number> | number;
}

const SwiperCard: React.FC<SwiperCardProps> = ({ profile, likeOpacity = 0, nopeOpacity = 0 }) => {
	return (
		<View style={StyleSheet.absoluteFill}>
			<View style={styles.image} />
			<View style={styles.overlay}>
				<View style={styles.header}>
					<Animated.View style={[ styles.like, { opacity: likeOpacity } ]}>
						<Text style={styles.likeLabel}>LIKE</Text>
					</Animated.View>
					<Animated.View style={[ styles.nope, { opacity: nopeOpacity } ]}>
						<Text style={styles.nopeLabel}>NOPE</Text>
					</Animated.View>
				</View>
				<View style={styles.footer}>
					<Text style={styles.name}>{profile && profile.name}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		...StyleSheet.absoluteFillObject,
		borderRadius: 8,

		flex: 1,
		width: undefined,
		height: undefined,
		backgroundColor: 'blue'
	},
	overlay: {
		flex: 1,
		justifyContent: 'space-between',
		padding: 16
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	footer: {
		flexDirection: 'row'
	},
	name: {
		color: 'white',
		fontSize: 32
	},
	like: {
		borderWidth: 4,
		borderRadius: 5,
		padding: 8,
		borderColor: '#6ee3b4'
	},
	likeLabel: {
		fontSize: 32,
		color: '#6ee3b4',
		fontWeight: 'bold'
	},
	nope: {
		borderWidth: 4,
		borderRadius: 5,
		padding: 8,
		borderColor: '#ec5288'
	},
	nopeLabel: {
		fontSize: 32,
		color: '#ec5288',
		fontWeight: 'bold'
	}
});

export default SwiperCard;
