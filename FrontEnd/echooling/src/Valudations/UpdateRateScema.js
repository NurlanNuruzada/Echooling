import * as Yup from "yup";

const UpdateRate = Yup.object({
    comment: Yup.string()
        .min(0, "Comment is too short")
        .max(255, "Comment is too long")
        .required("Comment can't be unset!"),
    rate: Yup.number() // Use number() instead of string()
        .required("Rate can't be unset!")
          .min(0, "Comment is too short")
});

export default UpdateRate;
