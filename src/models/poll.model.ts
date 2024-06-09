import { model, Schema, Document } from 'mongoose';


const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String },
  }, {
    timestamps: true,
  });
  
  // Define the Option schema
  const optionSchema = new Schema({
    text: { type: String, required: true },
    responses: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  });

const pollSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: String, required: true },
    options: [optionSchema],
    comments: [commentSchema],
  }, {
    timestamps: true,
  })

const pollModel = model<Document>('Poll', pollSchema);

export default pollModel;
