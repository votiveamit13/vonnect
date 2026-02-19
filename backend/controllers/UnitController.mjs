import Building from "../models/Buildings.mjs"

export const buildings = async (req, res) => {
   let data =  await Building.findAll();
   res.json({
    "status": true,
    "data": data
   })
}

export const units = async (req,res) => {
   res.json(req.params);
}