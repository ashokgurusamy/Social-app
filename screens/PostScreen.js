import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";
import UserPermissions from "../utilities/UserPermissions";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class PostScreen extends React.Component {
  state = {
    text: "",
    image: null
  };

  componentDidMount() {
    UserPermissions.getCameraPermission;
  }

  handlePost = () => {
    Fire.shared
      .addPost({ text: this.state.text.trim(), localUri: this.state.image })
      .then(ref => {
        this.setState({ text: "", image: null });
        this.props.navigation.goBack();
      })
      .catch(error => {
        alert(error);
      });
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [7, 6]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <DismissKeyboard>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="ios-arrow-back" size={24} color="#000"></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handlePost}>
              <Text style={{ fontWeight: "500" }}>Post</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              maxHeight: 170,
              borderColor: "red",
              borderRadius: 5,
              backgroundColor: "#f7f7f7"
            }}
          >
            <View style={styles.inputContainer}>
              <Image
                source={require("../assets/profile.jpg")}
                style={styles.avatar}
              ></Image>
              <TextInput
                autoFocus={true}
                multiline={true}
                numberOfLines={4}
                style={{ flex: 1 }}
                placeholder="Want to share something?"
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
              ></TextInput>
            </View>

            <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
              <Ionicons name="md-camera" size={32} color="#7a7272"></Ionicons>
            </TouchableOpacity>

            <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
              <Image
                source={{ uri: this.state.image }}
                style={{ width: "100%", height: "100%" }}
              ></Image>
            </View>
          </View>
        </SafeAreaView>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB"
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row"
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32
  }
});
