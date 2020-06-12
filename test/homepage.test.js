// var request = require('supertest')
// var app = require('../app')

// describe("homepage",function (){
//     it("Document", function (done){
//         request(app).get("/")
//             .expect(200)
//             .expect(/Document/,done)
//     })
// })

let chai = require("chai")
let chaiHttp = require("chai-http")
let server = require("../app");
const { response } = require("express");

//assertion

chai.should();

chai.use(chaiHttp);

describe('student api',()=>{
    ///test the GET Route
    describe("GET /api/task",()=>{
        it("It should GET all the students",(done)=>{
            chai.request(server)
                .get("/students")
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(4);
                done();            
                })
        })
        it("It should NOT GET all the Tasks",(done)=>{
            chai.request(server)
            .get("/student")
            .end((err,response)=>{
                response.should.have.status(404);
            done();    
            })
        })
    })

    
})
