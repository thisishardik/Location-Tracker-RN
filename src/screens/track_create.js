import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import { Text } from "react-native-elements";
import Map from "../components/map";
import {
	requestPermissionsAsync,
	watchPositionAsync,
	Accuracy,
} from "expo-location";
import "../helper_functions/_mockLocation";
import { Context as LocationContext } from "../context/location_context";
import useLocation from "../hooks/use_location";
import TrackForm from "../components/track_form";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const TrackCreateScreen = ({ isFocused }) => {
	const {
		state: { recording },
		addLocation,
	} = useContext(LocationContext);
	const callback = useCallback(
		(location) => {
			addLocation(location, recording);
		},
		[recording]
	);
	const [err] = useLocation(isFocused || recording, callback);

	return (
		<ScrollView>
			<SafeAreaView forceInset={{ top: "always" }}>
				<Text style={styles.text} h2Style={{ fontSize: 28.0 }} h2>
					Create a Track
				</Text>
				<Map />
				{err ? (
					<Text style={{ color: "red", fontSize: 20.0 }}>
						Please enable Location Services
					</Text>
				) : null}
				<View style={{ paddingTop: 20.0 }}>
					<TrackForm />
				</View>
			</SafeAreaView>
		</ScrollView>
	);
};
TrackCreateScreen.navigationOptions = {
	title: "Add Track",
	tabBarIcon: <FontAwesome name="plus" size={20} />,
};

const styles = StyleSheet.create({
	text: {
		textAlign: "center",
		fontSize: 25.0,
		paddingBottom: 20.0,
	},
});

export default withNavigationFocus(TrackCreateScreen);
