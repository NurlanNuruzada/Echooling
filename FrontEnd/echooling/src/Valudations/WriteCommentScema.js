import * as Yup from "yup";

const CreateCommnetScema = Yup.object({
    comment: Yup.string()
        .min(0, "Comment is too short")
        .max(255, "Comment is too long"),
    rate: Yup.number() // Use number() instead of string()
        .required("Rate can't be unset!")
        .min(1, "Rate must be at least 1") // Optional: Define a minimum value for rate
        .max(5, "Rate can't be more than 5") // Optional: Define a maximum value for rate
});

export default CreateCommnetScema;
