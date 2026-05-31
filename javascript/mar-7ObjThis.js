const dev={
    firstName:'steve',
    skills:['js','java','python'],
    details:function(){
        // clg(this)-current object
        // this.skills.forEach(function(skill)=>)clg (this)-global bc we use function keyword always refer to globel
        this.skills.forEach((skill)=>{
            // clg (this)-current obj
            console.log(`${this.firstName} knows ${skill}`);
        })
    }
}
dev.details();


