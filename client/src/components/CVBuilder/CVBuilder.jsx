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
    hobbies: "Hobbies & Achievements",
    seminars: "Seminars",
    technicalSkills: "Technical Skills",
    volunteering: "Volunteering & Projects",
    work: "Worked at",
  };
  // Seminars Work Volunteering Hobbies Technical skills
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document useOutlines={true}>
        <Page size="A4" style={styles.page}>
          {Object.keys(data).map((titles, i) => (
            <View wrap={false} category={i} style={styles.section}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  alignSelf: "center",
                    color: "#785802"
                }}
              >
                {titles === "personalDetails" ? null : sectionNames[titles]}
              </Text>

              {titles === "personalDetails" ? null : (
                <View style={{ borderBottom: "1px solid black", margin: 5 }} />
              )}

              {data[titles].map((item, j) => {
                let firstName = "";
                let lastName = "";
                let educationResult = "";
                let gradYear = "";
                let schoolName = "";
                let schoolLocation = "";
                let universityName = "";
                let universityLocation = "";
                let degreeName = "";
                let degreeYear = "";
                let thesisTitle = "";
                let dissertationTitle = "";
                let seminar = "";
                let seminarStart = "";
                let seminarEnd = "";
                let work = "";
                let workStart = "";
                let workEnd = "";
                let workResponsibilities = "";
                let workExperience = "";
                let volunteering = "";
                let volunteeringStart = "";
                let volunteeringEnd = "";
                let hobbies = "";
                let achievements = "";
                let technicalSkills = "";
                const otherDetails = Object.entries(item).map(
                  ([category, userInput], k) => {
                    if (userInput === "" || userInput === null) return null;
                    
                    if (titles === "personalDetails") {
                      if (category === "First name: ") {
                        firstName = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 40,
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              textAlign: "center",
                            }}
                          >{`${userInput} `}</Text>
                        );
                        return null;
                      }
                      if (category === "Last name: ") {
                        lastName = (
                          <Text
                            style={{
                              color: "orange",
                              fontSize: 40,
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              textAlign: "center",
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "Country: ") {
                        return (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`Born in: ${(userInput =
                            userInput.charAt(0).toUpperCase() +
                            userInput.slice(1))}`}</Text>
                        );
                      }
                      if (category === "City: ") {
                        return (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`Live in: ${(userInput =
                            userInput.charAt(0).toUpperCase() +
                            userInput.slice(1))}`}</Text>
                        );
                      }
                      if (category === "Email: ") {
                        return (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`Contact me at: ${userInput}`}</Text>
                        );
                      }
                      if (category === "Phone: ") {
                        return (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`Call me at: ${userInput}`}</Text>
                        );
                      }
                      if (category === "Pronouns: ") {
                        return (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingTop: 5,
                            }}
                          >
                            {`My preferred prounouns are: ${userInput}`}
                          </Text>
                        );
                      }
                      if (category === "Seminar: ") {
                        return null;
                      }
                    }
                    if (titles === "education") {
                      if (category === "Education: ") {
                        educationResult = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        console.log("Education result is: ", educationResult);
                        return null;
                      }
                      if (category === "Graduation year: ") {
                        gradYear = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "School name: ") {
                        schoolName = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "School location: ") {
                        schoolLocation = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "University name: ") {
                        universityName = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "University location: ") {
                        universityLocation = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "Degree name: ") {
                        degreeName = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "Degree year: ") {
                        degreeYear = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "Thesis title: ") {
                        thesisTitle = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "Dissertation title: ") {
                        dissertationTitle = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                    }
                    if (titles === "seminars") {
                      if (category === "Seminars") {
                        seminar = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "Start date") {
                        seminarStart = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "End date") {
                        seminarEnd = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                    }
                    if (titles === "work") {
                      if (category === "Work") {
                        work = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "Start date") {
                        workStart = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "End date") {
                        workEnd = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "Responsibilities") {
                        workResponsibilities = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "Experience") {
                        workExperience = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                      }
                    }
                    if (titles === "volunteering") {
                      if (category === "Volunteering") {
                        volunteering = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "Start date") {
                        volunteeringStart = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                      if (category === "End date") {
                        volunteeringEnd = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                    }
                    if (titles === "hobbies") {
                      if (category === "Hobbies") {
                        hobbies = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      } if (category === "Achievements") {
                        achievements = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                    }
                    if (titles === "technicalSkills") {
                      if (category === "Technical skills") {
                        technicalSkills = (
                          <Text
                            style={{
                              color: "#164006",
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              paddingVertical: 5,
                            }}
                          >{`${userInput}`}</Text>
                        );
                        return null;
                      }
                    }

                    return null;
                  }
                );
                

                return (
                  <View category={j} style={{ wrap: false }}>
                    {titles === "personalDetails" && (
                      <Text style={{ letterSpacing: 1.5 }}>
                        {firstName}
                        {lastName}
                        <br />
                      </Text>
                    )}

                    {titles === "education" &&
                      educationResult.props.children === "High School" && (
                        <Text style={{ letterSpacing: 1.5 }}>
                         <Text style={{fontWeight: "bold", fontSize: 20,}}> • High School:</Text> I have studied at {schoolName} and graduated in the
                          year of our lord {gradYear}, at the location of {schoolLocation}.
                        </Text>
                      )}
                    {titles === "education" &&
                      educationResult.props.children ===
                        "Bachelor's Degree" && (
                        <Text style={{ letterSpacing: 1.5, marginTop: 20 }}>
                         <Text style={{fontWeight: "bold", fontSize: 20, marginTop: 20}}> • Bachelor's Degree:</Text> I have studied at {universityName}, at the location of {universityLocation}. I have obtained a degree in {degreeName}, in the year of our lord {degreeYear}.
                          <br />
                        </Text>
                      )}
                    {titles === "education" &&
                      educationResult.props.children === "Master's Degree" && (
                        <Text style={{ letterSpacing: 1.5, marginTop: 20 }}>
                          <Text style={{fontWeight: "bold", fontSize: 20, marginTop: 20}}>• Master's Degree: </Text> I have studied at {universityName}, at the location of {universityLocation}. I have obtained a {degreeName} in the year of our lord {degreeYear}. My thesis was called "{thesisTitle}".<br />
                        </Text>
                      )}
                    {titles === "education" &&
                      educationResult.props.children === "PhD" && (
                        <Text style={{ letterSpacing: 1.5, marginTop: 20 }}>
                          <Text style={{fontWeight: "bold", fontSize: 20, marginTop: 20}}>• PhD: </Text> I have studied at {universityName}, at the location of {universityLocation}. I have obtained a {degreeName} in the year of our lord {degreeYear}. My dissertation was called "{dissertationTitle}".<br />
                        </Text>
                      )}

                    {titles === "seminars" && (
                      <View style={{ marginTop: 20, letterSpacing: 1.5 }}>
                        {seminar && <Text>• I have attended {seminar} from {seminarStart} to {seminarEnd}.</Text>}
                      </View>
                    )}

                    {titles === "work" && (
                      <View style={{ marginTop: 20, letterSpacing: 1.5 }}>
                        {work && <Text style={{marginTop: 10}}> • I have worked at {work} from {workStart} to {workEnd}.</Text>}
                        {workExperience && <Text style={{marginTop: 10}}> • My experience was: {workExperience}</Text>}
                        {workResponsibilities && <Text style={{marginTop: 10}}> • My responsibilities were: {workResponsibilities}</Text>}
                      </View>
                    )}

                    {titles === "volunteering" && (
                      <View style={{ marginTop: 20, letterSpacing: 1.5 }}>
                        {volunteering && <Text>• I have volunteered at {volunteering} from {volunteeringStart} to {volunteeringEnd}.</Text>}
                      </View>
                    )}

                    {titles === "hobbies" && (
                      <View style={{ marginTop: 10, letterSpacing: 1.5 }}>
                        {console.log("hobbies are",hobbies)}
                        {hobbies && <Text>• {hobbies}.</Text>}
                      </View>
                    )}
                    
                    {titles === "hobbies" && (
                        <View style={{ marginTop: 10, letterSpacing: 1.5 }}>
                            {achievements && <Text>• {achievements}.</Text>}
                        </View>
                        )
                    }

                    {titles === "technicalSkills" && (
                      <View style={{ marginTop: 20, letterSpacing: 1.5 }}>
                        {technicalSkills && <Text>• {technicalSkills}.</Text>}
                      </View>
                    )}

                    {otherDetails}
                  </View>
                );
              })}
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
