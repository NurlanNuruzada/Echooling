import * as Yup from "yup";
import { object, string, ref } from "yup";
const CreateCourseScema = Yup.object({
    Price: Yup.string()
    .min(0, "Cost too Short!")
    .max(266, "Cost too Long!")
    .required("Cost is requred!"),
    Title: Yup.string()
    .min(54, "Title too short")
    .max(255, "Title too long")
    .required("Title is requred!"),
    Languge: Yup.string()
    .min(3, "Languge too short")
    .max(100, "Languge too long")
    .required("Languge is requred!"),
    ThisCourseIncludes: Yup.array().of(
        Yup.string()
    .min(1, "   ThisCourseIncludes too short")
    .max(255, "   ThisCourseIncludes is too long")
    .required("   ThisCourseIncludes is required!"),
    ),
    WhatWillLearn: Yup.array().of(  
        Yup.string()
            .min(1, "   WhatWillLearn too short")
            .max(255, "  WhatWillLearn is too long")
            .required("  WhatWillLearn is required!"),
    ),
    AboutCourse: Yup.string()
    .min(20, "AboutEvent too short")
    .max(455, "AboutEvent too long")
    .required("AboutEvent is required!"),
});
export default CreateCourseScema;
