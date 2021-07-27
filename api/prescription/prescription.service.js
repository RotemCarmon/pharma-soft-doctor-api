const httpService = require('../../services/http.service.js');
const convertService = require('../../services/convert.service.js');
const logger = require('../../services/logger.service.js');

async function getPrescriptions(params) {
    const prescriptions = await httpService.post('prescription', params); // send POST request to the doctors server
    const convartedPrescriptions = convertService.convertToXml(prescriptions, 1); //convert to XML
    return convartedPrescriptions;
}

async function updatePrescription(prescriptions) {
    const responseMsg = await httpService.put('prescription', prescriptions);
    logger.info("The request has been sent to the Doctor's server -->>");
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