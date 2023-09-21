import * as Yup from "yup";
import { object, string, ref } from "yup";
const CreateCourseScema = Yup.object({
    Price: Yup.string()
    .min(0, "Cost too Short!")
    .max(266, "Cost too Long!"),
    Title: Yup.string()
    .min(10, "Title too short")
    .max(255, "Title too long"),
    Languge: Yup.string()
    .min(3, "Languge too short")
    .max(100, "Languge too long"),
    ThisCourseIncludes: Yup.array().of(
        Yup.string()
    .min(10, "   ThisCourseIncludes too short")
    .max(255, "   ThisCourseIncludes is too long"),
    ),
    WhatWillLearn: Yup.array().of(  
        Yup.string()
            .min(10, "   WhatWillLearn too short")
            .max(255, "  WhatWillLearn is too long"),
    ),
    AboutCourse: Yup.string()
    .min(20, "AboutEvent too short")
    .max(255, "AboutEvent too long"),
});
export default CreateCourseScema;
