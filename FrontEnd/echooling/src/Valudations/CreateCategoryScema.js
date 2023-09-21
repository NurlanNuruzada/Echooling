import * as Yup from "yup";
import { object, string, ref } from "yup";
const CreateCategoryScema = Yup.object({
    category: Yup.string()
        .min(1, "Title too short")
        .max(255, "Title too long")
        .required("Title is requred!"),
})
export default CreateCategoryScema;
