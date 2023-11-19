import DegreesOfEducation from "../enum/DegreesOfEducation";

class Candidate {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  degreeOfEducation: DegreesOfEducation;
  experience: string;
  preferences: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    degreeOfEducation: DegreesOfEducation,
    experience: string,
    preferences: string,
    id?: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.degreeOfEducation = degreeOfEducation;
    this.experience = experience;
    this.preferences = preferences;
  }
}

export default Candidate;