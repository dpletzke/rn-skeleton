import React, { useCallback, useEffect, useState } from "react";
import Realm from "realm";
import { useApp } from "@realm/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Alert, TextInput, Button } from "react-native";

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    padding: 10,
    color: "gray",
    textAlign: "center",
  },
  mainButton: {
    width: 350,
    backgroundColor: "#00bfff",
  },
  secondaryButton: {
    color: "#00bfff",
  },
});

export function Login(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // state values for toggable visibility of features in the UI
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isInSignUpMode, setIsInSignUpMode] = useState(true);

  const app = useApp();

  // signIn() uses the emailPassword authentication provider to log in
  const signIn = useCallback(async () => {
    const creds = Realm.Credentials.emailPassword(email, password);
    await app.logIn(creds);
  }, [app, email, password]);

  // onPressSignIn() uses the emailPassword authentication provider to log in
  const onPressSignIn = useCallback(async () => {
    try {
      await signIn();
    } catch (error: any) {
      Alert.alert(`Failed to sign in: ${error?.message}`);
    }
  }, [signIn]);

  // onPressSignUp() registers the user and then calls signIn to log the user in
  const onPressSignUp = useCallback(async () => {
    try {
      await app.emailPasswordAuth.registerUser({ email, password });
      await signIn();
    } catch (error: any) {
      Alert.alert(`Failed to sign up: ${error?.message}`);
    }
  }, [signIn, app, email, password]);

  return (
    <SafeAreaProvider>
      <View style={styles.viewWrapper}>
        <Text style={styles.title}>My Sync App</Text>
        <Text style={styles.subtitle}>
          Please log in or register with a Device Sync user account. This is
          separate from your Atlas Cloud login.
        </Text>
        <TextInput
          placeholder="email"
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          style={{ marginBottom: 10, backgroundColor: "white" }}
          // autoCompleteType={undefined}
        />
        <TextInput
          placeholder="password"
          onChangeText={setPassword}
          secureTextEntry={passwordHidden}
          style={{ marginBottom: 10, backgroundColor: "white" }}
          // autoCompleteType={undefined}
        />
        {isInSignUpMode ? (
          <>
            <Button title="Create Account" onPress={onPressSignUp} />
            <Button
              title="Already have an account? Log In"
              onPress={() => setIsInSignUpMode(!isInSignUpMode)}
            />
          </>
        ) : (
          <>
            <Button title="Log In" onPress={onPressSignIn} />
            <Button
              title="Don't have an account? Create Account"
              onPress={() => setIsInSignUpMode(!isInSignUpMode)}
            />
          </>
        )}
      </View>
    </SafeAreaProvider>
  );
}
