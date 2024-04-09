import { response } from "express";
import { PlateGroupModel, PlateModel } from "../models/index.js";
import { plateMapper } from "../mappers/plateMapper.js";

const getGroupPlates = async (groupName) => {
  const plates = await PlateModel.find({ plateGroup: groupName }).exec();
  if (!plates || plates.length === 0) {
    return [];
  }

  return plates.map(plate => plateMapper(plate, 'response'));
};

export const checkPlateGroupExist = async (name) => {
  try {
    const plateGroup = await PlateGroupModel.findOne({ name });
    return plateGroup ? true : false;

  } catch (error) {
    console.log('db connection error');
    return false;
  }
};

export const getPlateGroups = async (req, res) => {
  try {
    const groups = await PlateGroupModel.find({ uid: req.uid }).exec();
    if (!groups || groups.length === 0) {
      return res.status(500).json({
        ok: true,
        group: [],
        message: 'No plate groups found',
      });
    }

    const compliteGroupList = [];

    for (let group of groups) {
      compliteGroupList.push({
        id: group.id,
        name: group.name,
        plates: await getGroupPlates(group.name),
      });
    }

    res.status(201).json({
      ok: true,
      groups: compliteGroupList,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      group: [],
      message: 'Please talk with your administrator',
    });
  }
};

export const createGroup = async (req, res) => {
  try {
    const plateGroup = await PlateGroupModel.findOne({ name: req.body.name });

    if (plateGroup) {
      return res.status(200).json({
        ok: false,
        message: 'Group already exists',
      });
    }

    // db save plate group
    const group = new PlateGroupModel({ name: req.body.name, uid: req.uid });
    await group.save();

    res.status(201).json({
      ok: true,
      group: {
        id: group.id,
        name: group.name
      },
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const deletPlateGroup = async (req, res = response) => {
  try {
    const groupId = req.params.id;
    console.log(req.params.id);
    // db save plate
    const plate = await PlateGroupModel.findByIdAndDelete(
      groupId,
    );

    if (!plate) {
      return res.status(400).json({
        ok: false,
        message: 'Missing field',
      });
    }

    res.status(201).json({
      ok: true,
      group: {
        id: groupId,
      },
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};
