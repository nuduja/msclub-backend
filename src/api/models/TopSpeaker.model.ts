import mongoose, { Schema } from 'mongoose';
import { ITopSpeaker } from '../interfaces';

const TopSpeakerSchema = new Schema<ITopSpeaker>({
  speakerName: { type: String, required: true },
  description: { type: String, required: false },
  image_url: { type: String, required: false, default: null },
  socialMedia: [
    {
      name: { type: String, required: true },
      publicURL: { type: String, required: true },
    },
  ],
  isDelete: { type: Boolean, required: true, default: false },
});

const TopSpeakerModel = mongoose.model<ITopSpeaker>(
  'topSpeaker',
  TopSpeakerSchema
);

export default TopSpeakerModel;
