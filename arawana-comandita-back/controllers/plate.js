import { response } from "express";
import { plateMapper } from "../mappers/plateMapper.js";
import { PlateModel } from "../models/PlateModel.js";

export const getPlate = async (req, res) => {
  try {
    const plate = await PlateModel.findById(req.params.id).exec();
    console.log({ plate }); //todo remove
    if (!plate) {
      return res.status(500).json({
        ok: false,
        message: 'Plate not found',
      });
    }

    res.status(201).json({
      ok: true,
      plate: {
        id: plate.id,
        name: plate.name,
        price: plate.price,
        description: plate.description,
      },
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
    // db save plate
    const plate = new PlateModel(plateMapper(req.body));
    await plate.save();

    res.status(201).json({
      ok: true,
      plate: {
        id: plate.id,
        name: plate.name,
        price: plate.price,
        description: plate.description,
      },
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
    const plate = await PlateModel.findOneAndUpdate(
      { _id: req.body.id },
      { $set:
        {
          name: newPlate.name,
          price: newPlate.price,
          description: newPlate.description
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
      plate: {
        id: plate.id,
        name: plate.name,
        price: plate.price,
        description: plate.description,
      },
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
    const plate = await PlateModel.findOneAndDelete(
      { _id: plateId },
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
