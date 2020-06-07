const express = require('express')
const router = express.Router()
const Student = require('../models/student')



router.get('/',async(req,res) =>{
    try {
        const students = await Student.find()
        res.json(students)
    } catch (error) {
        res.send('Error'+ error)
    }
})

router.get('/:id',async(req,res) =>{
    try {
        const student = await Student.findById(req.params.id)
        res.json(student)
    } catch (error) {
        res.send('Error'+ error)
    }
})

router.post('/',async(req,res) => {
    const student = new Student({
        name:req.body.name,
        roll:req.body.roll,
        class:req.body.class,
    })
    try {
        const a1 = await student.save()
        res.json(a1)        
    } catch(error){
        res.send('Error')
    }
})



router.patch('/:id',async(req,res,next)=> {
    
    try {
        const id = req.params.id;
        const updates = req.body
        const options = {new:true}
        const result = await Student.findByIdAndUpdate(id,updates,options)
        
        res.send(result)

    } catch (error) {
        console.log(error.message)
        
    }
});

router.delete('/:id',async(req,res,next)=> {
    const id = req.params.id
    try {
        const result = await Student.findByIdAndDelete(id)
        res.send(result)
    } catch (error) {
        console.log(error.message)
        
    }
});
module.exports = router