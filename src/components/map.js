import React, { useContext } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/location_context";

const Map = () => {
	const {
		state: { currentLocation, locations },
	} = useContext(LocationContext);

	if (!currentLocation) {
		return <ActivityIndicator size="large" style={{ marginTop: 200.0 }} />;
	}

	return (
		<MapView
			showsCompass={true}
			toolbarEnabled={true}
			style={styles.map}
			initialRegion={{
				...currentLocation.coords,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			}}
			// region={{
			// 	...currentLocation.coords,
			// 	latitudeDelta: 0.01,
			// 	longitudeDelta: 0.01,
			// }}
		>
			<Circle
				center={currentLocation.coords}
				radius={25}
				strokeWidth={2.5}
				strokeColor="rgba(158,158,255,1.0)"
				fillColor="rgba(158,158,255,0.3)"
			/>
			<Polyline
				strokeColor="blue"
				strokeWidth={2.5}
				coordinates={locations.map((loc) => loc.coords)}
			/>
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		height: 400.0,
	},
});

export default Map;
