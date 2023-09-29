import { PressableProps, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Button, Text } from "./Themed";
import { ColorTiers } from "../constants/Colors";
import { Link, LinkProps } from "expo-router";

type StyledButtonProps = PressableProps & {
  title: string;
  variant?: "contained" | "outlined" | "text";
  tier?: ColorTiers;
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
  },
  text: {
    fontSize: 25,
    color: "white",
  },
});

export function StyledButton(props: StyledButtonProps) {
  const { title, style, ...otherProps } = props;

  return (
    <Button style={styles.button} {...otherProps}>
      <Text style={styles.text}>{title}</Text>
    </Button>
  );
}

type StyledLinkProps = PressableProps & {
  title: string;
  variant?: "contained" | "outlined" | "text";
  tier?: ColorTiers;
};

export function StyledLinkButton(props: {
  linkProps: LinkProps<{}>;
  buttonProps: StyledButtonProps;
}) {
  return (
    <Link asChild {...props.linkProps}>
      <StyledButton {...props.buttonProps} />
    </Link>
  );
}
