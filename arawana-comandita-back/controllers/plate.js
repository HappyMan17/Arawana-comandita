import { response } from "express";
import { plateMapper } from "../mappers/plateMapper.js";
import { PlateGroupModel, PlateModel } from "../models/index.js";
import constants from "../config/constants.js";

export const getUserPlates = async (req, res) => {
  try {
    const plates = await PlateModel.find({ uid: req.uid }).exec();
    if (!plates) {
      return res.status(500).json({
        ok: false,
        message: 'Plates not found',
      });
    }

    res.status(201).json({
      ok: true,
      plates: plates.map(plate => plateMapper(plate, 'response')),
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const getPlate = async (req, res) => {
  try {
    const plate = await PlateModel.findById(req.params.id).exec();
    if (!plate) {
      return res.status(500).json({
        ok: false,
        message: 'Plate not found',
      });
    }

    res.status(201).json({
      ok: true,
      plate: plateMapper(plate, 'response'),
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const createPlate = async (req, res = response) => {
  try {
    // plate group
    const group = await PlateGroupModel.findById(req.body.plateGroup.id).exec();
    // console.log({ group, id: req.body.plateGroup });
    // db save plate
    const plate = new PlateModel(plateMapper({
      ...req.body,
      plateGroup: {
        id: group.id,
        name: group.name,
      },
      expireAt: new Date(Date.now() + constants.TIME_TO_DELETE),
    }));
    await plate.save();

    res.status(201).json({
      ok: true,
      plate: plateMapper(plate, 'response'),
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const updatePlate = async (req, res = response) => {
  try {
    const newPlate = plateMapper(req.body);
    // db save plate
    const plate = await PlateModel.findByIdAndUpdate(
      req.body.id,
      {
        $set:
        {
          name: newPlate.name,
          price: newPlate.price,
          plateGroup: newPlate.plateGroup,
          description: newPlate.description,
          image: newPlate.image,
        }
      },
      { new: true },
    );

    if (!plate) {
      return res.status(400).json({
        ok: false,
        message: 'Missing field',
      });
    }

    res.status(201).json({
      ok: true,
      plate: plateMapper(plate, 'response'),
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const deletPlate = async (req, res = response) => {
  try {
    const plateId = req.params.id;
    // db save plate
    const plate = await PlateModel.findByIdAndDelete(
      plateId,
    );

    if (!plate) {
      return res.status(400).json({
        ok: false,
        message: 'Missing field',
      });
    }

    res.status(201).json({
      ok: true,
      plate: {
        id: plateId,
      },
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};
