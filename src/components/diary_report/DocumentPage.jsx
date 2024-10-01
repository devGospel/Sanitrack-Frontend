// components/DocumentPage.js

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";

// Register a font (optional)
// Font.register({
//   family: 'Roboto',
//   src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKOzY.woff2',
// });

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header_text: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Helvetica-Bold",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
    textAlign: "center",
  },
  item: {
    margin: 10,
    padding: 10,
    borderBottom: "1px solid #eaeaea",
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: "Helvetica-Bold",
  },
  description: {
    fontSize: 12,
    textAlign: "justify",
    paddingTop: 5,
  },
  noteText: {
    fontSize: 12,
    textAlign: "center",
  },
  note_container: {
    margin: 10,
    padding: 10,
    backgroundColor: "gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

// Create Document Component
const DocumentPage = ({ data, single }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header_text}>Diary Report </Text>
      {data?.length > 0 ? (
        data.map((item) => (
          <View key={item._id} style={styles.item}>
            <View style={styles.header}>
              <Text style={styles.title}>Title: {item.title}</Text>
              <Text style={styles.description}>
                Date Created: {format(item?.createdAt, "yyyy-MM-dd")}
              </Text>
            </View>
            <Text style={styles.description}>
              Uploaded By: {item?.recordedBy?.username}
            </Text>

            <View style={styles.note_container}>
              <Text style={styles.noteText}>Note: </Text>
              <Text style={styles.description}>{item?.note}</Text>
            </View>
          </View>
        ))
      ) : (
        <View  style={styles.item}>
          <View style={styles.header}>
            <Text style={styles.title}>Title: {single.title}</Text>
            <Text style={styles.description}>
              Date Created: {format(single?.createdAt, "yyyy-MM-dd")}
            </Text>
          </View>
          <Text style={styles.description}>
            Uploaded By: {single?.recordedBy?.username}
          </Text>

          <View style={styles.note_container}>
            <Text style={styles.noteText}>Note: </Text>
            <Text style={styles.description}>{single?.note}</Text>
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default DocumentPage;
