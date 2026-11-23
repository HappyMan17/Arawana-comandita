// Resets the public demo account to a clean sample restaurant.
// Usage: npm run reset:demo  (needs DB_CN, DEMO_EMAIL and DEMO_PASSWORD in .env)
// Only touches documents owned by the demo user (uid), never other users' data.
import mongoose from 'mongoose';
import process from 'process';
import pkg from 'env-var';
import { envs } from '../config/env.js';
import { hashPassword } from '../config/bcrypt.js';
import { getTotal } from '../helpers/getTotal.js';
import {
  CommandModel,
  DaySummaryModel,
  PlateGroupModel,
  PlateModel,
  TableModel,
  userModel,
} from '../models/index.js';

const { get } = pkg;
const DEMO_EMAIL = get('DEMO_EMAIL').required().asString();
const DEMO_PASSWORD = get('DEMO_PASSWORD').required().asString();
const DEMO_NAME = get('DEMO_NAME').default('Demo').asString();

const MENU = {
  Starters: [
    { name: 'Patacones', price: 12000, description: 'Fried green plantain with hogao' },
    { name: 'Empanadas', price: 9000, description: 'Three beef empanadas with ají' },
  ],
  'Main dishes': [
    { name: 'Bandeja paisa', price: 35000, description: 'Beans, rice, chicharrón, egg and arepa' },
    { name: 'Ajiaco', price: 28000, description: 'Chicken and potato soup with corn' },
    { name: 'Grilled fish', price: 42000, description: 'Fish of the day with coconut rice' },
  ],
  Drinks: [
    { name: 'Limonada de coco', price: 10000, description: 'Coconut lemonade' },
    { name: 'Jugo natural', price: 8000, description: 'Fresh fruit juice' },
  ],
};

const TABLES = [
  { name: 'Table 1', comment: 'Entrance', order: [] },
  { name: 'Table 2', comment: 'Next to the window', order: [['Bandeja paisa', 2], ['Limonada de coco', 2]] },
  { name: 'Table 3', comment: 'Terrace', order: [] },
  { name: 'Table 4', comment: 'Besides the bathroom', order: [['Ajiaco', 1], ['Jugo natural', 1]] },
];

const run = async () => {
  await mongoose.connect(envs.DB_CN);

  // 1. Demo user: create it, or reset its password if a visitor managed to change it
  let user = await userModel.findOne({ email: DEMO_EMAIL });
  if (!user) {
    user = new userModel({ name: DEMO_NAME, email: DEMO_EMAIL });
  }
  user.name = DEMO_NAME;
  user.password = hashPassword(DEMO_PASSWORD);
  await user.save();
  const uid = user.id;

  // 2. Wipe everything the demo user owns
  const demoTables = await TableModel.find({ uid }, { _id: 1 });
  await Promise.all([
    CommandModel.deleteMany({ $or: [{ uid }, { table_id: { $in: demoTables.map(t => t.id) } }] }),
    DaySummaryModel.deleteMany({ uid }),
    TableModel.deleteMany({ uid }),
    PlateModel.deleteMany({ uid }),
    PlateGroupModel.deleteMany({ uid }),
  ]);

  // 3. Seed menu. No expireAt, so seed data stays while visitor-made data expires.
  const platesByName = {};
  for (const [groupName, plates] of Object.entries(MENU)) {
    const group = await PlateGroupModel.create({ name: groupName, uid });
    for (const plate of plates) {
      const saved = await PlateModel.create({
        ...plate,
        uid,
        image: null,
        initQuantity: 0,
        plateGroup: { id: group.id, name: group.name },
      });
      platesByName[plate.name] = saved;
    }
  }

  // 4. Seed tables, some free and some with an order, so every status is visible
  for (const { name, comment, order } of TABLES) {
    const plates = order.map(([plateName, quantity]) => {
      const { id, name, price, description, plateGroup } = platesByName[plateName];
      return { id, name, price, description, plateGroup, uid, image: null, initQuantity: 0, quantity, isSelected: true };
    });
    await TableModel.create({
      name,
      comment,
      uid,
      plates,
      total: getTotal(plates, 'price'),
      hasPaidService: false,
    });
  }

  console.log(`Demo reset: ${Object.values(MENU).flat().length} products, ${TABLES.length} tables for ${DEMO_EMAIL}`);
};

run()
  .catch(error => {
    console.error('Demo reset failed:', error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
