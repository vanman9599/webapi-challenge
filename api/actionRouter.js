
const express = require('express');
const Actions = require('../data/helpers/actionModel.js');
const Projects = require('../data/helpers/projectModel.js');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const actions =  await Actions.get();
        res.status(200).json(actions);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Error retrieving projects"
        })
    }
});

router.get('/:id', async (req, res) => {
    try{
        const actions =  await Projects.getProjectActions(req.params.id);
        if(actions){
            res.status(200).json(actions);
        } else{
            res.status(404).json({ message: "Actions not found"});
        }
        
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Error retrieving actions"
        })
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const count = await Actions.remove(req.params.id);
        if(count>0){
            res.status(200).json({ message: 'THe action has been deleted' })
        }else{
            res.status(404).json({ message: "The action could not be found" })
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Error removing action" })
    }
});

router.put('/:id', async (req, res) => {
    try{
        const action = await Actions.update(req.params.id, req.params.body)
        if(action){
            res.status(200).json(action);
        } else{
            res.status(404).json({ message: "The action could not be updated"})
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Error updating action" })
    }
});

//
router.post('/', async (req, res) => {
    try{
        const action = await Actions.insert(res.body);
        res.status(200).json(action);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error adding action"})
    }
    
});
module.exports = router;