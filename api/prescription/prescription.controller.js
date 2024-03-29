const prescriptionService = require('./prescription.service');
const logger = require('../../services/logger.service')

async function getPrescriptions(req, res) {
  try {
    if (!req.body.getPrescriptions) res.status(404).send('Bad request')
    const params = req.body.getPrescriptions.messageHeader; // camelCase or TitleCase
    logger.debug('Sending TZ:' + params.TZ + ' to the DB')
    const prescriptions = await prescriptionService.getPrescriptions(params);

    res.status(200).send(prescriptions);
  } catch (err) {
    logger.error(err);
    res.status(400).send(err);
  }
}

async function updatePrescription(req, res) {
  try {
    if (!req.body) throw new Error('Bad request');
    const prescriptions = req.body.updatePrescription;
    const madication = prescriptions?.prescription?.medications?.medication
    if (!Array.isArray(madication)) prescriptions.prescription.medications.medication = [madication]
    const updatedPrescription = await prescriptionService.updatePrescription(prescriptions)
    res.send(updatedPrescription);
  } catch (err) {
    logger.error(err)
    res.status(400).send(err);
  }
}

async function pharmacyReport(req, res) {
  try {
    const pharmacyReport = await prescriptionService.pharmacyReport()
    res.send(pharmacyReport);
  } catch (err) {
    logger.error(err)
    res.status(400).send(err);
  }
}

module.exports = {
  getPrescriptions,
  updatePrescription,
  pharmacyReport
}