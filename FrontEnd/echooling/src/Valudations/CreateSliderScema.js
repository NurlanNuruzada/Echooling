import * as Yup from "yup";
import { object, string, ref } from "yup";
const CreateSliderScema = Yup.object({
    image: Yup.string()
        .required("image is requred!"),
    Title: Yup.string()
        .min(10, "Title too short")
        .max(20, "Title too long")
        .required("Title is requred!"),
    SeccondTile: Yup.string()
        .min(10, "SecondTitle too short")
        .max(50, "SecondTitle too long")
        .required("SecondTitle is requred!"),
    Description: Yup.string()
        .min(10, "Description too short")
        .max(200, "Description too long")
        .required("Description is requred!"),
})
export default CreateSliderScema;
