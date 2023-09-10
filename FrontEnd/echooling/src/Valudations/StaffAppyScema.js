import * as Yup from "yup";
import { object, string, ref } from "yup";
const StaffApplyScema = Yup.object({
    hobbies: Yup.string()
    .min(10, "hobbies too Short!")
    .max(266, "hobbies too Long!")
    .required("hobbies is requred!"),
    faculty: Yup.string()
    .min(3, "faculty name too short")
    .max(55, "faculty name too long")
    .required("faculty field is requred!"),
    Facebook: Yup.string()
    .min(3, "Facebook too short")
    .max(255, "Facebook too long"),
    twitter: Yup.string()
    .min(3, "twitter too short")
    .max(255, "twitter too long"),
    linkedin: Yup.string()
    .min(3, "linkedin too short")
    .max(255, "linkedin too long"),
    instagram: Yup.string()
    .min(3, "instagram too short")
    .max(255, "instagram too long"),
    profession: Yup.string()
    .min(3, "profession too short")
    .max(255, "profession too long"),
    AboutMe: Yup.string()
    .min(2, "AboutMe too short")
    .max(500, "AboutMe too long")
    .required("AboutMe field is requred!"),
});

export default StaffApplyScema;
