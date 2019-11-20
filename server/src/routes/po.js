/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
import express from 'express';
import passport from 'passport';
import Mongoose from 'mongoose';
import moment from 'moment';

import POModel from '../model/po';

const router = express.Router();

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
      const customPONumber = `Localize_${vendorName}_${createdOnDate.year()}${createdOnDate.month()}_${Mongoose.Types.ObjectId()}`;
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

      const startDate = moment([year, month - 1]);
      // Clone the value before .endOf()
      const endDate = moment(startDate).endOf('month');
      const allPOs = await POModel.find({
        createdOn: {
          $gte: startDate,
          $lte: endDate
        }
      });
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
      const startDate = moment([year, month - 1]);
      // Clone the value before .endOf()
      const endDate = moment(startDate).endOf('month');
      const allPOs = await POModel.find({
        createdOn: {
          $gte: startDate,
          $lte: endDate
        }
      });
      // console.log(allPoEntry);
      return res.status(200).send({ allPOs });
    } catch (error) {
      return nextError(error);
    }
  }
);

export default router;
