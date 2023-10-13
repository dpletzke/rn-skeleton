/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Card, CardProps } from "@rneui/base";
import { StatusBar as DefaultStatusBar } from "expo-status-bar";
import React, { Children } from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  useColorScheme,
} from "react-native";

import { ColorTiers } from "../constants/Colors";
import { useThemeColor } from "../hooks/useThemeColor";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ButtonProps = ThemeProps &
  PressableProps & {
    children: React.ReactNode;
    variant?: "contained" | "outlined" | "text";
    tier?: ColorTiers;
  };

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor("text", { light: lightColor, dark: darkColor });

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor("background", {
    light: lightColor,
    dark: darkColor,
  });

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function StatusBar() {
  const theme = useColorScheme() === "dark" ? "light" : "dark";

  return <DefaultStatusBar style={Platform.OS === "ios" ? theme : "auto"} />;
}

export function Button(props: ButtonProps) {
  const { children, style, lightColor, darkColor, tier, ...otherProps } = props;
  const backgroundColor = useThemeColor(tier || "primary", {
    light: lightColor,
    dark: darkColor,
  });

  return (
    <Pressable
      style={(state) => {
        return [
          {
            backgroundColor: state.pressed
              ? "rgb(210, 230, 255)"
              : backgroundColor,
          },
          style instanceof Function ? style(state) : style,
        ];
      }}
      {...otherProps}
    >
      {children}
    </Pressable>
  );
}

export function ThemedCard(
  props: {
    containerStyle?: StyleProp<ViewStyle>;
    wrapperStyle?: StyleProp<ViewStyle>;
  } & ThemeProps & {
      children: React.ReactNode;
    },
) {
  const { containerStyle, wrapperStyle, darkColor, lightColor, children } =
    props;
  const backgroundColor = useThemeColor("background", {
    light: lightColor,
    dark: darkColor,
  });

  const cardProps = {
    containerStyle: [
      {
        backgroundColor,
      },
      containerStyle,
    ],
    wrapperStyle,
    backgroundColor,
  };
  return <Card {...cardProps}>{children}</Card>;
}
