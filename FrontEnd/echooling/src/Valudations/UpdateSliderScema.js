import * as Yup from "yup";
import { object, string, ref } from "yup";
const UpdateSliderScema = Yup.object({
    Title: Yup.string()
        .min(10, "Title too short")
        .max(20, "Title too long"),
    SeccondTile: Yup.string()
        .min(10, "SecondTitle too short")
        .max(50, "SecondTitle too long"),
    Description: Yup.string()
        .min(10, "Description too short")
        .max(200, "Description too long"),
})
export default UpdateSliderScema;