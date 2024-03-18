const mongoose = require('mongoose');

const DesignSchema = new mongoose.Schema({
  nameDesign: {
    type: String,
    required: true,
    trim: true 
  },
  elementType: {
    type: String,
    required: true,
    trim: true 
  },
  defaultContent: {
    children: [],
    grandSon: [],
    count: {
      type: Number,
      required: true
    }
  },
  defaultStyles: [{
    type: String,
    required: true
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users',
    required: true
  },
  tickets: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'tickets',
    default: null
  }],
  edit: {
    text: [],
    bgColorNav: null,
    bgColorForm: null,
    bgColorButton: null,
    bgColorSection: null,
    bgColorArticle: null,
    bgColorFigure: null,
    bgColorFooter: null,
    bgColorDiv: null,
    bgColorTable: null,
    colorTitle: null,
    colorItem: null,
    colorText: null,
    fontSizeTitle: null,
    fontSizeItem: null,
    fontSizeText: null,
    textDecorationTitle: null,
    textDecorationText: null,
    fontWeightTitle: null,
    fontWeightItem: null,
    fontWeightText: null,
    borderRadius: null,
  }
});

const Design = mongoose.model('designs', DesignSchema);
module.exports = Design;

