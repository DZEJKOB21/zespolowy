import DegreesOfEducation from "../enum/DegreesOfEducation";

const degreesSelect: { value: DegreesOfEducation, label: string, id: number }[] = [
    {
        value: DegreesOfEducation.EARLY_CHILDHOOD_EDUCATED,
        label: "EDUKACJA WCZESNOSZKOLNA",
        id: 1
    },
    {
        value: DegreesOfEducation.PRIMARY_EDUCATED,
        label: "WYKSZTAŁCENIE PODSTAWOWE",
        id: 2
    },
    {
        value: DegreesOfEducation.LOWER_SECONDARY_EDUCATED,
        label: "WYKSZTAŁCENIE GIMNAZJALNE",
        id: 3
    },
    {
        value: DegreesOfEducation.UPPER_SECONDARY_EEDUCATED,
        label: "WYKSZTAŁCENIE PONADGIMNAZJALNE",
        id: 4
    },
    {
        value: DegreesOfEducation.POST_SECONDARY_NON_TERTIARY_EDUCATED,
        label: "WYKSZTAŁCENIE POLICEALNE",
        id: 5
    },
    {
        value: DegreesOfEducation.ASSOCIATE_DEGREE,
        label: "WYKSZTAŁCENIE WYŻSZE",
        id: 6
    },
    {
        value: DegreesOfEducation.BACHELOR_DEGREE,
        label: "WYKSZTAŁCENIE LICENCJACKIE",
        id: 7
    },
    {
        value: DegreesOfEducation.GRADUATE_DEGREE,
        label: "WYKSZTAŁCENIE INŻYNIERSKIE",
        id: 8
    },
    {
        value: DegreesOfEducation.DOCTORATE,
        label: "WYKSZTAŁCENIE DOKTORANKCIE",
        id: 9
    },
    {
        value: DegreesOfEducation.PROFFESIONAL_DEGREE,
        label: "WYKSZTAŁCENIE PROFESORSKIE",
        id: 10
    },
]

export default degreesSelect;