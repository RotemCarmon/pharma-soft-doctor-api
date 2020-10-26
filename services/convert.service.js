var convert = require('xml-js');
// var json2xml = require('json2xml');
const fs = require('fs');
const logger = require('./logger.service')

const dec = {"_declaration": {
  "_attributes": {
    "version": "1.0",
    "encoding": "utf-8"
  }
}}


const FUNC_NAMES = {
  1: 'getPrescriptions',
  2: 'updatePrescription',
  3: 'pharmacyReport'
}

async function convertToJson(data) {
  var json = convert.xml2json(data);
  logger.info('converting to json')
  return json
}

async function convertToXml(data , funcCode) {  
  var xml = _formatForXML(data , funcCode)
  logger.info('converting to XML')
  return xml
}




module.exports = {
  convertToJson,
  convertToXml
}


function _formatForXML(dataArr, funcCode) {
  var data = null
  const funcName = _getFuncName(funcCode)
  if(!funcName) throw Error ('Couldn\'t find the function name')
  if(!Array.isArray(dataArr)) dataArr = [dataArr]; // is this ok to do?
  dataArr.forEach((_data) => {
    const formated = _traverseJSON(_data)
    data = convert.json2xml({...dec , [funcName]: formated}, {compact: true, ignoreComment: true, spaces: 4});
  });
  return data
}

function _traverseJSON(obj) {
  for(key in obj) {
    if(Array.isArray(obj[key]) ) {
      var singleKey = key.substr(0, key.length -1)
      let tempVal = obj[key]
      obj[key] = {
        [singleKey]: tempVal
      }
      _traverseJSON(tempVal)
    }
    else if(typeof obj[key] === 'object') _traverseJSON(obj[key])
  }
  
  return obj
}

function _getFuncName(funcCode){
  return FUNC_NAMES[funcCode];
}