import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  footer: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const GetCV = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      console.log("TOKEN GOT");
      try {
        const response = await axios.get(
          `http://localhost:8080/api/cvBuilder`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("There was an error!", error);
      }
    };

    fetchData();
  }, []);

  const sectionNames = {
    personalDetails: "Personal Details",
    education: "Education",
    hobbies: "Hobbies",
    seminars: "Seminars",
    technicalSkills: "Technical Skills",
    volunteering: "Volunteering",
    work: "Worked at",
  };
  // Seminars Work Volunteering Hobbies Technical skills
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document useOutlines={true}>
      <Page 
          
          size="A4" style={styles.page}>
        {Object.keys(data).map((sectionKey, i) => (
          
            <View wrap={false} key={i} style={styles.section}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                {sectionNames[sectionKey]}
              </Text>
              {/* divider */}
              <View style={{ borderBottom: "1px solid black", margin: 5 }} />
              {data[sectionKey].map((item, j) => (
                <View key={j} style={{ wrap: false }}>
                  {/* if statement */}
                  {Object.entries(item).map(([key, value], k) =>
                    value === "" || value === null ? null : sectionKey ===
                        "hobbies" ||
                      sectionKey === "work" ||
                      sectionKey === "volunteering" ||
                      sectionKey === "technicalSkills" ||
                      sectionKey === "seminars" ? (
                      <Text key={k}>
                        {`${key}: ${value}`}
                        <br />
                      </Text>
                    ) : (
                      <Text key={k}>
                        {`${key}${value}`}
                        <br />
                      </Text>
                    )
                  )}
                </View>
              ))}
            </View>

        ))}
                    <Text style={styles.footer}>
              
              <Text
                render={({ pageNumber, totalPages }) =>
                  `${pageNumber} / ${totalPages}`
                }
                fixed
              />
            </Text>
          </Page>
      </Document>
    </PDFViewer>
  );
};

export default GetCV;
