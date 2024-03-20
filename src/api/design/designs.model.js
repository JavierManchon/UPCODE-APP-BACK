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
  template: {
    type: Boolean,
    required: true
  },
  defaultContent: {
    children: [],
    grandSon: [],
    countChildren: {
      type: Number,
    },
    countGrandson: {
      type: Number,
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
    text: {
      type: String,
      default: null
    },
    textItem: {
      type: String,
      default: null
    },
    textTitle: {
      type: String,
      default: null
    },
    textArray: [{
      type: String,
    }],
    textArray2: [{
      type: String,
    }],
    textArrayBidimensional: [[{
      type: String,
    }]],
    bgColorNav: {
      type: String,
      default: null
    },
    bgColorForm: {
      type: String,
      default: null
    },
    bgColorButton: {
      type: String,
      default: null
    },
    bgColorSection: {
      type: String,
      default: null
    },
    bgColorArticle: {
      type: String,
      default: null
    },
    bgColorFigure: {
      type: String,
      default: null
    },
    bgColorFooter: {
      type: String,
      default: null
    },
    bgColorDiv: {
      type: String,
      default: null
    },
    bgColorTable: {
      type: String,
      default: null
    },
    colorTitle: {
      type: String,
      default: null
    },
    colorItem: {
      type: String,
      default: null
    },
    colorText: {
      type: String,
      default: null
    },
    fontSizeTitle: {
      type: String,
      default: null
    },
    fontSizeItem: {
      type: String,
      default: null
    },
    fontSizeText: {
      type: String,
      default: null
    },
    textDecorationTitle: {
      type: Boolean,
      default: false
    },
    textDecorationText: {
      type: Boolean,
      default: false
    },
    fontWeightTitle: {
      type: Boolean,
      default: false
    },
    fontWeightItem: {
      type: Boolean,
      default: false
    },
    fontWeightText: {
      type: Boolean,
      default: false
    },
    border: {
      type: String,
      default: null
    },
    borderRadius: {
      type: String,
      default: null
    },
    outline: {
      type: String,
      default: 'none'
    }
  }
});

const Design = mongoose.model('designs', DesignSchema);
module.exports = Design;

