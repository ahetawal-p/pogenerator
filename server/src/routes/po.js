/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
import express from 'express';
import passport from 'passport';
import Mongoose from 'mongoose';
import moment from 'moment';

import POModel from '../model/po';

const router = express.Router();

async function getAllPOs(year, month) {
  const startDate = moment([year, month - 1]);
  // Clone the value before .endOf()
  const endDate = moment(startDate).endOf('month');
  const allPOs = await POModel.find({
    createdOn: {
      $gte: startDate,
      $lte: endDate
    },
    isActive: true
  }).sort({ createdOn: 'descending' });
  return allPOs;
}

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const {
        createdOn,
        projectName,
        localizePM,
        clientName,
        clientPM,
        vendorName,
        vendorMailId,
        workType,
        language,
        wordCount,
        vendorCost,
        currency,
        paymentStatus,
        poNumber,
        year,
        month
      } = req.body;

      const createdOnDate = moment(createdOn);
      // eslint-disable-next-line operator-linebreak
      const customPONumber = `Localize_${vendorName}_${createdOnDate.year()}${createdOnDate.month() +
        1}_${Mongoose.Types.ObjectId()}`;
      const model = new POModel({
        createdBy: req.user.email,
        createdOn,
        projectName,
        localizePM,
        clientName,
        clientPM,
        vendorName,
        vendorMailId,
        workType,
        language,
        wordCount,
        vendorCost,
        currency,
        paymentStatus,
        poNumber: customPONumber
      });
      const upsertData = model.toObject();
      delete upsertData._id;

      await POModel.findOneAndUpdate({ poNumber }, upsertData, {
        upsert: true,
        new: true,
        runValidators: true
      });

      const allPOs = await getAllPOs(year, month);
      return res.status(200).send({ allPOs });
    } catch (error) {
      return next(error);
    }
  }
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, nextError) => {
    try {
      const { year, month } = req.query;
      const allPOs = await getAllPOs(year, month);
      return res.status(200).send({ allPOs });
    } catch (error) {
      return nextError(error);
    }
  }
);

router.delete(
  '/:poNumber',
  passport.authenticate('jwt', { session: false }),
  async (req, res, nextError) => {
    try {
      const { year, month } = req.query;
      const { poNumber } = req.params;
      await POModel.update({ poNumber }, { isActive: false });

      const allPOs = await getAllPOs(year, month);
      return res.status(200).send({ allPOs });
    } catch (error) {
      return nextError(error);
    }
  }
);

export default router;
