/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
import express from 'express';
import passport from 'passport';
import Mongoose from 'mongoose';
import * as moment from 'moment';

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
        poNumber: poNumber || Mongoose.Types.ObjectId()
      });
      const upsertData = model.toObject();
      // delete upsertData.poNumber;

      await POModel.findOneAndUpdate({ poNumber }, upsertData, {
        upsert: true,
        new: true,
        runValidators: true
      });

      const startDate = moment([year, month - 1]);
      // Clone the value before .endOf()
      const endDate = moment(startDate).endOf('month');
      const allPoEntry = POModel.find({
        createdOn: {
          $gte: startDate,
          $lte: endDate
        }
      });
      return res.status(200).send({ allPoEntry });
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
      const allPoEntry = POModel.find({
        createdOn: {
          $gte: startDate,
          $lte: endDate
        }
      });
      return res.status(200).send({ allPoEntry });
    } catch (error) {
      return nextError(error);
    }
  }
);

export default router;
