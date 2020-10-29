var convert = require('xml-js');
const fs = require('fs');
const logger = require('./logger.service');
const { create } = require('xmlbuilder2');

const FUNC_NAMES = {
    1: 'getPrescriptions',
    2: 'updatePrescription',
    3: 'pharmacyReport',
};

async function convertToJson(data) {
    var json = convert.xml2json(data);
    logger.info('converting to json');
    return json;
}

async function convertToXml(data, funcCode) {
    const funcName = _getFuncName(funcCode);
    if (!funcName) throw Error("Couldn't find the function name");
    
    if (!Array.isArray(data)) data = [data]; // is this ok to do?
    const formated = data.map((_data) => {
        return _traverseJSON(_data);
    });

    return _buildXml(formated, funcName);
}


module.exports = {
    convertToJson,
    convertToXml,
};

function _traverseJSON(obj) {
    for (key in obj) {
        if (Array.isArray(obj[key])) {
            var singleKey = key.substr(0, key.length - 1);
            let tempVal = obj[key];
            obj[key] = {
                [singleKey]: tempVal,
            };
            _traverseJSON(tempVal);
        } else if (typeof obj[key] === 'object') _traverseJSON(obj[key]);
    }
    return obj;
}

function _getFuncName(funcCode) {
    return FUNC_NAMES[funcCode];
}

function _buildXml(data, funcName) {
    const doc = create({ encoding: 'UTF-8' }).ele(funcName);
    doc.ele(data)
    return doc.end({ prettyPrint: true });
}
