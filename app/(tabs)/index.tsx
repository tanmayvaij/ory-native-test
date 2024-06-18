import { Button, StyleSheet, TextInput, View } from "react-native";
import { kratosClient } from "@/components/kratosSdk";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

const SignIn = () => {
  const [flow, setFlow] = useState();
  const [formValues, setFormValues] = useState({ });

  const initiateFlow = async () => {
    await kratosClient
      .createNativeLoginFlow()
      .then(({ data }) => {
        console.log(JSON.stringify(data, null, 1));
        setFlow(data);
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 1));
      });
  };

  useFocusEffect(
    useCallback(() => {
      initiateFlow();

      return () => {
        setFlow(undefined);
      };
    }, [kratosClient])
  );

  const handleInputChange = (name: string, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!flow) return;

    console.log(JSON.stringify(flow, null, 1));

    console.log(formValues);
    
    kratosClient
      .updateLoginFlow({
        flow: flow.id,
        updateLoginFlowBody : {...formValues!, csrf_token: "", method: "password"},
      })
      .then(({ data }) => {
        console.log("Login successful", data);
      })
      .catch((err) => {
        console.log("Login error", JSON.stringify(err, null, 1));
      });
  };

  return (
    <View style={{ marginTop: 30 }}>
      {flow?.ui.nodes.map(({ attributes, group, messages, meta, type }, id) => {
        if (attributes?.name === "csrf_token") return;
        if (attributes.type === "submit") {
          return <Button key={id} title="Submit" onPress={handleSubmit} />;
        }
        return (
          <TextInput
            style={styles.input}
            key={id}
            placeholder={meta.label?.text}
            onChangeText={(text) => handleInputChange(attributes.name, text)}
            value={formValues[attributes.name] || ''}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    height: 40,
    marginTop: 10,
    padding: 10,
  },
});

export default SignIn;
