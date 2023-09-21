import * as Yup from 'yup';

const updateEventSchema = Yup.object({
  EventTitle: Yup.string()
    .min(3, 'Event Title is too short, minimum length is 3 characters')
    .max(100, 'Event Title is too long, maximum length is 100 characters'),

  AboutEvent: Yup.string()
    .min(3, 'About Event is too short, minimum length is 3 characters')
    .max(255, 'About Event is too long, maximum length is 255 characters'),

  cost: Yup.string()
    .min(1, 'Cost is too short, minimum length is 1 character')
    .max(266, 'Cost is too long, maximum length is 266 characters'),

  TotalSlot: Yup.string()
    .min(1, 'Total Slot is too short, minimum length is 1 character')
    .max(255, 'Total Slot is too long, maximum length is 255 characters'),

    Location: Yup.string()
    .min(1, 'Location  is too short, minimum length is 1 character')
    .max(255, 'Location  is too long, maximum length is 255 characters'),
});

export default updateEventSchema;
