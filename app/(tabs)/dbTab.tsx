import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../../components/Themed";
import { useDb } from "../../hooks/useDb";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function DbScreen() {
  const { createTask, deleteTask, ownTasks, user } = useDb();
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DB Tab</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>User Email: {user.profile.email}</Text>
      <Pressable
        onPress={() =>
          createTask({ text: Math.random().toString(36).slice(2, 7) })
        }
      >
        {({ pressed }) => (
          <FontAwesome
            name="plus"
            size={25}
            color={Colors[colorScheme ?? "light"].text}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
      {ownTasks.map((task) => (
        <View>
          <Text>{task.text}</Text>
          <Pressable onPress={() => deleteTask(task)}>
            {({ pressed }) => (
              <FontAwesome
                name="remove"
                size={25}
                color={Colors[colorScheme ?? "light"].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
