const express = require('express');
const router = express.Router();
const Memories = require('../models/memories.js');

router.get('/', (req, res) => {
  Memories.find({}, (err, foundMemories) => {
    res.json(foundMemories)
  })
});

router.delete('/:id', (req, res) => {
  Memories.findByIdAndRemove(req.params.id, (err, deletedMemory) => {
    res.json(deletedMemory);
  })
});

router.put('/:id', (req, res)=> {
    Memories.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMemory) => {
        res.json(updatedMemory);
    });
});
router.post('/', (req, res) => {
  console.log(req.body);
  Memories.create(req.body, (err, createdMemory) => {
    res.json(createdMemory);
  })
})
module.exports = router;
