import * as Yup from "yup";
import { object, string, ref } from "yup";
const CreateEventScema = Yup.object({
    Cost: Yup.string()
    .min(0, "Cost too Short!")
    .max(266, "Cost too Long!")
    .required("Cost is requred!"),
    TotalSlot: Yup.string()
    .min(0, "TotalSlot too short")
    .max(255, "TotalSlot too long")
    .required("TotalSlot is requred!"),
    EventTitle: Yup.string()
    .min(3, "EventTitle too short")
    .max(100, "EventTitle too long")
    .required("EventTitle is requred!"),
    AboutEvent: Yup.string()
    .min(3, "AboutEvent too short")
    .max(255, "AboutEvent too long"),
    EventFinishDate: Yup.string()
    .required("EventFinishDate is requred!"),
    EventStartDate: Yup.string()
    .required("EventFinishDate is requred!"),
});

export default CreateEventScema;
