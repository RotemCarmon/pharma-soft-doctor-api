const httpService = require('../../services/http.service.js');
const convertService = require('../../services/convert.service.js');
const logger = require('../../services/logger.service.js');

async function getPrescriptions(params) {
    console.log("getPrescriptions -> params", params)
    const prescriptions = await httpService.post('prescription', params); // send POST request to the doctors server
    logger.debug('The prescription back from the DB: ' + prescriptions);
    const convartedPrescriptions = convertService.convertToXml(prescriptions, 1); //convert to XML
    return convartedPrescriptions;
}

async function updatePrescription(prescriptions) {
    logger.info("The request has been sent to the Doctor's server -->>");
    const responseMsg = await httpService.put('prescription', prescriptions);
    const xmlResMsg = convertService.convertToXml(responseMsg, 2); //convert to XML
    return xmlResMsg;
}

async function pharmacyReport() {
    logger.info("The request has been sent to the Doctor's server -->>");
    const prescriptions = await httpService.post('prescription');
    const convartedPrescriptions = convertService.convertToXml(prescriptions, 3); //convert to XML
    return convartedPrescriptions;
    // TODO: receive a JSON object
    // TODO: convert to XML
}

module.exports = {
    getPrescriptions,
    updatePrescription,
    pharmacyReport,
};

// function formatToJson(xmlData) {
//     var obj = {};
//     for (key in xmlData) {
//         let value = xmlData[key];
//         if (typeof value === 'object') {
//             obj[formatToCamelCase(key)] = formatToJson(value);
//         } else obj[formatToCamelCase(key)] = value;
//     }

//     console.log('formatToJson -> obj', obj);
//     return obj;
// }
