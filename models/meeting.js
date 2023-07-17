import { Schema, model, models } from 'mongoose';

const MeetingSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  meeting_link: {
    type: String,
    required: [true, 'Meeting link is required.'],
  },
});

const Meeting = models.Meeting || model('Meeting', MeetingSchema);

export default Meeting;