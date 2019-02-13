module.exports = {


  friendlyName: 'Get objects',


  description: '',


  inputs: {
    objects: {
      description: 'The json object to search.',
      type: 'ref',
      required: true
    },
    key: {
      description: 'The key to search on.',
      type: 'string',
      required: true
    },
    value: {
      description: 'The value to search for.',
      type: 'string',
      required: true
    }
  },

  exits: {

    success: {
      outputFriendlyName: 'Found Objects',
    },

  },


  fn: async function (inputs) {

    return getObjects(inputs.objects, inputs.key, inputs.value)

  }


};

function getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(getObjects(obj[i], key, val));
    } else
    if (i == key && obj[i] == val || i == key && val == '') { //
      objects.push(obj);
    } else if (obj[i] == val && key == '') {
      if (objects.lastIndexOf(obj) == -1) {
        objects.push(obj);
      }
    }
  }
  return objects;
}
